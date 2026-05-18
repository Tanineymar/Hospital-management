import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar.jsx"
import API from "../../api/axios.js"
import { useNavigate } from "react-router-dom"


function MyBooking() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([])
    const [labOrders, setLabOrders] = useState([])
    const [activeTab, setActiveTab] = useState("appointments")

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                setError(null)
                const [appointmentsRes, labOrdersRes] = await Promise.all([
                    API.get("/appointments/my"),
                    API.get("/lab-orders/my")
                ])
                console.log(appointmentsRes.data)
                console.log(labOrdersRes.data)

                setAppointments(appointmentsRes.data.appointments)
                setLabOrders(labOrdersRes.data.labOrders)

            } catch (error) {
                console.log(error)
                setError("Failed to load bookings")
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [])

    function getInitials(name = "") {
        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join("")
            .toUpperCase()
    }

    function isPast(apt) {
        if (apt.isRejected) return true
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return new Date(apt.date) < today
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    }

    const UpcomingApts = appointments.filter((apt) => !isPast(apt))
    const pastApts = appointments.filter((apt) => isPast(apt))

    const avatarGradients = {
        blue: "from-blue-400 to-blue-600",
        rose: "from-rose-400 to-pink-600",
        violet: "from-violet-400 to-purple-600",
        teal: "from-teal-400 to-cyan-600",
        emerald: "from-emerald-400 to-green-600",
        amber: "from-amber-400 to-orange-500",
    }

    function getGradient(id = "") {
        const gradients = Object.values(avatarGradients)

        return gradients[
            id.charCodeAt(id.length - 1) % gradients.length
        ]
    }


    return (

        <div className="min-h-screen bg-[#f8faff]">

            <Navbar />
            <div className="min-h-screen bg-[#f8faff]">
                <div className="max-w-2xl mx-auto px-6 py-8">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
                        </svg>
                        Back</button>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2.5">My <span className="text-blue-600">Bookings</span></h1>
                    <p className="text-sm text-slate-600 mb-6">Track your appointments and lab tests</p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-gradient-to-br from-blue-800 to-slate-950 rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg">
                            <p className="text-2xl font-extrabold text-blue-300 mb-4">{UpcomingApts.length}</p>
                            <p className="text-xs text-blue-400 mt-2 font-semibold">Upcoming</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-800 to-slate-950 rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg">
                            <p className="text-2xl font-extrabold text-blue-300 mb-4">0</p>
                            <p className="text-xs text-blue-400 mt-2 font-semibold ">Lab Tests</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-800 to-slate-950 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:">
                            <p className="text-2xl font-extrabold text-blue-300 mb-4">{pastApts.length}</p>
                            <p className="text-xs text-blue-400 mt-2 font-semibold">Past Visits</p>
                        </div>
                    </div>

                    <div className="flex gap-2 bg-white border border-slate-200 rounded-xl  p-1 w-fit mb-6 shadow-sm">
                        <button onClick={() => setActiveTab("appointments")}
                            className={`text-sm font-semibold px-5 py-2 rounded-lg transition-all ${activeTab === "appointments" ? "bg-blue-600 text-white" : "text-slate-500"}`}
                        >
                            Appointments
                        </button>
                        <button onClick={() => setActiveTab("labtests")}
                            className={`text-sm font-semibold px-5 py-2 rounded-lg transition-all ${activeTab === "labtests" ? "bg-blue-600 text-white" : "text-slate-500"}`}
                        >
                            Lab Tests
                        </button>
                    </div>

                    {activeTab === "appointments" && (
                        <div>
                            {loading && (
                                <div className="flex justify-center items-center py-20">
                                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                </div>
                            )}

                            {
                                !loading && appointments.length >= 0 && (
                                    <div className="mb-6">
                                        <p className="text-xs tracking-widest text-slate-500 uppercase mb-3">Upcoming Appointments</p>
                                        <div className="flex flex-col gap-3">
                                            {
                                                UpcomingApts.map((apt) => (
                                                    <div key={apt._id}
                                                        className="bg-blue-50 rounded-2xl border border-slate-100 shadow-sm  p-4 flex items-center gap-4 mb-5"
                                                    >
                                                        <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${getGradient(apt.doctor?._id)} flex items-center justify-center text-white text-sm font-bold`}>
                                                            {getInitials(apt.doctor?.user?.name)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-slate-900 truncate">{apt.doctor?.user?.name}</p>
                                                            <p className="text-xs font-semibold text-blue-600 mt-0.5">{apt.doctor?.specialization}</p>
                                                            <div className="flex gap-3 mt-4">
                                                                <p className="text-xs text-slate-600">📅{formatDate(apt.date)}, {apt.slot}</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                                            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full  text-green-600 border bg-green-100">
                                                                Confirmed
                                                            </span>
                                                            <p className="text-base font-extrabold text-slate-900">
                                                                ₹{apt.doctor?.consultationFee}
                                                            </p>

                                                        </div>
                                                    </div>

                                                )
                                                )}

                                            {
                                                !loading && appointments.length === 0 && (
                                                    <div className="bg-white border border-blue-100 rounded-3xl shadow-lg p-10 max-w-lg mx-auto flex flex-col items-center text-center ">
                                                        <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                                                            <svg
                                                                className="w-10 h-10 text-blue-500"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>

                                                        <h2 className="text-lg font-bold text-slate-800 mb-2">
                                                            No appointments yet
                                                        </h2>

                                                        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                                                            You haven’t booked any doctor appointments yet.
                                                            Find specialists and schedule your consultation easily.
                                                        </p>

                                                        <button
                                                            onClick={() => navigate("/doctors")}
                                                            className="mt-5 text-sm font-semibold text-white bg-blue-600 rounded-xl px-5 py-2.5 hover:bg-blue-700 transition-colors"
                                                        >
                                                            Find a Doctor
                                                        </button>
                                                    </div>
                                                )
                                            }

                                             {/* {
                                                !loading && UpcomingApts.length === 0 && (
                                                    <div className="bg-red-100 rounded-2xl border font-semibold text-red-500 border-red-600 p-5">
                                                        <h1>No upcoming appointments</h1>
                                                    </div>
                                                )
                                            }  */}

                                            {
                                                !loading && pastApts.length > 0 && (
                                                    <div>
                                                        <p className="text-xs tracking-widest text-slate-500 uppercase mb-3">Past appointments</p>

                                                        <div className="flex flex-col gap-3">
                                                            {
                                                                pastApts.map((apt) => (
                                                                    <div key={apt._id}
                                                                        className="bg-blue-50 rounded-2xl border border-slate-100 shadow-sm p-4 flex itme 
                                                                          gap-4 opacity-60"
                                                                    >
                                                                        <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${getGradient(apt.doctor?._id)} flex items-center justify-center text-white text-sm font-bold`}>
                                                                            {getInitials(apt.doctor?.user?.name)}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-bold text-slate-900 truncate">{apt.doctor?.user?.name}</p>
                                                                            <p className="text-xs font-semibold text-blue-600 mt-0.5">{apt.doctor?.specialization}</p>
                                                                            <div className="flex gap-3 mt-2">
                                                                                <p className="text-xs text-slate-500">📅{formatDate(apt.date)}, {apt.slot}</p>
                                                                            </div>
                                                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                                                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${apt.isRejected ? "bg-red-200  text-red-600 border" : "bg-blue-100 text-blue-700 border"}`}>{apt.isRejected ? "cancelled" : "completed"}</span>
                                                                                <p className="text-base font-extrabold text-slate-900">₹{apt.doctor?.consultationFee}</p>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )}

                    {/* Lab test  */}
                    {
                        activeTab === "labtest" && (
                            <div></div>
                        )
                    }

                </div>



            </div>
        </div>
    )
}

export default MyBooking