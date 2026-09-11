import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">

        {/* Clinic Info */}
        <div>
          <h2 className="mb-3 text-xl font-bold">
            DentalCare
          </h2>
          <p className="text-sm leading-6 text-slate-300">
            Professional dental care with a focus on
            healthy smiles and comfortable treatment.
          </p>
        </div>

        {/* Contact (Clickable Links) */}
        <div>
          <h3 className="mb-3 font-semibold">
            Contact
          </h3>
          
          <p className="text-sm text-slate-300 mb-2">
            Phone:{' '}
            <a 
              href="tel:+919770979779" 
              className="hover:text-white hover:underline transition-colors"
            >
              +91 9770979779
            </a>
          </p>
          
          <p className="text-sm text-slate-300">
            Email:{' '}
            <a 
              href="mailto:Kpgaur77@gmail.com" 
              className="hover:text-white hover:underline transition-colors"
            >
              Kpgaur77@gmail.com
            </a>
          </p>
        </div>

        {/* Address */}
        <div>
          <h3 className="mb-3 font-semibold">
            Clinic Address
          </h3>
          <p className="text-sm leading-6 text-slate-300">
            Charnal Bus Stop Near Ahmedpur,
            <br />
            District Sehore,
            <br />
            Madhya Pradesh
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-400">
        © 2026 DentalCare. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer