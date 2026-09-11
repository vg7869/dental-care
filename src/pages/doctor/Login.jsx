import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  // 1. formData mein username ki jagah email set kar diya
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    // 2. Auth context me ab email pass hoga
    const success = login(
      formData.email,
      formData.password
    )

    if (success) {
      navigate('/doctor/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* 3. Back to Home Navigation Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute left-6 top-6 flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Home
        </button>

        <div className="mb-8 mt-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Doctor Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to manage your patients and appointments
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 4. Username field ko change karke Email bana diya */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        {/* Demo Credentials wala section yahan se remove kar diya gaya hai */}

      </div>
    </div>
  )
}

export default Login