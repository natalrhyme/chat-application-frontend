"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ChatInterface from "@/components/ChatInterface"

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <div className="min-h-screen bg-blue-50 flex justify-center items-center text-blue-800">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <ChatInterface />
    </div>
  )
}

