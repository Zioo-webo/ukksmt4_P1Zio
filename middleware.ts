import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const ROLE_DASHBOARD: Record<string, string> = {
  admin: '/admin/dashboard',
  petugas: '/petugas/dashboard',
  peminjam: '/peminjam/dashboard',
}

const ROLE_ROUTE_MAP: Record<string, string[]> = {
  '/admin': ['admin'],
  '/petugas': ['petugas', 'admin'],
  '/peminjam': ['peminjam', 'petugas', 'admin'],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('session')?.value

  // skip static
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // =========================
  // 1. HANDLE LOGIN PAGE "/"
  // =========================
  if (pathname === '/') {
    if (token) {
      try {
        const decoded = await verifyToken(token)

        if (decoded?.userId) {
          const role = decoded.role?.toLowerCase() || 'peminjam'

          return NextResponse.redirect(
            new URL(ROLE_DASHBOARD[role] || '/peminjam/dashboard', request.url)
          )
        }
      } catch (err) {
        console.log('Invalid token:', err)
      }
    }

    return NextResponse.next()
  }

  // =========================
  // 2. CHECK AUTH
  // =========================
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  let decoded = null

  try {
    decoded = await verifyToken(token)
  } catch (err) {
    console.log('JWT ERROR:', err)
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!decoded?.userId) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const role = decoded.role?.toLowerCase() || 'peminjam'

  // =========================
  // 3. ROLE ACCESS CONTROL
  // =========================
  for (const [prefix, roles] of Object.entries(ROLE_ROUTE_MAP)) {
    if (pathname.startsWith(prefix)) {
      if (!roles.includes(role)) {
        return NextResponse.redirect(
          new URL(ROLE_DASHBOARD[role], request.url)
        )
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}