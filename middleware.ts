// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

// 📋 Route configuration
const PUBLIC_ROUTES = ['/', '/login']
const AUTH_ROUTES = ['/login', '/register']

const ROLE_ROUTE_MAP: Record<string, string[]> = {
  '/admin': ['admin'],
  '/petugas': ['petugas', 'admin'], 
  '/peminjam': ['peminjam', 'petugas', 'admin'],
}

const ROLE_DASHBOARD: Record<string, string> = {
  admin: '/admin/dashboard',
  petugas: '/petugas/dashboard',
  peminjam: '/peminjam/dashboard',
}

export async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl
  const token = request.cookies.get('session')?.value

  // ⏭️ Skip: static files, images, API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // 🌐 Public routes: tidak perlu auth
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // 🔍 Verify token
  const decoded = token ? await verifyToken(token) : null
  const isLoggedIn = !!decoded?.userId

  // 🔐 Protected route + belum login → redirect ke login
  if (!isLoggedIn) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // 🏠 Root path + sudah login → redirect ke dashboard sesuai role
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    const role = decoded.role?.toLowerCase() || 'peminjam'
    url.pathname = ROLE_DASHBOARD[role] || '/peminjam/dashboard'
    return NextResponse.redirect(url)
  }

  // 🔐 Role-based access control
  for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTE_MAP)) {
    if (pathname.startsWith(routePrefix)) {
      const userRole = decoded.role?.toLowerCase() || 'peminjam'
      
      if (!allowedRoles.includes(userRole)) {
        // ❌ Akses ditolak → redirect ke dashboard user
        const url = request.nextUrl.clone()
        url.pathname = ROLE_DASHBOARD[userRole] || '/peminjam/dashboard'
        return NextResponse.redirect(url)
      }
      break
    }
  }

  // ✅ Semua cek lolos
  return NextResponse.next()
}

// 🎯 Matcher: terapkan middleware ke semua route kecuali static
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
}