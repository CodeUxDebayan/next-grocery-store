"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function Cart() {
  const [cart, setCart] = useState([])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
  }, [])

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    // Trigger a custom event to notify the Header component
    window.dispatchEvent(new Event('storage'))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2)
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} className="mb-4 flex">
              <Image src={item.image} alt={item.name} width={100} height={100} className="w-24 h-24 object-cover rounded-l-lg" />
              <div className="flex-grow flex justify-between items-center p-4">
                <div>
                  <CardTitle>{item.name}</CardTitle>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <Button variant="destructive" onClick={() => removeFromCart(item.id)}>Remove</Button>
              </div>
            </Card>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold">Total: ${getTotalPrice()}</p>
            <Button className="mt-4" onClick={handleCheckout}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  )
}