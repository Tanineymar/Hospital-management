import { useEffect, useState, useRef } from "react"
import API from "../../api/axios"
import Navbar from "../../components/Navbar.jsx"
import { useNavigate } from "react-router-dom"


// ─── HELPERS ──────────────────────────────────────────────
const avatarGradients = [
    "from-blue-400 to-blue-600",
    "from-rose-400 to-pink-600",
    "from-amber-400 to-orange-500",
    "from-violet-400 to-purple-600",
    "from-teal-400 to-cyan-600",
    "from-emerald-400 to-green-600",
]

function getInitials(name = "") {
    return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}


// ─── DOCTOR CARD ──────────────────────────────────────────
function DoctorCard({ doc, index }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    const name = doc.user?.name || "Doctor"
    const initials = getInitials(name)
    const gradient = avatarGradients[index % avatarGradients.length]

    return (
        <div
            ref={ref}
            className={`group bg-white rounded-2xl border border-slate-100 overflow-hidden
        hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1
        transition-all duration-500 cursor-pointer shadow
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            {/* Card top */}
            <div className="p-5 pb-4">
                <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`relative shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                        {initials}
                        {/* availability dot — green if doc.available exists, else show grey */}
                        <span
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doc.isAvailable ? "bg-emerald-500" : "bg-slate-300"
                                }`}
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                         {/* <span className="inline-block text-[11px] font-bold tracking-widest text-green-600 uppercase bg-green-100 px-3 py-0.5 rounded-full">
                                    Available 
                                </span> */}
                        <h3 className="font-bold text-slate-800 text-base leading-tight truncate">{name}</h3>
                        <p className="text-sm text-blue-600 font-semibold mt-0.5 ">{doc.specialization}</p>
                        {/* <span className="text-sm font-semibold text-green-600 bg-green-100 p-0.5 px-2 rounded-full">Available</span> */}
                    </div>
                </div>

                {/* Info pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {doc.experience} yrs exp
                    </span>



                    {doc.qualification && (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
                            🎓 {doc.qualification}
                        </span>
                    )}
                </div>
            </div>

            <div className="mx-5 border-t border-slate-100" />

            {/* Bottom */}
            <div className="p-5 pt-4">

                {/* Fee + CTA */}
                <div className="flex items-center gap-3">
                    <div>
                        <p className="text-[11px] text-slate-400 font-medium">Fee</p>
                        {/* <p className="text-xl font-bold text-slate-800">₹{doc.consultationFee}</p> */}
                        <p className="text-xl font-extrabold text-slate-800">₹{doc.consultationFee}</p>
                    </div>
                    <button onClick={()=>navigate(`/doctor/profile/${doc._id}`)} className="flex-1  rounded-xl border border-blue-200 bg-white  py-2.5 text-sm font-semibold text-blue-600 transition-all shadow-md shadow-blue-100 duration-200 hover:bg-blue-50 hover:border-blue-600">
                        View Profile
                    </button>
                    <button onClick={() => navigate(`/book/${doc._id}`)} className="flex-1 rounded-xl bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md shadow-blue-100">
                        Consult Now
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── MAIN ─────────────────────────────────────────────────
function FetchDoctors() {
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        API.get('/doctor')
            .then((res) => {
                setDoctors(res.data.doctors || [])
                console.log(res.data)
            })
            .catch((err) => {
                console.error(err)
                setError("Failed to load doctors. Please try again.")
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-[#f8faff]">
            <Navbar />
          

            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12">
                
                {/* Heading */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">
                            Our Specialists
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                            Meet our <span className="text-blue-600">top doctors</span>
                        </h2>
                        <p className="mt-3 text-slate-500 text-base max-w-md">
                            Verified specialists with real credentials and thousands of happy patients.
                        </p>
                    </div>
                    <a href="#" className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group">
                        View all doctors
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
                  {
    loading && (
        <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    )
}

                {/* Error */}
                {!loading && error && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-700">Something went wrong</p>
                            <p className="text-sm text-slate-400 mt-1">{error}</p>
                        </div>
                        <button
                            onClick={() => { setError(null); setLoading(true); API.get('/doctor').then(res => setDoctors(res.data.doctors || [])).catch(() => setError("Failed again.")).finally(() => setLoading(false)) }}
                            className="rounded-xl bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 hover:bg-blue-700 active:scale-95 transition-all"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && doctors.length === 0 && (
                    <div className="text-center py-24 text-slate-400">
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-semibold">No doctors found</p>
                    </div>
                )}

                {/* Cards */}
                {!loading && !error && doctors.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {doctors.map((doc, i) => (
                            <DoctorCard key={doc._id} doc={doc} index={i} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default FetchDoctors