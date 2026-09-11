import React from 'react'
import { NavLink } from 'react-router-dom' // Ensure it's react-router-dom
import { usePatients } from '../../context/PatientContext'
import { useAppointments } from '../../context/AppointmentContext'

// Doctor ki profile image import kar rahe hain
import kpImg from '../../assets/kp.jpeg'

const Dashboard = () => {
  const { patients } = usePatients()
  const { appointments } = useAppointments()

  const today = new Date().toISOString().split('T')[0]

  const pendingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === 'Pending'
  )

  const confirmedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === 'Confirmed'
  )

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === 'Completed'
  )

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.date === today
  )

  const upcomingFollowUps = patients.filter(
    (patient) =>
      patient.nextVisit &&
      patient.nextVisit >= today
  )

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      description: 'Registered patients',
    },
    {
      title: 'Total Appointments',
      value: appointments.length,
      description: 'All appointment requests',
    },
    {
      title: 'Pending',
      value: pendingAppointments.length,
      description: 'Waiting for confirmation',
    },
    {
      title: 'Confirmed',
      value: confirmedAppointments.length,
      description: 'Confirmed appointments',
    },
    {
      title: 'Completed',
      value: completedAppointments.length,
      description: 'Completed appointments',
    },
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      description: 'Appointments scheduled today',
    },
  ]

  const getStatusStyle = (status) => {
    if (status === 'Pending') {
      return 'bg-yellow-100 text-yellow-700'
    }

    if (status === 'Confirmed') {
      return 'bg-blue-100 text-blue-700'
    }

    if (status === 'Completed') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'Cancelled') {
      return 'bg-red-100 text-red-700'
    }

    return 'bg-slate-100 text-slate-700'
  }

  return (
    <div className="p-8">

      {/* Header Section (Updated with Name and Profile Image) */}
      <div className="mb-8 flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>
          <p className="mt-1 text-slate-500">
            Welcome back, <span className="font-semibold text-blue-600">Dr. Krishna Pal Gaur</span>. Here is your clinic overview.
          </p>
        </div>

        {/* Profile Image - Top Right */}
        <div className="shrink-0">
          <img 
            src={kpImg} 
            alt="Dr. Krishna Pal Gaur" 
            className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
          />
        </div>

      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl bg-white p-6 shadow-sm"
          >

            <p className="text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <p className="mt-3 text-4xl font-bold text-blue-600">
              {stat.value}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {stat.description}
            </p>

          </div>
        ))}

      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <div className="mt-5 flex flex-wrap gap-4">

          <NavLink
            to="/doctor/patients"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            View Patients
          </NavLink>

          <NavLink
            to="/doctor/patients/add"
            className="rounded-lg bg-slate-100 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Add Patient
          </NavLink>

          <NavLink
            to="/doctor/appointments"
            className="rounded-lg bg-slate-100 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-200"
          >
            View Appointments
          </NavLink>

        </div>

      </div>

      {/* Today's Appointments */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Today's Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Appointments scheduled for today
            </p>
          </div>

          <NavLink
            to="/doctor/appointments"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </NavLink>

        </div>

        <div className="mt-6 space-y-4">

          {todayAppointments.length > 0 ? (
            todayAppointments
              .sort((a, b) =>
                a.time.localeCompare(b.time)
              )
              .slice(0, 5)
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-4 rounded-lg bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                >

                  {/* Patient */}
                  <div>

                    <p className="font-semibold text-slate-800">
                      {appointment.patientName}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.reason}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {appointment.mobile}
                    </p>

                  </div>

                  {/* Appointment */}
                  <div className="flex items-center gap-4">

                    <div className="text-right">

                      <p className="text-sm font-semibold text-blue-600">
                        {appointment.time}
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>

                    </div>

                    {/* Patient Link */}
                    {appointment.patientId && (
                      <NavLink
                        to={`/doctor/patients/${appointment.patientId}`}
                        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50"
                      >
                        View Patient
                      </NavLink>
                    )}

                  </div>

                </div>
              ))
          ) : (
            <div className="rounded-lg bg-slate-50 p-6 text-center text-slate-500">
              No appointments scheduled for today.
            </div>
          )}

        </div>

      </div>

      {/* Pending Appointments */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Pending Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Appointment requests waiting for confirmation
            </p>
          </div>

          <NavLink
            to="/doctor/appointments"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </NavLink>

        </div>

        <div className="mt-6 space-y-4">

          {pendingAppointments.length > 0 ? (
            pendingAppointments
              .slice(0, 5)
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
                >

                  <div>

                    <p className="font-semibold text-slate-800">
                      {appointment.patientName}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.reason}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-medium text-blue-600">
                      {appointment.date}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {appointment.time}
                    </p>

                  </div>

                </div>
              ))
          ) : (
            <div className="rounded-lg bg-slate-50 p-6 text-center text-slate-500">
              No pending appointments.
            </div>
          )}

        </div>

      </div>

      {/* Upcoming Follow-ups */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Upcoming Follow-ups
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Patients scheduled for a future visit
            </p>
          </div>

          <NavLink
            to="/doctor/patients"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </NavLink>

        </div>

        <div className="mt-6 space-y-4">

          {upcomingFollowUps.length > 0 ? (
            upcomingFollowUps
              .sort((a, b) =>
                a.nextVisit.localeCompare(b.nextVisit)
              )
              .slice(0, 5)
              .map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
                >

                  <div>

                    <p className="font-semibold text-slate-800">
                      {patient.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {patient.problem}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-medium text-blue-600">
                      {patient.nextVisit}
                    </p>

                    <NavLink
                      to={`/doctor/patients/${patient.id}`}
                      className="mt-1 text-xs text-slate-500 hover:text-blue-600"
                    >
                      View Details
                    </NavLink>

                  </div>

                </div>
              ))
          ) : (
            <div className="rounded-lg bg-slate-50 p-6 text-center text-slate-500">
              No upcoming follow-ups.
            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Dashboard