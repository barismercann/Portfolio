#!/usr/bin/env node

/**
 * Quick Fix: Hash Admin User Password
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function fixAdminPassword() {
  console.log('🔧 Quick Fix: Hashing Admin Password\n');
  
  const prisma = new PrismaClient();
  const adminEmail = 'barismercan53@gmail.com';
  const plainPassword = 'admin123';

  try {
    // Hash the password properly
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    console.log('✅ Password hashed successfully');

    // Update user with hashed password
    console.log('💾 Updating user in database...');
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        password: hashedPassword,
        hashedPassword: hashedPassword, // Ensure compatibility
      }
    });

    console.log('✅ Admin user password updated successfully!');
    console.log('\n🎉 You can now login with:');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${plainPassword}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminPassword();