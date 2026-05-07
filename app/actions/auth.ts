// app/actions/auth.ts
'use server'

import { prisma } from '@/lib/prisma'
import { verifyPassword, signToken, setSession, clearSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// 📋 Validation schema
const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
})

// 🗺️ Role → Dashboard mapping
const ROLE_DASHBOARD_MAP: Record<string, string> = {
  admin: '/admin/dashboard',
  petugas: '/petugas/dashboard', 
  peminjam: '/peminjam/dashboard',
}

export async function login(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // ✅ Validate input
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    // 🔍 Cari user di database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase(), deleted_at: null },
      include: { role: true },
    })

    if (!user || !user.password) {
      return { error: 'Email atau password salah' }
    }

    // 🔐 Verify password
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return { error: 'Email atau password salah' }
    }

    // 🎭 Get role (dengan fallback)
    const roleName = user.role?.role?.toLowerCase() || 'peminjam'

    // 🎫 Create & set JWT token
    const token = await signToken({
      userId: user.id_user,
      email: user.email,
      role: roleName,
    })
    
    await setSession(token)

    // ♻️ Revalidate cache
    revalidatePath('/')

    // 🚀 Redirect ke dashboard sesuai role
    const redirectPath = ROLE_DASHBOARD_MAP[roleName] || '/peminjam/dashboard'
    redirect(redirectPath)
    
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Terjadi kesalahan. Silakan coba lagi.' }
  }
}

export async function logout() {
  await clearSession()
  revalidatePath('/')
  redirect('/')
}