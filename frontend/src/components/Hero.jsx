


function Hero() {
  return (
    <>
      <section className="grid md:grid-cols-2 gap-15 px-6 py-12 bg-blue-50">
        {/* Left */}
        <div>
          <span className="text-xs bg-blue-200 px-3 py-1 rounded-full text-blue-600 font-semibold">
            Trusted by 10,000+ patients
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold  mt-4">
            Care that feels <span className="text-blue-600">personal</span>
          </h1>
          <p className="text-gray-600 mt-4">
            Book appointments with top specialists, lab tests & track health all in one platform..
          </p>

          <div className="flex gap-3 mt-8">
            <button className="bg-blue-600  text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Find Doctor
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Book Lab Test
            </button>
          </div>
        </div>
        {/* Right Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl shadow-blue-900 ">
            <div className="flex items-center gap-4  bg-blue-950 p-5 rounded-t-2xl">
              <div className="w-14 h-14 rounded-full bg-blue-300 flex items-center justify-center font-bold text-blue-700 ">
                AM
              </div>

              <div>
                <h2 className="font-semibold text-lg text-white">
                  Dr. Arjun Mehta
                </h2>
                <p className="text-sm text-blue-300  font-semibold ">
                  Cardiologist
                </p>
              </div>
            </div>
            {/* Experience + Fee */}
            <div className="flex justify-between text-sm bg-slate-200 p-6">
              <div>
                <p className="font-semibold text-gray-800">14 yrs</p>
                <p className="text-gray-700 text-xs">Experience</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">₹800</p>
                <p className="text-gray-700 text-xs">Fee</p>
              </div>
            </div>

            {/* buttons */}
            <div className="flex gap-2 p-5">
            <button className="flex-1 py-2 rounded-xl border text-sm text-gray-600 hover:bg-gray-50 transition font-semibold">
              View Profile
            </button>

            <button className="flex-1 py-2 rounded-xl bg-blue-950 text-white text-sm hover:bg-blue-900 transition font-semibold">
              Book Appointment
            </button>
          </div>

          </div>
        </div>


      </section>
    </>
  )
}

export default Hero