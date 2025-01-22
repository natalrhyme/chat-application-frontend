"use client"

import React, { useState, useEffect, useRef } from "react"

interface Message {
  id: string
  role: "user" | "server"
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:1337")
    setSocket(ws)

    ws.onopen = () => {
      console.log("WebSocket connection established")
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), role: "server", content: message.message },
      ])
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event)
    }

    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() && socket) {
      const newMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      socket.send(JSON.stringify({ message: input.trim() }))
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.role === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

