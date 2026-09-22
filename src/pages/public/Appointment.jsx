import React, { useState } from 'react'
import { useClinic } from '../../context/ClinicContext'

// 👉 Yahan doctor ka WhatsApp number daalo (country code ke saath, bina + ya space ke)
// Example: India ka number 9876543210 hai to yaha '919876543210' likhna
const DOCTOR_WHATSAPP_NUMBER = '919770979779'

const Appointment = () => {
  const { addAppointment } = useClinic()

  const [formData, setFormData] = useState({
    patientName: '',
    mobile: '',
    date: '',
    time: '',
    reason: '',
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
    })

    setSuccess(false)
  }

  const validateForm = () => {
    const newErrors = {}

    const today = new Date()
      .toISOString()
      .split('T')[0]

    if (!formData.patientName.trim()) {
      newErrors.patientName =
        'Patient name is required'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile =
        'Mobile number is required'
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile =
        'Enter a valid 10-digit mobile number'
    }

    if (!formData.date) {
      newErrors.date =
        'Appointment date is required'
    } else if (formData.date < today) {
      newErrors.date =
        'Appointment date cannot be in the past'
    }

    if (!formData.time) {
      newErrors.time =
        'Appointment time is required'
    }

    if (!formData.reason.trim()) {
      newErrors.reason =
        'Please enter the reason for your visit'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Booking complete hone ke baad, patient ke apne WhatsApp se
  // (jis device/browser par form bhara gaya hai) doctor ke number par
  // ek hi WhatsApp tab khulta hai, jisme patient ki details pehle se
  // type hoti hain. User ko sirf "Send" dabana hota hai.
  const sendWhatsAppMessages = (data) => {
    const doctorMessage =
      `Nayi appointment book hui hai:\n\n` +
      `Patient Name: ${data.patientName}\n` +
      `Mobile: ${data.mobile}\n` +
      `Date: ${data.date}\n` +
      `Time: ${data.time}\n` +
      `Reason: ${data.reason}`

    const doctorWhatsappURL =
      `https://wa.me/${DOCTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(doctorMessage)}`

    window.open(doctorWhatsappURL, '_blank')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setSuccess(false)

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    addAppointment(formData)

    sendWhatsAppMessages(formData)

    setFormData({
      patientName: '',
      mobile: '',
      date: '',
      time: '',
      reason: '',
    })

    setErrors({})
    setSuccess(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-slate-800">
            Book an Appointment
          </h1>

          <p className="mt-3 text-slate-500">
            Schedule your visit with our dental doctor.
          </p>

        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-center text-green-700">
            Appointment booked successfully! WhatsApp is opening to send your details to the doctor.
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-sm"
        >

          <div className="grid gap-6 md:grid-cols-2">

            {/* Patient Name */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Patient Name
              </label>

              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
                  errors.patientName
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                }`}
              />

              {errors.patientName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.patientName}
                </p>
              )}

            </div>

            {/* Mobile */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
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

            {/* Date */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Appointment Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                min={new Date()
                  .toISOString()
                  .split('T')[0]}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
                  errors.date
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                }`}
              />

              {errors.date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.date}
                </p>
              )}

            </div>

            {/* Time */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Appointment Time
              </label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
                  errors.time
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                }`}
              />

              {errors.time && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.time}
                </p>
              )}

            </div>

            {/* Reason */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Reason for Visit
              </label>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Example: Tooth pain, cavity, regular check-up..."
                rows="4"
                className={`w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
                  errors.reason
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                }`}
              />

              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.reason}
                </p>
              )}

            </div>

          </div>

          {/* Submit */}
          <div className="mt-8">

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Book Appointment By Whatsapp
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default Appointment
