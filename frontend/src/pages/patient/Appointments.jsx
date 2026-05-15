import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar.jsx"
import API from "../../api/axios.js"
import { useNavigate } from "react-router-dom"


function myBooking() {
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

        <div className="min-h-screen bg-slate-100">

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
                            <p className="text-2xl font-extrabold text-blue-300 mb-4">8</p>
                            <p className="text-xs text-blue-400 mt-2 font-semibold">Upcoming</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-800 to-slate-950 rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg">
                            <p className="text-2xl font-extrabold text-blue-300 mb-4">0</p>
                            <p className="text-xs text-blue-400 mt-2 font-semibold ">Lab Tests</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-800 to-slate-950 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:">
                            <p className="text-2xl font-extrabold text-blue-300 mb-4">2</p>
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
                                !loading && appointments.length === 0 && (
                                    <div className="text-center py-16">
                                        <p className="text-5xl mb-4">📅</p>
                                        <p className="text-sm font-semibold text-slate-600">No appointments yet</p>
                                        <button
                                            onClick={() => navigate("/doctors")}
                                            className="mt-5 text-sm font-semibold text-white bg-blue-600 rounded-xl px-5 py-2.5 hover:bg-blue-700 transition-colors"
                                        >
                                            Find a Doctor
                                        </button>
                                    </div>
                                )
                            }

                            {
                                !loading && appointments.length > 0 && (
                                    <div className="mb-6">
                                        <p className="text-sm  tracking-widest text-slate-500 uppercase mb-3">Upcoming Appointments</p>
                                        <div className="flex flex-col gap-3">
                                            {
                                                UpcomingApts.map((apt)=>(
                                            <div key={apt._id}
                                                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4"
                                            >
                                                <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${getGradient(apt.doctor?._id)} flex items-center justify-center text-white text-sm font-bold`}>
                                                    {getInitials(apt.doctor?.user?.name)}
                                                </div>
                                            </div>
                                            )
                                        )}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )}

                </div>



            </div>
        </div>
    )
}

export default myBooking