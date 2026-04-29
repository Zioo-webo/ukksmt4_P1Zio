import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Public paths
  const publicPaths = ['/', '/login']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // Jika akses route protected tanpa token
  if (!isPublicPath && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Jika sudah login dan akses login, redirect ke dashboard
  if (token && pathname === '/login') {
    const payload = await verifyToken(token)
    if (payload) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Verifikasi token untuk route protected
  if (!isPublicPath && token) {
    const payload = await verifyToken(token)
    if (!payload) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/login',
  ],
}