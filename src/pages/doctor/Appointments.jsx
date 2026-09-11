import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useClinic } from '../../context/ClinicContext'

const Appointments = () => {
  const {
    appointments,
    deleteAppointment,
    updateAppointment,
  } = useClinic()

  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredAppointments = appointments.filter(
    (appointment) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        appointment.patientName
          .toLowerCase()
          .includes(searchText) ||
        appointment.mobile.includes(search)

      const matchesDate =
        dateFilter === '' ||
        appointment.date === dateFilter

      const matchesStatus =
        statusFilter === 'All' ||
        appointment.status === statusFilter

      return (
        matchesSearch &&
        matchesDate &&
        matchesStatus
      )
    }
  )

  const handleStatusChange = (id, status) => {
    updateAppointment(id, {
      status,
    })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this appointment?'
    )

    if (confirmDelete) {
      deleteAppointment(id)
    }
  }

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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Appointments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage patient appointment requests
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-6 md:mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">
            Total
          </p>

          <p className="mt-2 text-2xl md:text-3xl font-bold text-blue-600">
            {appointments.length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">
            Pending
          </p>

          <p className="mt-2 text-2xl md:text-3xl font-bold text-yellow-600">
            {
              appointments.filter(
                (appointment) =>
                  appointment.status === 'Pending'
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">
            Confirmed
          </p>

          <p className="mt-2 text-2xl md:text-3xl font-bold text-blue-600">
            {
              appointments.filter(
                (appointment) =>
                  appointment.status === 'Confirmed'
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">
            Completed
          </p>

          <p className="mt-2 text-2xl md:text-3xl font-bold text-green-600">
            {
              appointments.filter(
                (appointment) =>
                  appointment.status === 'Completed'
              ).length
            }
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl bg-white p-4 md:p-6 shadow-sm border border-slate-100">

        <div className="grid gap-4 md:grid-cols-3">

          {/* Search */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search
            </label>

            <input
              type="text"
              placeholder="Search by name or mobile..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Appointment Date
            </label>

            <input
              type="date"
              value={dateFilter}
              onChange={(event) =>
                setDateFilter(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

        </div>

      </div>

      {/* Appointment Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100">

        <div className="overflow-x-auto">
          <table className="w-full min-w-275 text-left">

            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4 text-sm font-semibold text-slate-700">Patient</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-sm font-semibold text-slate-700">Mobile</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-sm font-semibold text-slate-700">Date</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-sm font-semibold text-slate-700">Time</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-sm font-semibold text-slate-700">Reason</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="transition hover:bg-slate-50">
                  <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-slate-800">
                    {appointment.patientName}
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 text-sm text-slate-600">
                    {appointment.mobile}
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 text-sm text-slate-600">
                    {appointment.date}
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 text-sm text-slate-600">
                    {appointment.time}
                  </td>
                  <td className="max-w-xs px-4 py-3 md:px-6 md:py-4 text-sm text-slate-600 truncate">
                    {appointment.reason}
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <select
                        value={appointment.status}
                        onChange={(event) => handleStatusChange(appointment.id, event.target.value)}
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 outline-none focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center gap-2">
                      {appointment.patientId ? (
                        <NavLink
                          to={`/doctor/patients/${appointment.patientId}`}
                          className="rounded-md bg-green-50 px-3 py-1.5 text-xs md:text-sm font-medium text-green-600 transition hover:bg-green-100"
                        >
                          View Patient
                        </NavLink>
                      ) : appointment.status === 'Confirmed' ? (
                        <NavLink
                          to="/doctor/patients/add"
                          state={{ appointment }}
                          className="rounded-md bg-blue-50 px-3 py-1.5 text-xs md:text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                          Create Patient
                        </NavLink>
                      ) : appointment.status === 'Pending' ? (
                        <span className="rounded-md bg-yellow-50 px-3 py-1.5 text-xs md:text-sm font-medium text-yellow-700">
                          Confirm First
                        </span>
                      ) : (
                        <span className="rounded-md bg-slate-50 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-400">
                          No Action
                        </span>
                      )}

                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="rounded-md bg-red-50 px-3 py-1.5 text-xs md:text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <div className="p-10 text-center bg-white">
            <h2 className="text-lg font-semibold text-slate-700">
              No appointments found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

export default Appointments