import React from 'react'
import { useNavigate } from 'react-router-dom'

// Apne assets folder se images import kar rahe hain
import personal from '../../assets/personal.png'
import tool1 from '../../assets/tools1.jpeg'
import tool2 from '../../assets/tool2.jpeg'
import tool3 from '../../assets/tool3.jpeg'

const Home = () => {
  // Navigate karne ke liye hook
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          
          {/* Grid setup for Text on left and Image on right */}
          <div className="grid items-center gap-12 md:grid-cols-2">
            
            {/* Left Side: Text and Buttons */}
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-100">
                Professional Dental Care
              </p>

              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Your Smile,
                <br />
                Our Priority
              </h1>

              <p className="mt-6 text-lg leading-8 text-blue-100">
                Experience professional and comfortable dental care
                from our experienced dental team.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {/* Book Appointment Button - Navigate to Appointment Page */}
                <button 
                  onClick={() => navigate('/appointment')} 
                  className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Book Appointment
                </button>

                {/* Meet Doctor Button - Navigate to Doctor Page */}
                <button 
                  onClick={() => navigate('/doctor')}
                  className="rounded-lg border border-white px-6 py-3 font-semibold transition hover:bg-blue-700 hover:border-blue-700"
                >
                  Meet Our Doctor
                </button>
              </div>
            </div>

            {/* Right Side: Clinic Image */}
            <div className="hidden md:flex justify-center">
              <img 
                src={personal} 
                alt="Our Dental Clinic" 
                className="h-80 w-full object-cover rounded-2xl shadow-xl border-4 border-white/20"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Advanced Facilities / Services Preview Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">
            Advanced Clinic Facilities
          </h2>
          <p className="mt-3 text-slate-600">
            Equipped with modern technology for your complete oral health.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">

          {/* Service 1: Portable X-Ray */}
          <div className="overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
            <img src={tool1} alt="Digital X-Ray" className="h-48 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Advanced Digital X-Ray
              </h3>
              <p className="mt-3 text-slate-600">
                Quick and accurate diagnosis using state-of-the-art portable X-ray technology.
              </p>
            </div>
          </div>

          {/* Service 2: Tooth Model / Patient Education */}
          <div className="overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
            <img src={tool2} alt="Patient Education" className="h-48 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Patient Education
              </h3>
              <p className="mt-3 text-slate-600">
                Detailed consultations using 3D anatomical models to explain your oral health clearly.
              </p>
            </div>
          </div>

          {/* Service 3: Dental Loupes */}
          <div className="overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
            <img src={tool3} alt="Precision Dentistry" className="h-48 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Precision Dentistry
              </h3>
              <p className="mt-3 text-slate-600">
                High-precision treatments utilizing advanced dental loupes for magnified visibility.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home