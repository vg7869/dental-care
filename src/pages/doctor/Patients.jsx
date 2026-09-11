
import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { useClinic } from '../../context/ClinicContext'

const Patients = () => {
  const {
    patients,
    deletePatient,
  } = useClinic()

  const [search, setSearch] = useState('')

  const filteredPatients = patients.filter(
    (patient) => {
      const searchText = search.toLowerCase()

      return (
        patient.name
          .toLowerCase()
          .includes(searchText) ||
        patient.mobile.includes(search)
      )
    }
  )

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this patient?'
    )

    if (confirmDelete) {
      deletePatient(id)
    }
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Patients
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your patient records
          </p>
        </div>

        <NavLink
          to="/doctor/patients/add"
          className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-700"
        >
          + Add Patient
        </NavLink>

      </div>

      {/* Statistics */}
      <div className="mb-6 grid gap-6 sm:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Patients
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {patients.length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Search Results
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-800">
            {filteredPatients.length}
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Search Patient
        </label>

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search by patient name or mobile..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </div>

      {/* Patient Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">

            <thead className="bg-slate-50">
              <tr>

                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Patient
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Mobile
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Problem
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Visit Date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Treatment
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredPatients.map(
                (patient) => (
                  <tr
                    key={patient.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Patient */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                          {patient.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="font-medium text-slate-800">
                            {patient.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            ID: {patient.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Mobile */}
                    <td className="px-6 py-4 text-slate-600">
                      {patient.mobile}
                    </td>

                    {/* Problem */}
                    <td className="px-6 py-4 text-slate-600">
                      {patient.problem}
                    </td>

                    {/* Visit Date */}
                    <td className="px-6 py-4 text-slate-600">
                      {patient.visitDate}
                    </td>

                    {/* Treatment */}
                    <td className="px-6 py-4 text-slate-600">
                      {patient.treatment}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <NavLink
                          to={`/doctor/patients/${patient.id}`}
                          className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                          View
                        </NavLink>

                        <NavLink
                          to={`/doctor/patients/${patient.id}/edit`}
                          className="rounded-md bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700 transition hover:bg-yellow-100"
                        >
                          Edit
                        </NavLink>

                        <button
                          onClick={() =>
                            handleDelete(patient.id)
                          }
                          className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <div className="p-10 text-center">

            <div className="text-4xl">
              🦷
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              No patients found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different name or mobile number.
            </p>

            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Clear Search
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  )
}

export default Patients
