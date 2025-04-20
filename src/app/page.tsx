'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (token) {
      router.push('/products')
    } else {
      router.push('/login')
    }
  }, [router])

  return <p className="text-center mt-10">Redirecting...</p>
}
