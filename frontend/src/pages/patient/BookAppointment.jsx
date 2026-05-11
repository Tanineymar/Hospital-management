import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar.jsx"
import { useEffect, useState } from "react"
import API from "../../api/axios.js"
import { useNavigate } from "react-router-dom"



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



function BookAppointment(){
    const {doctorId} = useParams()
    const navigate = useNavigate()
    const[doctor , setDoctor]=useState(null)

    useEffect(()=>{
        API.get(`/doctor/profile/${doctorId}`)
        .then((res)=>{
            setDoctor(res.data.doctor)
            console.log(res.data)
        })
    },[])

    const name = doctor?.user?.name 
    const initials = getInitials(name)
    const gradient = avatarGradients[  doctor?._id
    ? doctor._id.charCodeAt(doctor._id.length - 1) % avatarGradients.length
    : 0]

    return(
        <div className="min-h-screen bg-[#f8faff]">
            <Navbar/>
            <div className="max-w-2xl mx-auto px-6 md:px-10 py-10">
                <button onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                ><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
                    </svg>Back to doctors</button>

                    <div className="max-w-2xl bg-white border border-slate-100 rounded-2xl">
                       <div className={`relative shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-2xl shadow-md`}>
                            {initials}
                            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doctor?.isAvailable ? "bg-emerald-500" : "bg-slate-300"}`} />
                        </div>

                    </div>
                
            </div>

        </div>
    )
}
export default BookAppointment