import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar.jsx"
import { useEffect, useState } from "react"
import API from "../../api/axios.js"
import { Nut } from "lucide-react"

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

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const [days] = useState(getNext7Days)
    const [selectedDayIdx , setSelectedDayIdx] = useState(0)

    const TIME_SLOTS = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM",
    "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
    "04:00 PM","04:30 PM","05:00 PM",
    ]

    const [selectedSlot , setSelectedSlot] = useState(null)
    useEffect(() => {
        API.get(`/doctor/profile/${doctorId}`)
            .then((res) => {
                setDoctor(res.data.doctor)
                console.log(selectedDayIdx)
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


     function getNext7Days(){
        return Array.from({length: 7}, (_, i)=>{
            const date = new Date()
            date.setDate(date.getDate()+ i)
            return date
        })
    }

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

                <h1 className="text-2xl font-bold mb-6">Book <span className="text-blue-600">Appointment</span></h1>

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
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {
                        days.map((day , i)=>(
                            <button key={i}
                             onClick={()=>setSelectedDayIdx(i)}
                             className={`shrink-0 flex flex-col items-center rounded-xl px-4 py-3 border text-sm font-medium transition-all
                                    ${selectedDayIdx === i
                                        ? "bg-blue-600 border-blue-600  text-white shadow-md shadow-blue-100"
                                        : "border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-600"
                                    }`}>


                                <span>{dayNames[day.getDay()]}</span>
                                <span>{day.getDate()}</span>
                                <span>{monthNames[day.getMonth()]}</span>
                            </button>
                        ))
                    }
                    </div>
                </div>

                 <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm hover:shadow-lg transition-all">
                    <p className="text-sm font-semibold text-blue-600 uppercase mb-4">Select Time Slot</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 ">
                        {
                            TIME_SLOTS.map((slot , i)=>(
                                <button key={i}
                                onClick={()=>setSelectedSlot(slot)}
                                 className={`rounded-xl py-3 text-sm font-semibold border transition-all

                             ${
                    selectedSlot === slot
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                         }`}
                                 >
                                    {slot}
                                </button>
                            ))
                        }
                    </div>
                 </div>

                 <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5 shadow-sm">
                    <label className="text-sm font-semibold text-slate-700 block mb-3">
                        Reason for Visit <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                        rows={3}
                        // value={reason}
                        // onChange={(e) => setReason(e.target.value)}
                        placeholder="Briefly describe your symptoms or reason for the visit..."
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    />
                </div>
            </div>
        </div>
    )
}

export default BookAppointment