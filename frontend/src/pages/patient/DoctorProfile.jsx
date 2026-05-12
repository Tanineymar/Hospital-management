import { useEffect, useState } from "react"
import API from "../../api/axios"
import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
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


function DoctorProfile() {

    const { doctorId } = useParams()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState(null)
    const [selectedDay, setSelectedDay] = useState(0)

    useEffect(() => {
        API.get(`/doctor/profile/${doctorId}`)
            .then((res) => {
                console.log(res.data.doctor)
                setDoctor(res.data.doctor)
            })
    }, [doctorId])

    const name = doctor?.user?.name 
    const initials = getInitials(name)
    const gradient = avatarGradients[  doctor?._id
    ? doctor._id.charCodeAt(doctor._id.length - 1) % avatarGradients.length
    : 0]


    return (
        <div className="min-h-screen bg-[#f8faff] ">
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 md:px-10 py-10">

                <button onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                ><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
                    </svg>Back to doctors</button>


                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4">

                    <div className="flex flex-col sm:flex-row sm:items-start gap-5 ">

                        <div className={`relative shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-2xl shadow-md`}>
                            {initials}
                            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doctor?.isAvailable ? "bg-emerald-500" : "bg-slate-300"}`} />
                        </div>

                        <div className="flex-1 min-w-[180px]">

                            {doctor?.isAvailable && (
                                <span className="inline-block text-[11px] font-bold tracking-widest text-green-600 uppercase bg-green-100 px-3 py-1 rounded-full mb-2">
                                    Available Today
                                </span>
                            )}

                            <h1 className="text-xl font-bold text-slate-900 leading-tight">
                                {name}
                            </h1>

                            <p className="text-sm font-semibold text-blue-600 mt-0.5">
                                {doctor?.specialization}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">

                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">

                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    {doctor?.experience} yrs exp
                                </span>

                                {doctor?.qualification && (
                                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
                                        🎓 {doctor.qualification}
                                    </span>
                                )}

                            </div>

                        </div>

                        {/* consultation fee */}
                        <div className="w-full sm:w-auto sm:text-right ">
                            <p className="text-sm text-slate-500 font-medium">Consultation Fee</p>
                            <p className="text-3xl font-extrabold text-slate-900">₹{doctor?.consultationFee}</p>
                            <button onClick={()=>navigate(`/book/${doctorId}`)}
                                className="mt-8 w-full rounded-xl bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md shadow-blue-100">
                                Consult Now
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* About */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-4 ">
                    <p className="text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-2">About</p>
                    <p className="text-sm text-slate-700 leading-relaxed mb-5 ">{doctor?.about}</p>
                    {/* <p className="text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-2">Specialization</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-slate-700 leading-relaxed mb-3">{doctor?.specialization}</span>
                    </div>
                    <div className="">
                        <p className="text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-3">Education</p>

                    </div> */}
                </div>

                 <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-4">

  <p className="text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-3">
    Doctor Availability
  </p>

  <div className="flex gap-2 flex-wrap">

    {doctor?.slots?.map((slot, i) => (

      <button
        key={slot._id}
        className={`text-sm font-semibold px-4 py-2 rounded-xl border-[1.5px] transition-all ${
          slot.isAvailable
            ? "border-blue-600 text-blue-600 bg-blue-50"
            : "border-slate-100 text-slate-400 bg-slate-50 opacity-60"
        }`}
      >

        <span className="block text-[10px] uppercase font-medium">
          {slot.day}
        </span>

      </button>

    ))}

  </div>

</div>
                

                

            </div>
        </div>
    )

}

export default DoctorProfile