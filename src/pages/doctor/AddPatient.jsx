import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { useClinic } from '../../context/ClinicContext'

const PATIENT_WHATSAPP_COUNTRY_CODE = '91'

const AddPatient = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    addPatient,
    linkPatientToAppointment,
  } = useClinic()

  const appointment = location.state?.appointment

  const today = new Date()
    .toISOString()
    .split('T')[0]

  const [formData, setFormData] = useState({
    name: appointment?.patientName || '',
    mobile: appointment?.mobile || '',
    problem: appointment?.reason || '',
    visitDate: appointment?.date || '',
    treatment: '',
    nextVisit: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})

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
      !appointment &&
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

  const formatDate = (date) => {
    if (!date) {
      return 'Not scheduled'
    }

    const [year, month, day] = date.split('-')

    return `${day}-${month}-${year}`
  }

  const sendPatientWhatsAppMessage = (patient) => {
    const mobile = patient.mobile.trim()

    const message =
      `Hello ${patient.name},\n\n` +
      `You visited Dr. Krishna Pal Gaur at DentalCare.\n\n` +
      `Visit Details:\n` +
      `Problem: ${patient.problem}\n` +
      `Visit Date: ${formatDate(patient.visitDate)}\n` +
      `Treatment: ${patient.treatment}\n` +
      `Next Visit: ${formatDate(patient.nextVisit)}\n` +
      `Notes: ${patient.notes || 'No additional notes'}\n\n` +
      `Thank you for visiting DentalCare.`

    const whatsappURL =
      `https://wa.me/${PATIENT_WHATSAPP_COUNTRY_CODE}${mobile}` +
      `?text=${encodeURIComponent(message)}`

    window.open(
      whatsappURL,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    const result = addPatient(formData)

    if (!result.success) {
      setErrors({
        mobile: result.message,
      })

      return
    }

    if (appointment) {
      linkPatientToAppointment(
        appointment.id,
        result.patientId
      )
    }

    sendPatientWhatsAppMessage(formData)

    navigate('/doctor/patients')
  }

  return (
    <div className="p-4 md:p-8">

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
          Add Patient
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Add a new patient record
        </p>
      </div>

      {/* Appointment Information */}
      {appointment && (
        <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 md:p-5">

          <p className="text-sm font-semibold text-blue-700">
            Creating patient from appointment
          </p>

          <div className="mt-3 grid gap-2 text-sm md:grid-cols-3 md:gap-3">

            <p className="text-slate-600">
              Patient:{' '}
              <span className="font-medium text-slate-800">
                {appointment.patientName}
              </span>
            </p>

            <p className="text-slate-600">
              Appointment Date:{' '}
              <span className="font-medium text-slate-800">
                {appointment.date}
              </span>
            </p>

            <p className="text-slate-600">
              Appointment Time:{' '}
              <span className="font-medium text-slate-800">
                {appointment.time}
              </span>
            </p>

          </div>
        </div>
      )}

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
              min={appointment ? appointment.date : undefined}
              max={!appointment ? today : undefined}
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
              placeholder="Enter additional notes"
              rows="4"
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 md:mt-8 sm:flex-row sm:gap-4">

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Add Patient & Send WhatsApp
          </button>

          <NavLink
            to="/doctor/appointments"
            className="w-full rounded-lg bg-slate-100 px-6 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-200 sm:w-auto"
          >
            Cancel
          </NavLink>

        </div>

      </form>
    </div>
  )
}

export default AddPatient