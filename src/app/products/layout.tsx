'use client'

import { ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter, usePathname } from 'next/navigation';
import api from '@/utils/axios-config';
import AuthGuard from '../components/AuthGuard'


export default function ProductsLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('access_token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/login')
  }

const checkIfTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (err) {
    return true;
  }
};

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Tamatem Store</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <main className="p-6"> <AuthGuard>{children}</AuthGuard></main>
    </div>
  )
}