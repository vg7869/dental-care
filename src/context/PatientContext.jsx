import React, { createContext, useContext, useState } from 'react'
import initialPatients from '../data/patients'

const PatientContext = createContext()

const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem('patients')

    if (!savedPatients) {
      localStorage.setItem(
        'patients',
        JSON.stringify(initialPatients)
      )

      return initialPatients
    }

    try {
      const parsedPatients = JSON.parse(savedPatients)

      if (Array.isArray(parsedPatients)) {
        return parsedPatients
      }

      localStorage.setItem(
        'patients',
        JSON.stringify(initialPatients)
      )

      return initialPatients
    } catch (error) {
      console.error(
        'Failed to load patients from localStorage:',
        error
      )

      localStorage.setItem(
        'patients',
        JSON.stringify(initialPatients)
      )

      return initialPatients
    }
  })

  const savePatients = (updatedPatients) => {
    setPatients(updatedPatients)

    localStorage.setItem(
      'patients',
      JSON.stringify(updatedPatients)
    )
  }

  const addPatient = (patient) => {
    const normalizedMobile =
      patient.mobile.trim()

    const duplicatePatient = patients.find(
      (existingPatient) =>
        existingPatient.mobile === normalizedMobile
    )

    if (duplicatePatient) {
      return {
        success: false,
        message:
          'A patient with this mobile number already exists.',
      }
    }

    const newPatient = {
      ...patient,
      mobile: normalizedMobile,
      id: Date.now(),
    }

    savePatients([
      ...patients,
      newPatient,
    ])

    return {
      success: true,
      patientId: newPatient.id,
    }
  }

  const deletePatient = (id) => {
    const updatedPatients = patients.filter(
      (patient) =>
        patient.id !== id
    )

    savePatients(updatedPatients)
  }

  const updatePatient = (
    id,
    updatedData
  ) => {
    const normalizedMobile =
      updatedData.mobile.trim()

    const duplicatePatient = patients.find(
      (existingPatient) =>
        existingPatient.mobile === normalizedMobile &&
        existingPatient.id !== id
    )

    if (duplicatePatient) {
      return {
        success: false,
        message:
          'A patient with this mobile number already exists.',
      }
    }

    const updatedPatients = patients.map(
      (patient) =>
        patient.id === id
          ? {
              ...patient,
              ...updatedData,
              mobile: normalizedMobile,
            }
          : patient
    )

    savePatients(updatedPatients)

    return {
      success: true,
    }
  }

  const resetPatients = () => {
    savePatients(initialPatients)
  }

  return (
    <PatientContext.Provider
      value={{
        patients,
        addPatient,
        deletePatient,
        updatePatient,
        resetPatients,
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}

export const usePatients = () => {
  return useContext(PatientContext)
}

export default PatientProvider