'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import api from '@/utils/axios-config';

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [location, setLocation] = useState('')
  const [count, setCount] = useState(0)
  const pageSize = 10
  const totalPages = Math.ceil(count / pageSize)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const token = localStorage.getItem('access_token')

        const res = await api.get(
          `http://localhost:8000/api/products/?page=${page}&location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(res.data.results)
        setProducts(res.data.results)
        setCount(res.data.count)

      } catch (err) {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, location])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      {/* Location filter */}
      <select
        className="mb-4 p-2 border rounded"
        onChange={handleLocationChange}
        value={location}
      >
        <option value="">All Locations</option>
        <option value="JO">Jordan</option>
        <option value="SA">Saudi Arabia</option>
      </select>

      {error && <p className="text-red-500">{error}</p>}

      {/* Products grid */}
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        {loading? ( <p>Loading...</p>) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product: any) => (
            <div
              key={product.id}
              className="p-4 border rounded shadow-sm hover:shadow-lg transition"
            >
              <h3 className="font-bold text-xl mb-2">{product.title}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-700">{product.location}</p>
              <p className="mt-2 text-lg font-semibold">${product.price}</p>
              <button
                onClick={() => router.push(`/products/${product.id}`)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4">
       <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="mr-2 p-2 border rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-2 border rounded disabled:bg-gray-400"
        >
          Next
        </button>

      </div>
    </div>
  )
}
