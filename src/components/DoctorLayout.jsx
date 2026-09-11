import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const DoctorLayout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/doctor/login')
  }

  const navLinkStyle = ({ isActive }) =>
    `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
    }`

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-white shadow-md">

        {/* Logo */}
        <div className="border-b border-slate-200 px-6 py-5">
          <h1 className="text-2xl font-bold text-blue-600">
            DentalCare
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Doctor Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">

          <NavLink
            to="/doctor/dashboard"
            className={navLinkStyle}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/doctor/patients"
            className={navLinkStyle}
          >
            Patients
          </NavLink>

          <NavLink
            to="/doctor/appointments"
            className={navLinkStyle}
          >
            Appointments
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="border-t border-slate-200 p-4">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen flex-1">
        <Outlet />
      </main>

    </div>
  )
}

export default DoctorLayout