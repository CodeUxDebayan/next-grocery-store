"use client"

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItemCount(cart.length)

    const token = localStorage.getItem('auth_token')
    setIsLoggedIn(!!token)

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItemCount(updatedCart.length)
      setIsLoggedIn(!!localStorage.getItem('auth_token'))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('auth_token')
      setIsLoggedIn(false)
      router.push('/login')
    } else {
      router.push('/login')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Grocery Store</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link href="/store">Store</Link></li>
            <li>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </li>
            <li>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </li>
            <li>
              <Button variant="ghost" size="icon" onClick={handleAuthClick}>
                <User className="h-5 w-5" />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}