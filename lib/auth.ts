import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
)

// Hash password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

// Create JWT token
export async function signToken(payload: { userId: string; email: string; role?: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY)
}

// Verify JWT token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as { userId: string; email: string; role?: string }
  } catch (error) {
    return null
  }
}

// Set session cookie
export async function setSession(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400, // 24 hours
    path: '/',
  })
}

// Clear session cookie
export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

// Get current user from session
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) return null
  
  const payload = await verifyToken(token)
  if (!payload) return null
  
  try {
    const user = await prisma.user.findUnique({
      where: { 
        id_user: payload.userId,
      },
      select: {
        id_user: true,
        nama_user: true,
        email: true,
        id_role: true,
        role: {
          select: {
            id_role: true,
            role: true,
          }
        },
      },
    })
    
    return user
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

// Check if user is admin
export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role?.role === 'admin'
}

// Check if user is petugas
export async function isPetugas() {
  const user = await getCurrentUser()
  const userRole = user?.role?.role
  return userRole === 'petugas' || userRole === 'admin'
}