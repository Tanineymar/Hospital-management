import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar.jsx"
import { useEffect, useState } from "react"
import API from "../../api/axios.js"

const avatarGradients = [
    "from-blue-400 to-blue-600",
    "from-rose-400 to-pink-600",
    "from-amber-400 to-orange-500",
    "from-violet-400 to-purple-600",
    "from-teal-400 to-cyan-600",
    "from-emerald-400 to-green-600",
]

function getInitials(name = "") {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
}

function BookAppointment() {
    const { doctorId } = useParams()
    const navigate = useNavigate()

    const [doctor, setDoctor] = useState(null)

    useEffect(() => {
        API.get(`/doctor/profile/${doctorId}`)
            .then((res) => {
                setDoctor(res.data.doctor)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [doctorId])

    const name = doctor?.user?.name || "Doctor"

    const initials = getInitials(name)

    const gradient = avatarGradients[
        doctor?._id
            ? doctor._id.charCodeAt(doctor._id.length - 1) %
            avatarGradients.length
            : 0
    ]

    return (
        <div className="min-h-screen bg-[#f8faff]">
            <Navbar />

            <div className="max-w-2xl mx-auto px-6 md:px-10 py-10">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 12H5m7-7l-7 7 7 7"
                        />
                    </svg>

                    Back to doctors
                </button>

                {/* Doctor Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 mb-6">

                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">

                        {/* Avatar */}
                        <div
                            className={`relative shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-2xl shadow-md`}
                        >
                            {initials}

                            <span
                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doctor?.isAvailable
                                        ? "bg-emerald-500"
                                        : "bg-slate-300"
                                    }`}
                            />
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-1 min-w-[180px]">

                            {doctor?.isAvailable && (
                                <span className="inline-block text-[11px] font-bold tracking-widest text-green-600 uppercase bg-green-100 px-3 py-1 rounded-full mb-2">
                                    Available Today
                                </span>
                            )}

                            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                                {name}
                            </h1>

                            <p className="text-sm font-semibold text-blue-600 mt-1">
                                {doctor?.specialization}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">

                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
                                    ⏱ {doctor?.experience} yrs exp
                                </span>

                                {doctor?.qualification && (
                                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
                                        🎓 {doctor.qualification}
                                    </span>
                                )}

                            </div>
                        </div>

                        {/* Fee */}
                        <div className="w-full sm:w-auto sm:text-right">

                            <p className="text-sm text-slate-500 font-medium">
                                Consultation Fee
                            </p>

                            <p className="text-3xl font-extrabold text-slate-900">
                                ₹{doctor?.consultationFee}
                            </p>

                        </div>

                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm hover:shadow-lg transition-all">
                    <p className="text-sm font-semibold text-blue-600 uppercase mb-4">Select Date</p>
                </div>
            </div>
        </div>
    )
}

export default BookAppointment