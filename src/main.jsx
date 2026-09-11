import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'

import router from './router'
import AuthProvider from './context/AuthContext'
import PatientProvider from './context/PatientContext'
import AppointmentProvider from './context/AppointmentContext'
import ClinicProvider from './context/ClinicContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PatientProvider>
        <AppointmentProvider>
          <ClinicProvider>
            <RouterProvider router={router} />
          </ClinicProvider>
        </AppointmentProvider>
      </PatientProvider>
    </AuthProvider>
  </React.StrictMode>,
)