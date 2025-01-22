"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: username, password }),
      })

      const data = await response.json()

      if (data.jwt) {
        localStorage.setItem("token", data.jwt)
        router.push("/chat")
      } else {
        setError(data.error.message)
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  )
}

