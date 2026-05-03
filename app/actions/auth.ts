'use server'

import { prisma } from '@/lib/prisma'
import { verifyPassword, signToken, setSession, clearSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
})

// Mapping role ke path dashboard
const ROLE_DASHBOARD_MAP: Record<string, string> = {
  admin: '/admin/dashboard',
  petugas: '/petugas/dashboard',
  peminjam: '/peminjam/dashboard',
}

export async function login(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    // Find user with role
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        role: true,
      },
    })

    if (!user) {
      return { error: 'Email atau password salah' }
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)
    
    if (!isValid) {
      return { error: 'Email atau password salah' }
    }

    // Get role name (handle jika role null)
    const roleName = user.role?.role?.toLowerCase() || 'peminjam' // default fallback

    // Create token
    const token = await signToken({
      userId: user.id_user,
      email: user.email,
      role: roleName,
    })

    // Set session
    await setSession(token)

    // Revalidate
    revalidatePath('/')

    // Redirect berdasarkan role
    const redirectPath = ROLE_DASHBOARD_MAP[roleName] || '/dashboard'
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