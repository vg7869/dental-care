import React from 'react'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Dental Checkup',
      description: 'Regular dental examination and oral health assessment.'
    },
    {
      id: 2,
      title: 'Root Canal Treatment',
      description: 'Professional treatment for infected or damaged teeth.'
    },
    {
      id: 3,
      title: 'Dental Filling',
      description: 'Treatment for cavities and damaged tooth structure.'
    },
    {
      id: 4,
      title: 'Teeth Cleaning',
      description: 'Professional cleaning to maintain healthy teeth and gums.'
    },
    {
      id: 5,
      title: 'Tooth Extraction',
      description: 'Safe and professional tooth removal when required.'
    },
    {
      id: 6,
      title: 'Dental Consultation',
      description: 'Consultation and treatment planning for your dental needs.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Services
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-800">
            Dental Treatments
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            We provide a range of dental services to help you
            maintain a healthy and confident smile.
          </p>

        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (

            <div
              key={service.id}
              className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-xl">
                🦷
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-800">
                {service.title}
              </h2>

              <p className="mt-3 leading-6 text-slate-600">
                {service.description}
              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  )
}

export default Services