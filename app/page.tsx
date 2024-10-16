import { Button } from "@/components/ui/button"
import { ShoppingBasket } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Grocery Store</h1>
      <p className="text-xl mb-8">Find fresh produce and everyday essentials at great prices!</p>
      <Link href="/store">
        <Button size="lg">
          <ShoppingBasket className="mr-2 h-5 w-5" /> Start Shopping
        </Button>
      </Link>
    </div>
  );
}