'use client'

import { useEffect, ReactNode, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'

type Props = {
  children: ReactNode
}

export default function AuthGuard({ children }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
      const sleep = (seconds: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};
    const checkAuth = async () => {
      if (pathname.startsWith('/login')) return

      let access = Cookies.get('access_token')
      const refresh = localStorage.getItem('refresh_token')

      let isExpired = false
      if (access) {
        try {
          const decoded: any = jwtDecode(access)
          const now = Date.now() / 1000
          if (decoded.exp < now) isExpired = true
        } catch {
          isExpired = true
        }
      }

      if (access && !isExpired){
          setIsAuthenticated(true)
          }

      else if (isExpired && refresh) {
        try {
          const res = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh,
          })
          access = res.data.access
          localStorage.setItem('access_token', access)
          Cookies.set('access_token', access)
           setIsAuthenticated(true)
        } catch {
          localStorage.clear()
          Cookies.remove('access_token')
          router.push('/login')
        }
      } else if (!access) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [pathname, router, isAuthenticated])
  if (!isAuthenticated){
      return <p>Loading...</p>
}
  return <>{children}</>
}
