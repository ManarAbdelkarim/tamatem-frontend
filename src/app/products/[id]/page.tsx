'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import api from '@/utils/axios-config';

export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('access_token')

      try {
        const res = await api.get(`http://localhost:8000/api/products/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setProduct(res.data)
      } catch (err) {
        setError('Error loading product')
      }
    }

    fetchProduct()
  }, [id, router])

  const handleBuy = async () => {
    const token = localStorage.getItem('access_token')
    try {
      const res = await api.post(
        `http://localhost:8000/api/products/${id}/buy/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      localStorage.setItem('last_order', JSON.stringify(res.data))
      router.push(`/products/${id}/receipt?order=${res.data.id}`)
    } catch (err) {
      alert('Purchase failed.')
    }
  }

  if (error) return <p>{error}</p>
  if (!product) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4 text-gray-700">{product.description}</p>
      <p className="text-lg font-semibold mb-4">Price: ${product.price}</p>
      <button
        onClick={handleBuy}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Buy Now
      </button>
    </div>
  )
}
