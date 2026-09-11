import React from 'react'
import { NavLink } from 'react-router'

const Header = () => {
  const navLinkStyle = ({ isActive }) =>
    `transition ${
      isActive
        ? 'font-semibold text-blue-600'
        : 'text-slate-600 hover:text-blue-600'
    }`

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          DentalCare
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          <NavLink
            to="/"
            className={navLinkStyle}
          >
            Home
          </NavLink>

          <NavLink
            to="/doctor"
            className={navLinkStyle}
          >
            Doctor
          </NavLink>

          <NavLink
            to="/services"
            className={navLinkStyle}
          >
            Services
          </NavLink>

          <NavLink
            to="/appointment"
            className={navLinkStyle}
          >
            Appointment
          </NavLink>

          <NavLink
            to="/doctor/login"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Doctor Login
          </NavLink>

        </nav>
      </div>
    </header>
  )
}

export default Header