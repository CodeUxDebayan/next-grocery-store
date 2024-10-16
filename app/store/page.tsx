"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

// Define the Product type
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

// Mock data for products with images
const mockProducts: Product[] = [
  { id: 1, name: "Apple", price: 0.5, description: "Fresh red apple", image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
  { id: 2, name: "Banana", price: 0.3, description: "Ripe yellow banana", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" },
  { id: 3, name: "Milk", price: 2.5, description: "1 gallon of whole milk", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80" },
  { id: 4, name: "Bread", price: 1.5, description: "Whole wheat bread loaf", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" },
  { id: 5, name: "Eggs", price: 3.0, description: "Dozen large eggs", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" },
  { id: 6, name: "Cheese", price: 4.0, description: "Cheddar cheese block", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" },
]

export default function Store() {
  // State for products and cart with appropriate types
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [cart, setCart] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[]
    setCart(savedCart)
  }, [])

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product]
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    // Trigger a custom event to notify the Header component
    window.dispatchEvent(new Event('storage'))
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
