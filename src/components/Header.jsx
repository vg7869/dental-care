import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const navLinkStyle = ({ isActive }) =>
    `transition text-sm md:text-base font-medium ${
      isActive
        ? 'text-blue-600'
        : 'text-slate-600 hover:text-blue-600'
    }`

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap md:flex-nowrap items-center justify-between px-4 py-4 md:px-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          DentalCare
        </NavLink>

        {/* Mobile Login Button (Sirf mobile par right side dikhega) */}
        <NavLink
          to="/doctor/login"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 md:hidden"
        >
          Doctor Login
        </NavLink>

        {/* Navigation & Desktop Login */}
        <nav className="mt-4 flex w-full items-center justify-between gap-2 overflow-x-auto border-t border-slate-100 pt-4 md:mt-0 md:w-auto md:gap-8 md:border-t-0 md:pt-0">
          
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/doctor" className={navLinkStyle}>
            Doctor
          </NavLink>

          <NavLink to="/services" className={navLinkStyle}>
            Services
          </NavLink>

          <NavLink to="/appointment" className={navLinkStyle}>
            Appointment
          </NavLink>

          {/* Desktop Login Button (Sirf laptop/desktop par right side mein dikhega) */}
          <NavLink
            to="/doctor/login"
            className="hidden md:inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Doctor Login
          </NavLink>

        </nav>
        
      </div>
    </header>
  )
}

export default Header