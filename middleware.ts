// middleware.ts (final version - compatible dengan auth Anda)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const PUBLIC_ROUTES = ['/', '/register', '/forgot-password']
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
  const { pathname } = request.nextUrl
  const token = request.cookies.get('session')?.value

  // Skip static files
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Skip public routes
  if (['/', '/register'].includes(pathname)) {
    return NextResponse.next()
  }

  // Verify token
  const decoded = token ? await verifyToken(token) : null

  // Redirect ke login jika belum login
  if (!decoded?.userId) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Redirect root ke dashboard
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    const role = decoded.role?.toLowerCase() || 'peminjam'
    url.pathname = `/${role}/dashboard`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}