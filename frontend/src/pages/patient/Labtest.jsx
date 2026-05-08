import Navbar from "../../components/Navbar.jsx"

function Labtest(){
    return(
        <>
        <div className="min-h-screen bg-[#f8faff]">
            <Navbar/>
            <div className="relative bg-blue-950 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 20%, #818cf8 0%, transparent 40%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-300 uppercase mb-3">
                NABL Certified Labs
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Book Lab Tests <br className="hidden md:block" />
                <span className="text-blue-300">from home</span>
              </h1>
              <p className="mt-3 text-blue-200 text-sm max-w-md">
                800+ tests across 8 departments. Sample collected at your doorstep. Reports in 6–24 hrs.
              </p>
        </div>
            </div>
        </div>
        </>
    )
}

export default Labtest