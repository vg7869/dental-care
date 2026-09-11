import React from 'react'
import { NavLink, useParams } from 'react-router'
import { usePatients } from '../../context/PatientContext'
import { useAppointments } from '../../context/AppointmentContext'

const PatientDetails = () => {
  const { id } = useParams()

  const { patients } = usePatients()
  const { appointments } = useAppointments()

  const patient = patients.find(
    (patient) => patient.id.toString() === id
  )

  const patientAppointment = appointments.find(
    (appointment) =>
      appointment.patientId?.toString() === id
  )

  if (!patient) {
    return (
      <div className="p-8">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-slate-800">
            Patient Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            The patient record does not exist.
          </p>

          <NavLink
            to="/doctor/patients"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Back to Patients
          </NavLink>

        </div>
      </div>
    )
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
    <div className="p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Patient Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View patient information and treatment details
          </p>
        </div>

        <div className="flex gap-3">

          <NavLink
            to={`/doctor/patients/${patient.id}/edit`}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Edit Patient
          </NavLink>

          <NavLink
            to="/doctor/patients"
            className="rounded-lg bg-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-300"
          >
            Back
          </NavLink>

        </div>

      </div>

      {/* Patient Card */}
      <div className="max-w-4xl rounded-xl bg-white p-8 shadow-sm">

        {/* Patient Header */}
        <div className="mb-8 flex items-center gap-5 border-b border-slate-200 pb-6">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            {patient.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {patient.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Patient ID: {patient.id}
            </p>
          </div>

        </div>

        {/* Patient Information */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Mobile */}
          <div>
            <p className="text-sm font-medium text-slate-500">
              Mobile
            </p>

            <p className="mt-1 text-lg text-slate-800">
              {patient.mobile}
            </p>
          </div>

          {/* Problem */}
          <div>
            <p className="text-sm font-medium text-slate-500">
              Problem
            </p>

            <p className="mt-1 text-lg text-slate-800">
              {patient.problem}
            </p>
          </div>

          {/* Visit Date */}
          <div>
            <p className="text-sm font-medium text-slate-500">
              Visit Date
            </p>

            <p className="mt-1 text-lg text-slate-800">
              {patient.visitDate}
            </p>
          </div>

          {/* Treatment */}
          <div>
            <p className="text-sm font-medium text-slate-500">
              Treatment
            </p>

            <p className="mt-1 text-lg text-slate-800">
              {patient.treatment}
            </p>
          </div>

          {/* Next Visit */}
          <div>
            <p className="text-sm font-medium text-slate-500">
              Next Visit
            </p>

            <p className="mt-1 text-lg text-slate-800">
              {patient.nextVisit || 'Not scheduled'}
            </p>
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-slate-500">
              Notes
            </p>

            <p className="mt-2 rounded-lg bg-slate-50 p-4 text-slate-700">
              {patient.notes || 'No notes available'}
            </p>
          </div>

        </div>

        {/* Appointment Information */}
        <div className="mt-10 border-t border-slate-200 pt-8">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Appointment Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Appointment connected with this patient
            </p>
          </div>

          {patientAppointment ? (
            <div className="rounded-xl bg-slate-50 p-6">

              <div className="grid gap-6 md:grid-cols-2">

                {/* Appointment Date */}
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Appointment Date
                  </p>

                  <p className="mt-1 text-lg font-medium text-slate-800">
                    {patientAppointment.date}
                  </p>
                </div>

                {/* Appointment Time */}
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Appointment Time
                  </p>

                  <p className="mt-1 text-lg font-medium text-slate-800">
                    {patientAppointment.time}
                  </p>
                </div>

                {/* Reason */}
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Reason for Visit
                  </p>

                  <p className="mt-1 text-lg text-slate-800">
                    {patientAppointment.reason}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Appointment Status
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                      patientAppointment.status
                    )}`}
                  >
                    {patientAppointment.status}
                  </span>
                </div>

              </div>

              {/* Appointment ID */}
              <div className="mt-6 border-t border-slate-200 pt-4">

                <p className="text-xs text-slate-500">
                  Appointment ID
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {patientAppointment.id}
                </p>

              </div>

            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-6 text-center">

              <p className="text-slate-500">
                No appointment is linked with this patient.
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default PatientDetails