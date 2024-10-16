"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      router.push('/profile');
    }
  }, [router]);

  const handleLogin = () => {
    // Simulate login process
    localStorage.setItem('auth_token', 'dummy_token');
    router.push('/profile');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Log In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}