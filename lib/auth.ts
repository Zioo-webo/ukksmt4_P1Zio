// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// 🔐 JWT Secret - WAJIB ada di production
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-dev-secret-change-this-immediately'
)

// 🌐 Deteksi apakah menggunakan HTTPS
function isSecure(): boolean {
  if (process.env.NODE_ENV === 'production') {
    // Production: cek env variable atau default ke true
    return process.env.PROTOCOL === 'https' || 
           process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https') ||
           true // Default secure di production
  }
  // Development: hanya secure jika eksplisit di-set
  return process.env.PROTOCOL === 'https' || false
}

// 🔗 Deteksi domain untuk cookie (opsional)
function getCookieDomain(): string | undefined {
  const domain = process.env.COOKIE_DOMAIN
  if (domain) return domain
  
  // Auto-detect untuk custom domain production
  if (process.env.NODE_ENV === 'production') {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (baseUrl && !baseUrl.includes('localhost') && !baseUrl.match(/\d+\.\d+\.\d+\.\d+/)) {
      try {
        const hostname = new URL(baseUrl).hostname
        // .domain.com agar work di subdomain juga
        return '.' + hostname.split('.').slice(-2).join('.')
      } catch {
        return undefined
      }
    }
  }
  return undefined
}

// 🔐 Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// 🔍 Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// 🎫 Create JWT token
export async function signToken(payload: { 
  userId: string; 
  email: string; 
  role?: string 
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

// ✅ Verify JWT token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { 
      userId: string; 
      email: string; 
      role?: string 
    }
  } catch {
    return null
  }
}

// 🍪 Set session cookie - WORKS di localhost, network, & domain
export async function setSession(token: string): Promise<void> {
  const cookieStore = await cookies()
  const secure = isSecure()
  const domain = getCookieDomain()
  
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60,
    path: '/',
  })
}

// 🗑️ Clear session cookie
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

// 👤 Get current user dari session
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) return null
  
  const payload = await verifyToken(token)
  if (!payload?.userId) return null
  
  try {
    const user = await prisma.user.findUnique({
      where: { id_user: payload.userId, deleted_at: null },
      include: { 
        role: { select: { id_role: true, role: true }} 
      },
    })
    
    if (!user) return null
    
    return {
      id_user: user.id_user,
      nama_user: user.nama_user,
      email: user.email,
      id_role: user.id_role,
      role: user.role,
      roleName: user.role?.role,
    }
  } catch (error) {
    console.error('getCurrentUser error:', error)
    return null
  }
}

// 🔐 Check role helpers
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.roleName === 'admin'
}

export async function isPetugas(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.roleName === 'admin' || user?.roleName === 'petugas'
}

export async function isAuthenticated(): Promise<boolean> {
  return !!(await getCurrentUser())
}