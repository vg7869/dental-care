import { createBrowserRouter } from 'react-router'

import PublicLayout from './components/PublicLayout'
import DoctorLayout from './components/DoctorLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/public/Home'
import Doctor from './pages/public/Doctor'
import Services from './pages/public/Services'
import Appointment from './pages/public/Appointment'

import Login from './pages/doctor/Login'
import Dashboard from './pages/doctor/Dashboard'
import Patients from './pages/doctor/Patients'
import PatientDetails from './pages/doctor/PatientDetails'
import Appointments from './pages/doctor/Appointments'
import AddPatient from './pages/doctor/AddPatient'
import EditPatient from './pages/doctor/EditPatient'

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'doctor',
        Component: Doctor,
      },
      {
        path: 'services',
        Component: Services,
      },
      {
        path: 'appointment',
        Component: Appointment,
      },
    ],
  },

  // Doctor Login
  {
    path: '/doctor/login',
    Component: Login,
  },

  // Protected Doctor Routes
  {
    element: (
      <ProtectedRoute>
        <DoctorLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '/doctor/dashboard',
        Component: Dashboard,
      },
      {
        path: '/doctor/patients',
        Component: Patients,
      },
      {
        path: '/doctor/patients/:id',
        Component: PatientDetails,
      },
      {
        path: '/doctor/appointments',
        Component: Appointments,
      },
      {
        path: '/doctor/patients/add',
        Component: AddPatient,
      },
      {
        path: '/doctor/patients/:id/edit',
        Component: EditPatient,
      },
    ],
  },
])

export default router