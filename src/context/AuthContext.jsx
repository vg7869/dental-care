import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('doctorAuth') === 'true'
  })

  const login = (email, password) => {
    if (email === 'kpgaur77@gmail.com' && password === 'Kp@123') {
      localStorage.setItem('doctorAuth', 'true')
      setIsAuthenticated(true)

      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem('doctorAuth')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider