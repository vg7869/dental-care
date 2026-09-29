
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import { useClinic } from '../../context/ClinicContext'

const EditPatient = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    patients,
    updatePatient,
  } = useClinic()

  const patient = patients.find(
    (patientItem) =>
      patientItem.id.toString() === id
  )

  const today = new Date()
    .toISOString()
    .split('T')[0]

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    problem: '',
    visitDate: '',
    treatment: '',
    nextVisit: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        mobile: patient.mobile,
        problem: patient.problem,
        visitDate: patient.visitDate,
        treatment: patient.treatment,
        nextVisit: patient.nextVisit || '',
        notes: patient.notes || '',
      })
    }
  }, [patient])

  if (!patient) {
    return (
      <div className="p-4 md:p-8">

        <div className="rounded-xl bg-white p-6 text-center shadow-sm md:p-8">

          <h1 className="text-xl font-bold text-slate-800 md:text-2xl">
            Patient Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            The patient record does not exist.
          </p>

          <NavLink
            to="/doctor/patients"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Patients
          </NavLink>

        </div>

      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
      general: '',
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name =
        'Patient name is required'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile =
        'Mobile number is required'
    } else if (
      !/^[0-9]{10}$/.test(formData.mobile)
    ) {
      newErrors.mobile =
        'Enter a valid 10-digit mobile number'
    }

    if (!formData.problem.trim()) {
      newErrors.problem =
        'Patient problem is required'
    }

    if (!formData.visitDate) {
      newErrors.visitDate =
        'Visit date is required'
    } else if (
      formData.visitDate > today
    ) {
      newErrors.visitDate =
        'Visit date cannot be in the future'
    }

    if (!formData.treatment.trim()) {
      newErrors.treatment =
        'Treatment is required'
    }

    if (
      formData.nextVisit &&
      formData.nextVisit < today
    ) {
      newErrors.nextVisit =
        'Next visit cannot be in the past'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    const result = updatePatient(
      patient.id,
      formData
    )

    if (!result.success) {
      setErrors({
        mobile: result.message,
      })

      return
    }

    navigate(
      `/doctor/patients/${patient.id}`
    )
  }

  return (
    <div className="p-4 md:p-8">

      {/* Header */}
      <div className="mb-6 md:mb-8">

        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
          Edit Patient
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update patient information
        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl rounded-xl bg-white p-5 shadow-sm md:p-8"
      >

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">

          {/* Patient Name */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Patient Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient name"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.name
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}

          </div>

          {/* Mobile */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Mobile
            </label>

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.mobile
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />

            {errors.mobile && (
              <p className="mt-1 text-sm text-red-600">
                {errors.mobile}
              </p>
            )}

          </div>

          {/* Problem */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Problem
            </label>

            <input
              type="text"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              placeholder="Example: Tooth Pain"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.problem
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />

            {errors.problem && (
              <p className="mt-1 text-sm text-red-600">
                {errors.problem}
              </p>
            )}

          </div>

          {/* Visit Date */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Visit Date
            </label>

            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              max={today}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.visitDate
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />

            {errors.visitDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.visitDate}
              </p>
            )}

          </div>

          {/* Treatment */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Treatment
            </label>

            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Example: Dental Filling"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.treatment
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />

            {errors.treatment && (
              <p className="mt-1 text-sm text-red-600">
                {errors.treatment}
              </p>
            )}

          </div>

          {/* Next Visit */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Next Visit
            </label>

            <input
              type="date"
              name="nextVisit"
              value={formData.nextVisit}
              min={today}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.nextVisit
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />

            {errors.nextVisit && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nextVisit}
              </p>
            )}

          </div>

          {/* Notes */}
          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Enter additional notes"
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 md:mt-8 sm:flex-row sm:gap-4">

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Update Patient
          </button>

          <NavLink
            to={`/doctor/patients/${patient.id}`}
            className="w-full rounded-lg bg-slate-100 px-6 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:w-auto"
          >
            Cancel
          </NavLink>

        </div>

      </form>
    </div>
  )
}

export default EditPatient

