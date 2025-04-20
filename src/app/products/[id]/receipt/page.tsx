'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ReceiptPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order')

  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) return router.push('/login')

      try {
        const orderData = localStorage.getItem('last_order')
        if (!orderData) return setError('No order found.')

        setOrder(JSON.parse(orderData))
      } catch (err) {
        setError('Failed to load receipt.')
      }
    }

    fetchOrder()
  }, [router])

  if (error) return <p>{error}</p>
  if (!order) return <p>Loading receipt...</p>

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Purchase Receipt</h1>
      <p><strong>Product:</strong> {order.product.title}</p>
      <p><strong>Price:</strong> ${order.product.price}</p>
      <p><strong>Purchased at:</strong> {new Date(order.created_at).toLocaleString()}</p>
    </div>
  )
}
