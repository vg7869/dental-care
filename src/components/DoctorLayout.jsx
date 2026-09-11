import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom' // Ensure react-router-dom
import { useAuth } from '../context/AuthContext'

const DoctorLayout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  // Mobile sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

      {/* Mobile Backdrop Overlay (Jab sidebar khula ho toh piche dark layer dikhegi) */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar (Responsive: Mobile pe hidden/sliding, Desktop pe fixed) */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

        {/* Logo & Close button for Mobile */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              DentalCare
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Doctor Panel
            </p>
          </div>

          {/* Close Button (Sirf mobile ke liye) */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">

          <NavLink
            to="/doctor/dashboard"
            onClick={() => setIsSidebarOpen(false)} // Mobile pe click karne pe sidebar band ho jaye
            className={navLinkStyle}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/doctor/patients"
            onClick={() => setIsSidebarOpen(false)}
            className={navLinkStyle}
          >
            Patients
          </NavLink>

          <NavLink
            to="/doctor/appointments"
            onClick={() => setIsSidebarOpen(false)}
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

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-h-screen lg:ml-64">

        {/* Mobile Top Navbar with Hamburger Toggle Button */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <span className="font-bold text-blue-600 text-lg">DentalCare Doctor</span>
          
          <div className="w-8"></div> {/* Spacer for alignment */}
        </header>

        {/* Outlet Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default DoctorLayout