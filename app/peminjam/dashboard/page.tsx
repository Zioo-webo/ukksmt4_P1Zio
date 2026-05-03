// components/LogoutButton.tsx
'use client'

import { logout } from '@/app/actions/auth' // sesuaikan path import

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button 
        type="submit"
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        Logout
      </button>
    </form>
  )
}