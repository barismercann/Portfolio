#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

console.log('🚀 Setting up Barış Mercan Portfolio Admin...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env.local file not found!');
  console.log('Please create .env.local file with the following variables:\n');
  
  console.log('DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5434/portfolio_dev"');
  console.log('ADMIN_EMAIL="barismercan53@gmail.com"');
  console.log('ADMIN_PASSWORD="your-secure-password"');
  console.log('JWT_SECRET="your-super-secret-jwt-key-change-in-production"');
  console.log('SMTP_HOST="smtp.gmail.com"');
  console.log('SMTP_PORT="587"');
  console.log('SMTP_USER="your-email@gmail.com"');
  console.log('SMTP_PASS="your-app-password"\n');
  
  process.exit(1);
}

try {
  // Start Docker containers
  console.log('🐳 Starting Docker containers...');
  execSync('npm run docker:up', { stdio: 'inherit' });
  
  // Wait a bit for containers to start
  console.log('⏳ Waiting for database to be ready...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Generate Prisma client
  console.log('🏗️  Generating Prisma client...');
  execSync('npm run db:generate', { stdio: 'inherit' });
  
  // Push database schema
  console.log('📊 Setting up database schema...');
  execSync('npm run db:push', { stdio: 'inherit' });
  
  // Seed database with admin user
  console.log('🌱 Seeding database...');
  execSync('npm run db:seed', { stdio: 'inherit' });
  
  console.log('\n✅ Setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Visit http://localhost:3000/admin/login');
  console.log('3. Use your ADMIN_EMAIL and ADMIN_PASSWORD from .env.local');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}