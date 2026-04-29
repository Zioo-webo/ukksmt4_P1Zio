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

export async function login(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    // Find user
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

    // Create token
    const token = await signToken({
      userId: user.id_user,
      email: user.email,
      role: user.role?.role,
    })

    // Set session
    await setSession(token)

    // Revalidate and redirect
    revalidatePath('/')
    redirect('/dashboard')
    
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