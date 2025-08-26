#!/usr/bin/env node

/**
 * Authentication Debug Script
 * Barış Mercan Portfolio Project - Debug Auth Issue
 */

const { PrismaClient } = require('@prisma/client');

async function debugAuth() {
  console.log('🔍 DEBUG: Authentication Issue Analysis\n');
  
  const prisma = new PrismaClient();
  const testEmail = 'barismercan53@gmail.com';
  const testPassword = 'admin123';

  try {
    // 1. Check user in database
    console.log('1️⃣  Checking user in database...');
    const user = await prisma.user.findUnique({
      where: { email: testEmail },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        hashedPassword: true,
        role: true,
        isActive: true
      }
    });

    if (!user) {
      console.log('❌ User not found in database');
      return;
    }

    console.log('✅ User found in database:');
    console.log(`   👤 Name: ${user.name}`);
    console.log(`   📧 Email: ${user.email}`);
    console.log(`   🏷️  Role: ${user.role}`);
    console.log(`   ✅ Active: ${user.isActive}`);
    console.log(`   🔑 password field: ${user.password ? 'EXISTS' : 'NULL'}`);
    console.log(`   🔐 hashedPassword field: ${user.hashedPassword ? 'EXISTS' : 'NULL'}`);
    
    if (user.password) {
      console.log(`   📝 password value: "${user.password}"`);
    }
    if (user.hashedPassword) {
      console.log(`   📝 hashedPassword starts with: ${user.hashedPassword.substring(0, 10)}...`);
    }

    // 2. Test password hashing
    console.log('\n2️⃣  Testing password hashing...');
    
    // Import auth functions
    const bcrypt = require('bcryptjs');
    
    // Test if current password is hashed
    const isCurrentlyHashed = user.password && user.password.startsWith('$2');
    console.log(`   🔍 Current password appears to be hashed: ${isCurrentlyHashed}`);
    
    if (user.hashedPassword) {
      // Test with hashedPassword field
      const isValidWithHashed = await bcrypt.compare(testPassword, user.hashedPassword);
      console.log(`   🔐 Test with hashedPassword field: ${isValidWithHashed ? '✅ VALID' : '❌ INVALID'}`);
    }
    
    if (user.password) {
      if (user.password === testPassword) {
        console.log(`   🔓 Plain text password match: ✅ MATCH`);
        console.log('   ⚠️  WARNING: Password is stored in plain text!');
      } else if (user.password.startsWith('$2')) {
        // It's hashed, test it
        const isValidWithPassword = await bcrypt.compare(testPassword, user.password);
        console.log(`   🔐 Test with password field (hashed): ${isValidWithPassword ? '✅ VALID' : '❌ INVALID'}`);
      } else {
        console.log(`   🔓 Plain text password: "${user.password}" vs "${testPassword}" = ${user.password === testPassword ? '✅ MATCH' : '❌ NO MATCH'}`);
      }
    }

    // 3. Create proper hashed password
    console.log('\n3️⃣  Creating proper hashed password...');
    const properHashedPassword = await bcrypt.hash(testPassword, 12);
    console.log(`   ✅ New hashed password created: ${properHashedPassword.substring(0, 20)}...`);
    
    // Test the new hash
    const testNewHash = await bcrypt.compare(testPassword, properHashedPassword);
    console.log(`   🔐 Test new hash: ${testNewHash ? '✅ VALID' : '❌ INVALID'}`);

    // 4. Fix the user in database
    console.log('\n4️⃣  Fixing user in database...');
    
    const updatedUser = await prisma.user.update({
      where: { email: testEmail },
      data: {
        password: properHashedPassword,
        hashedPassword: properHashedPassword, // Set both fields for compatibility
        updatedAt: new Date()
      }
    });
    
    console.log('✅ User updated with properly hashed password');

    // 5. Test authentication function
    console.log('\n5️⃣  Testing authentication function...');
    
    try {
      const { authenticateUser } = await import('../src/lib/database.js');
      const authResult = await authenticateUser(testEmail, testPassword);
      
      if (authResult) {
        console.log('✅ Authentication function test: SUCCESS');
        console.log(`   👤 Authenticated user: ${authResult.name}`);
      } else {
        console.log('❌ Authentication function test: FAILED');
      }
    } catch (authError) {
      console.log('❌ Authentication function error:', authError.message);
    }

  } catch (error) {
    console.error('❌ Debug script error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run debug
debugAuth()
  .then(() => {
    console.log('\n🎉 Debug completed! Try logging in again.');
  })
  .catch(error => {
    console.error('Debug failed:', error);
    process.exit(1);
  });