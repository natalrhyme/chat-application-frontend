const API_URL = "http://localhost:1337"

export async function login(identifier: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  })
  return await response.json()
}

export async function register(username: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  })
  return await response.json()
}

export async function getCurrentUser(token: string) {
  const response = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return await response.json()
}

