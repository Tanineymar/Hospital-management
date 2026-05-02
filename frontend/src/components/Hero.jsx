


function Hero() {
  return (
    <>
      <section className="grid md:grid-cols-2 gap-8 px-6 py-12 bg-blue-50">
        {/* Left */}
        <div>
          <span className="text-xs bg-blue-100 px-3 py-1 rounded-full text-blue-600 font-semibold">
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
          <div className="bg-white p-5 rounded-xl w-70 shadow-2xl shadow-blue-900 h">
            <div className="bg-blue-100 w-10 h-10 p-2 rounded-full flex justify-center items-center font-semibold text-blue-700">
              AK
              </div>
              

          </div>
        </div>
        
      </section>
    </>
  )
}

export default Hero