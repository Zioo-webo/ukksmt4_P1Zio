// app/page.tsx
import { LoginForm } from '@/components/auth/login-form'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

// Mapping role ke path dashboard
const ROLE_DASHBOARD_MAP: Record<string, string> = {
  admin: '/admin/dashboard',
  petugas: '/petugas/dashboard',
  peminjam: '/peminjam/dashboard',
}

export default async function Home() {
  // 1. Cek apakah user sudah login
  const user = await getCurrentUser()

  // 2. Jika sudah login, redirect berdasarkan role
  if (user) {
    const roleName = user.role?.role?.toLowerCase() || 'peminjam'
    const redirectPath = ROLE_DASHBOARD_MAP[roleName] || '/dashboard'
    redirect(redirectPath)
  }

  // 3. Jika belum login, tampilkan Form Login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <LoginForm />
    </div>
  )
}