import { LoginForm } from '@/components/auth/login-form'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getCurrentUser()
  
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <LoginForm />
    </div>
  )
}