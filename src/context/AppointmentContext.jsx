import React, { createContext, useContext, useState } from 'react'

const AppointmentContext = createContext()

const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments =
      localStorage.getItem('appointments')

    if (!savedAppointments) {
      return []
    }

    try {
      const parsedAppointments =
        JSON.parse(savedAppointments)

      if (Array.isArray(parsedAppointments)) {
        return parsedAppointments
      }

      localStorage.removeItem('appointments')

      return []
    } catch (error) {
      console.error(
        'Failed to load appointments from localStorage:',
        error
      )

      localStorage.removeItem('appointments')

      return []
    }
  })

  const saveAppointments = (updatedAppointments) => {
    setAppointments(updatedAppointments)

    localStorage.setItem(
      'appointments',
      JSON.stringify(updatedAppointments)
    )
  }

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      status: 'Pending',
      patientId: null,
    }

    saveAppointments([
      ...appointments,
      newAppointment,
    ])

    return newAppointment
  }

  const deleteAppointment = (id) => {
    const appointmentExists =
      appointments.some(
        (appointment) =>
          appointment.id === id
      )

    if (!appointmentExists) {
      return false
    }

    const updatedAppointments =
      appointments.filter(
        (appointment) =>
          appointment.id !== id
      )

    saveAppointments(updatedAppointments)

    return true
  }

  const updateAppointment = (
    id,
    updatedData
  ) => {
    const appointmentExists =
      appointments.some(
        (appointment) =>
          appointment.id === id
      )

    if (!appointmentExists) {
      return false
    }

    const updatedAppointments =
      appointments.map(
        (appointment) =>
          appointment.id === id
            ? {
                ...appointment,
                ...updatedData,
              }
            : appointment
      )

    saveAppointments(updatedAppointments)

    return true
  }

  const updateAppointmentStatus = (
    id,
    status
  ) => {
    const validStatuses = [
      'Pending',
      'Confirmed',
      'Completed',
      'Cancelled',
    ]

    if (!validStatuses.includes(status)) {
      return false
    }

    return updateAppointment(
      id,
      { status }
    )
  }

  const linkPatientToAppointment = (
    appointmentId,
    patientId
  ) => {
    const appointmentExists =
      appointments.some(
        (appointment) =>
          appointment.id === appointmentId
      )

    if (!appointmentExists) {
      return false
    }

    const updatedAppointments =
      appointments.map(
        (appointment) =>
          appointment.id === appointmentId
            ? {
                ...appointment,
                patientId,
              }
            : appointment
      )

    saveAppointments(updatedAppointments)

    return true
  }

  const getAppointmentById = (id) => {
    return appointments.find(
      (appointment) =>
        appointment.id === id
    )
  }

  const getAppointmentsByPatientId = (
    patientId
  ) => {
    return appointments.filter(
      (appointment) =>
        appointment.patientId === patientId
    )
  }

  const resetAppointments = () => {
    saveAppointments([])
  }

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        deleteAppointment,
        updateAppointment,
        updateAppointmentStatus,
        linkPatientToAppointment,
        getAppointmentById,
        getAppointmentsByPatientId,
        resetAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export const useAppointments = () => {
  return useContext(AppointmentContext)
}

export default AppointmentProvider