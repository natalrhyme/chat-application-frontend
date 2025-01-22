"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import RegisterForm from "@/components/RegisterForm"

export default function RegisterPage() {
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
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
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  )
}

