'use server'

import { prisma } from '@/lib/prisma'
import { verifyPassword, signToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const ROLE_DASHBOARD_MAP: Record<string, string> = {
  admin: '/admin/dashboard',
  petugas: '/petugas/dashboard',
  peminjam: '/peminjam/dashboard',
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase(), deleted_at: null },
    include: { role: true },
  })

  if (!user) return { error: 'Email atau password salah' }

  const isValid = await verifyPassword(password, user.password!)
  if (!isValid) return { error: 'Email atau password salah' }

  const role = user.role?.role?.toLowerCase() || 'peminjam'

  const token = await signToken({
    userId: user.id_user,
    email: user.email,
    role,
  })

  const cookieStore = await cookies()

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: false, // 🔥 penting untuk IP LAN (192.168.x.x)
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  redirect(ROLE_DASHBOARD_MAP[role])
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set('session', '', { maxAge: 0, path: '/' })

  redirect('/')
}