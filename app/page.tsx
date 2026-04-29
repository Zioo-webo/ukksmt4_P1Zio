import { LoginForm } from '@/components/auth/login-form'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  // 1. Cek apakah user sudah login
  const user = await getCurrentUser()

  // 2. Jika sudah login, otomatis lempar ke Dashboard
  if (user) {
    redirect('/dashboard')
  }

  // 3. Jika belum login, tampilkan Form Login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <LoginForm />
    </div>
  )
}