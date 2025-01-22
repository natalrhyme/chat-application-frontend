import Link from "next/link"
import React from "react"

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">Welcome to Real-time Chat</h1>
      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  )
}

