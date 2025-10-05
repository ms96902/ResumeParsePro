import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.defaults.baseURL = 'http://localhost:3001'
    }
  }, [token])

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await axios.get('/api/auth/me')
          setUser(res.data.user)
        } catch (error) {
          logout()
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('token', userToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <div className="loading-spinner mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">ResumeParsePro Atlas</h2>
          <p>Connecting to cloud database...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster position="top-right" toastOptions={{
          style: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', borderRadius: '12px' }
        }} />
      </Router>
    </AuthContext.Provider>
  )
}