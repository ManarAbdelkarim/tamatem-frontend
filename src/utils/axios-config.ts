'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ProtectedComponent = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const isTokenExpired = checkIfTokenExpired(accessToken);
      if (isTokenExpired) {
        Cookies.remove('access_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

};

const checkIfTokenExpired = (token: string): boolean => {
};

export default ProtectedComponent;