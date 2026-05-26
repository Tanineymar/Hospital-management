
import { useEffect, useState } from "react"
import API from "../../api/axios.js"
import { CalendarDays, Clock, CheckCircle2, XCircle, Mail, IndianRupee, Stethoscope, Star } from "lucide-react"

// ─── AVATAR ───────────────────────────────────────────────
const GRADIENTS = [
  "from-blue-400 to-blue-600",
  "from-pink-400 to-rose-600",
  "from-orange-400 to-orange-600",
  "from-violet-400 to-purple-600",
  "from-teal-400 to-cyan-600",
  "from-emerald-400 to-green-600",
]

function Avatar({ name = "", size = "md", index = 0 }) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
  const sizeClass = { sm: "w-9 h-9 text-xs", md: "w-10 h-10 text-sm", lg: "w-16 h-16 text-xl" }[size] ?? "w-10 h-10 text-sm"
  return (
    <div className={`${sizeClass} bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-md`}>
      {initials}
    </div>
  )
}

// ─── STAT CARD ────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 flex items-center gap-4 shadow-lg text-white relative overflow-hidden`}>
      <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-white/15 backdrop-blur-sm border border-white/10">
        <Icon size={22} />
      </div>
      <div className="relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-white/70 m-0">{label}</p>
        <p className="text-3xl font-black text-white leading-tight m-0">{value}</p>
      </div>
    </div>
  )
}

// ─── STATUS BADGE ─────────────────────────────────────────
function StatusBadge({ status }) {
  const config = {
    confirmed: { classes: "bg-green-100 text-green-700", label: "Confirmed" },
    rejected:  { classes: "bg-red-100 text-red-700",     label: "Rejected"  },
  }
  const { classes, label } = config[status] ?? config.confirmed
  return (
    <span className={`${classes} text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap`}>
      {label}
    </span>
  )
}

// ─── FORMAT DATE ──────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  })
}

// ─── MAIN ─────────────────────────────────────────────────
export default function OverviewPage() {
  const [doctor,       setDoctor]       = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading,      setLoading]      = useState(true)

  useEffect(() => {
    Promise.all([
      API.get("/doctor/profile/me"),
      API.get("/appointments/doctor"),
    ])
      .then(([docRes, aptRes]) => {
        setDoctor(docRes.data.doctor)
        setAppointments(aptRes.data.appointments ?? [])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  )

  const confirmed = appointments.filter((a) => !a.isRejected).length
  const rejected  = appointments.filter((a) =>  a.isRejected).length
  const upcoming  = appointments.filter((a) => !a.isRejected)

  const hour     = new Date().getHours()
  const greeting = hour < 12 ? "Good morning ☀️" : hour < 17 ? "Good afternoon 👋" : "Good evening 🌙"

  return (
    <div className="w-full">

      {/* ── Hero greeting card ── */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 mb-5 flex items-center gap-4 shadow-lg shadow-blue-100">
        <Avatar name={doctor?.user?.name} size="lg" index={0} />
        <div className="flex-1 min-w-0">
          <p className="text-blue-200 text-xs font-semibold mb-0.5">{greeting}</p>
          <h2 className="text-white text-xl font-black truncate leading-tight">
            {doctor?.user?.name ?? "Doctor"}
          </h2>
          <p className="text-blue-100 text-xs mt-1 truncate">{doctor?.specialization}</p>
          <span className={`inline-flex items-center gap-1 mt-2 text-[11px] font-bold px-2.5 py-0.5 rounded-full
            ${doctor?.isAvailable
              ? "bg-green-400/20 text-green-200 border border-green-400/30"
              : "bg-white/10 text-blue-200 border border-white/20"
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${doctor?.isAvailable ? "bg-green-300" : "bg-blue-300"}`} />
            {doctor?.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="shrink-0 text-right hidden sm:block">
          <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-widest">Consult Fee</p>
          <p className="text-white text-2xl font-black">₹{doctor?.consultationFee}</p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <StatCard icon={CalendarDays} label="Total"     value={appointments.length} gradient="from-blue-500 via-blue-600 to-indigo-600"  />
        <StatCard icon={CheckCircle2} label="Confirmed" value={confirmed}           gradient="from-emerald-500 via-green-600 to-teal-600" />
        <StatCard icon={XCircle}      label="Rejected"  value={rejected}            gradient="from-rose-500 via-red-500 to-pink-600"      />
      </div>

      {/* ── Quick info pills ── */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="bg-white border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
            <Stethoscope size={15} className="text-violet-500" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest m-0">Specialization</p>
            <p className="text-sm font-bold text-slate-700 truncate m-0">{doctor?.specialization ?? "—"}</p>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <Star size={15} className="text-amber-500" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest m-0">Experience</p>
            <p className="text-sm font-bold text-slate-700 m-0">{doctor?.experience ?? "—"} yrs</p>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <IndianRupee size={15} className="text-green-500" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest m-0">Consult Fee</p>
            <p className="text-sm font-bold text-slate-700 m-0">₹{doctor?.consultationFee ?? "—"}</p>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Mail size={15} className="text-blue-500" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest m-0">Email</p>
            <p className="text-xs font-bold text-slate-700 truncate m-0">{doctor?.user?.email ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* ── Upcoming Appointments ── */}
      <div className="bg-white border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-slate-800">Upcoming Appointments</h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {upcoming.length} total
          </span>
        </div>

        {upcoming.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <CalendarDays size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-semibold">No upcoming appointments</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {upcoming.slice(0, 5).map((apt, i) => (
              <div key={apt._id} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-3 hover:border-blue-100 transition-all">
                <Avatar name={apt.patient?.name} size="sm" index={i} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate m-0">{apt.patient?.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Mail size={10} className="text-slate-400 shrink-0" />
                    <p className="text-xs text-slate-400 truncate m-0">{apt.patient?.email}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <CalendarDays size={11} className="text-blue-400" />
                    <span className="text-xs font-bold text-slate-700">{formatDate(apt.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    <Clock size={10} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{apt.slot}</span>
                  </div>
                </div>
                <StatusBadge status="confirmed" />
              </div>
            ))}

            {upcoming.length > 5 && (
              <p className="text-center text-xs text-slate-400 font-semibold pt-1">
                +{upcoming.length - 5} more — check Appointments tab
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  )
}