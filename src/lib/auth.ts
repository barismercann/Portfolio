import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import { prisma } from './database';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
);

// Custom JWT Payload interface
export interface CustomJWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Generate JWT token
export async function signJWT(payload: Omit<CustomJWTPayload, 'iat' | 'exp'>) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 days expiry
    .sign(JWT_SECRET);
  
  return token;
}

// Verify JWT token - Fixed type conversion
export async function verifyJWT(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Type-safe conversion
    if (
      typeof payload.userId === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.role === 'string' &&
      typeof payload.iat === 'number' &&
      typeof payload.exp === 'number'
    ) {
      return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        iat: payload.iat,
        exp: payload.exp,
      };
    }
    
    return null;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate token for authenticated user
export async function generateTokenForUser(user: {
  id: string;
  email: string;
  role: string;
}) {
  return signJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
}

// Middleware to verify authentication
export async function verifyAuth(request: NextRequest): Promise<CustomJWTPayload | null> {
  const authHeader = request.headers.get('authorization');
  const token = request.cookies.get('auth-token')?.value || 
                (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

  if (!token) {
    return null;
  }

  return verifyJWT(token);
}

// Check if user has required role
export function hasRole(user: CustomJWTPayload, requiredRole: string): boolean {
  const roleHierarchy: Record<string, number> = {
    'ADMIN': 3,
    'EDITOR': 2,
    'VIEWER': 1,
  };

  const userLevel = roleHierarchy[user.role] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

// Create initial admin user (run once)
export async function createInitialAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'barismercan53@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123!';

    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.email);
      return existingAdmin;
    }

    const hashedPassword = await hashPassword(adminPassword);
    
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Barış Mercan',
        password : hashedPassword,
        role: 'ADMIN',
        isActive: true,
        emailVerified: new Date(),
      },
    });

    console.log('✅ Initial admin user created:', admin.email);
    console.log('🔐 Admin password from env:', adminPassword);
    
    return admin;
  } catch (error) {
    console.error('❌ Failed to create initial admin:', error);
    throw error;
  }
}