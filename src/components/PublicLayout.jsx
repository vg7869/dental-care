import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default PublicLayout