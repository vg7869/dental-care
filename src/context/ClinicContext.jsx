import React, { createContext, useContext } from 'react'
import { usePatients } from './PatientContext'
import { useAppointments } from './AppointmentContext'

const ClinicContext = createContext()

const ClinicProvider = ({ children }) => {
  const {
    patients,
    addPatient,
    deletePatient,
    updatePatient,
    resetPatients,
  } = usePatients()

  const {
    appointments,
    addAppointment,
    deleteAppointment,
    updateAppointment,
    updateAppointmentStatus,
    linkPatientToAppointment,
    getAppointmentById,
    getAppointmentsByPatientId,
    resetAppointments,
  } = useAppointments()

  const deletePatientWithAppointments = (patientId) => {
    const linkedAppointments =
      getAppointmentsByPatientId(patientId)

    linkedAppointments.forEach(
      (appointment) => {
        updateAppointment(
          appointment.id,
          {
            patientId: null,
          }
        )
      }
    )

    deletePatient(patientId)
  }

  const createPatientFromAppointment = (
    appointment
  ) => {
    const result = addPatient({
      name: appointment.patientName,
      mobile: appointment.mobile,
      problem: appointment.reason,
      visitDate: appointment.date,
      treatment: '',
      nextVisit: '',
      notes: '',
    })

    if (!result.success) {
      return result
    }

    linkPatientToAppointment(
      appointment.id,
      result.patientId
    )

    return result
  }

  return (
    <ClinicContext.Provider
      value={{
        patients,
        appointments,

        addPatient,
        updatePatient,
        deletePatient:
          deletePatientWithAppointments,
        resetPatients,

        addAppointment,
        deleteAppointment,
        updateAppointment,
        updateAppointmentStatus,
        linkPatientToAppointment,
        getAppointmentById,
        getAppointmentsByPatientId,
        resetAppointments,

        createPatientFromAppointment,
      }}
    >
      {children}
    </ClinicContext.Provider>
  )
}

export const useClinic = () => {
  return useContext(ClinicContext)
}

export default ClinicProvider