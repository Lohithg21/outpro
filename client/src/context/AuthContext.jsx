import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      axios.get(`${API}/api/auth/me`)
        .then(res => setUser(res.data))
        .catch(() => { logout() })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/auth/login`, { email, password })
    const { token: t, user: u } = res.data
    localStorage.setItem('token', t)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + t
    setToken(t); setUser(u)
    return u
  }

  const adminLogin = async (email, password) => {
    const res = await axios.post(`${API}/api/auth/admin/login`, { email, password })
    const { token: t, user: u } = res.data
    localStorage.setItem('token', t)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + t
    setToken(t); setUser(u)
    return u
  }

  const register = async (name, email, password) => {
    const res = await axios.post(`${API}/api/auth/register`, { name, email, password })
    const { token: t, user: u } = res.data
    localStorage.setItem('token', t)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + t
    setToken(t); setUser(u)
    return u
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setToken(null); setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, adminLogin, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
