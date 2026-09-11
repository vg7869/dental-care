import React from 'react'
import kp from '../../assets/kp.jpeg'

const Doctor = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          
          {/* Left Side: Doctor Image */}
          <div className="flex justify-center">
            <img 
              src={kp} 
              alt="Dr. Krishna Pal Gour" 
              className="flex h-72 w-72 items-center justify-center rounded-full bg-white object-cover shadow-md" 
            />
          </div>

          {/* Right Side: Doctor Details */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Meet Your Doctor
            </p>
            
            <h1 className="mt-3 text-4xl font-bold text-slate-800">
              Dr. Krishna Pal Gour
            </h1>
            
            <p className="mt-3 text-lg text-blue-600">
              Dental Surgeon
            </p>
            
            <p className="mt-6 leading-7 text-slate-600">
              Dr. Krishna Pal Gour is an experienced dental surgeon
              focused on providing comfortable and professional
              dental treatment for every patient.
            </p>

            {/* Experience & Patients Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-blue-600">10+</p>
                <p className="text-sm text-slate-600">Years Experience</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-blue-600">5000+</p>
                <p className="text-sm text-slate-600">Patients Treated</p>
              </div>
            </div>

            {/* Contact Details Section (Direct Call & Email) */}
            <div className="mt-8 rounded-lg bg-white p-6 shadow-sm border-t-4 border-blue-600">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Contact Details
              </h3>
              
              <div className="flex flex-col gap-4">
                
                {/* 1. Phone Link - Mobile par click karte hi Dial Pad khulega */}
                <a 
                  href="tel:+919770979779" 
                  className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium text-lg">+91 9770979779</span>
                </a>

                {/* 2. Email Link - Click karte hi Gmail/Email App khulega */}
                <a 
                  href="mailto:Kpgaur77@gmail.com" 
                  className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-lg">Kpgaur77@gmail.com</span>
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Doctor