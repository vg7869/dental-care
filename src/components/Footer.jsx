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
          
          <p className="text-sm text-slate-300 mb-2">
            Email:{' '}
            <a 
              href="mailto:Kpgaur77@gmail.com" 
              className="hover:text-white hover:underline transition-colors"
            >
              Kpgaur77@gmail.com
            </a>
          </p>

          <p className="text-sm text-slate-300">
            WhatsApp:{' '}
            <a
              href="https://wa.me/919770979779?text=Namaste%2C%20mujhe%20appointment%20ke%20baare%20me%20jaankari%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white hover:underline transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.11.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.63-.14.26.09 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
              </svg>
              Chat on WhatsApp
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
