import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { Brain, Mail, Lock, AlertCircle, ArrowLeft, Cloud } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post('/api/auth/login', formData)
      login(res.data.user, res.data.token)
      toast.success(`Welcome back, ${res.data.user.name}! 🎉`)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      setErrors({ submit: error.response?.data?.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-md w-full">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-white opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4 mr-2" />Back to Home
          </Link>
        </div>

        <div className="card glass-effect animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">ResumeParsePro</h1>
                <div className="flex items-center text-xs text-gray-500">
                  <Cloud className="h-3 w-3 mr-1" />Atlas Edition
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your cloud-powered dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="input pl-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errors.submit}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-4 text-lg font-semibold"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-3"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>

            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}