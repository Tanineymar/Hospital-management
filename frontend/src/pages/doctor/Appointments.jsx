import { CalendarDays, Clock, Mail, CheckCircle2, XCircle, Inbox, RefreshCw, } from "lucide-react"
import API from "../../api/axios.js"
import { useEffect, useState } from "react"

function getStatus(apt) {
  if (apt.isRejected) return "rejected"
  return "confirmed"
}

function formatDate(iso) {
  if (!iso) return "—"

  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const GRADIENTS = [
  "from-blue-400 to-blue-600",
  "from-pink-400 to-rose-600",
  "from-orange-400 to-orange-600",
  "from-violet-400 to-purple-600",
  "from-teal-400 to-cyan-600",
  "from-emerald-400 to-green-600",
]

function Avatar({ name = "", index = 0 }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <div
      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]
        } flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md`}
    >
      {initials}
    </div>
  )
}

function StatusBadge({ status }) {
  const config = {
    confirmed: {
      classes: "bg-green-100 text-green-700",
      label: "Confirmed",
    },
    rejected: {
      classes: "bg-red-100 text-red-700",
      label: "Rejected"
    }
  }

  const { classes, label } = config[status] ?? config.confirmed
  return (
    <span className={`${classes} text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap`}>
      {label}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  const gradients = {
    // blue: "from-blue-500 via-blue-600 to-indigo-600",
    // green: "from-emerald-500 via-green-600 to-teal-600",
    // red: "from-rose-500 via-red-500 to-pink-600",
      blue: "from-blue-400 to-blue-600",
  green: "from-green-400 to-green-600",
  red: "from-red-300 to-red-600",
  }

  return (
    <div
      className={`bg-gradient-to-br ${gradients[color] ?? gradients.blue
        } rounded-2xl p-5 flex items-center gap-4 shadow-lg text-white relative overflow-hidden`}
    >
      {/* Glow effect */}
      <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full blur-3xl" />

      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-white/15 backdrop-blur-sm border border-white/10">
        <Icon size={20} />
      </div>

      {/* Text */}
      <div className="relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-white/70 m-0">
          {label}
        </p>

        <p className="text-2xl font-mono text-white leading-tight m-0">
          {value}
        </p>
      </div>
    </div>
  )
}

const filters = [
  { key: "all", label: "All" },
  { key: "confirmed", label: "Confirmed" },
  { key: "rejected", label: "Rejected" },
]

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")
  const [rejectingId, setRejectingId] = useState(null)

  function fetchAppointments() {
    setLoading(true)
    setError(null)

    API.get("/appointments/doctor")
      .then((res) => {
        console.log(res.data)
        setAppointments(res.data.appointments ?? [])
      })
      .catch((error) => {
        console.log(error)
        setError("Failed to load appointments")
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // Reject appointment
  async function handleReject(id) {
    setRejectingId(id)

    try {
      await API.patch(`/appointment/reject/${id}`)
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === id
            ? { ...apt, isRejected: true }
            : apt
        )
      )
    } catch (error) {
      console.log(error)
      alert("Could not reject appointment. Try again.")
    } finally {
      setRejectingId(null)
    }
  }


  // Counts

  const counts = {
    all: appointments.length,
    confirmed: appointments.filter((a) => !a.isRejected).length,
    rejected: appointments.filter((a) => a.isRejected).length
  }

  const filtered = appointments.filter((apt) => {
    if (filter === "all") return true
    if (filter === "confirmed") return !apt.isRejected
    if (filter === "rejected") return apt.isRejected
  })

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )

  if (error)
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <XCircle className="text-red-400" size={22} />
        </div>
        <p className="font-semibold text-slate-700">{error}</p>

        <button
          onClick={fetchAppointments}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </div>
    )

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Appointments</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your patient appointments</p>
        </div>
        <button onClick={fetchAppointments}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold bg-white
      border border-slate-200 text-slate-500 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-200 transition-all duration-300
      ">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={CalendarDays}
          label="Total"
          value={counts.all}
          color="blue"
        />

        <StatCard
          icon={CheckCircle2}
          label="Confirmed"
          value={counts.confirmed}
          color="green"
        />

        <StatCard
          icon={XCircle}
          label="rejected"
          value={counts.rejected}
          color="red"
        />
      </div>

      {/* Filters tab */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map(({ key, label }) => (
          <button key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-150
            ${filter === key
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
          >
            {label}
            <span className="ml-1.5 text-xs opacity-60">
              ({counts[key]})
            </span>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {
        filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap- text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Inbox className="text-blue-600" size={26} />
            </div>
            <p className="font-semibold text-slate-600 mt-2">No appointments found</p>

            <p className="text-sm text-slate-500">
              {filter === "all"
                ? "You have no appointments yet."
                : `No ${filter} appointments.`
              }
            </p>
          </div>
        )
      }

      {/* appointment cards */}

      <div className="flex flex-col gap-3">
        {
          filtered.map((apt, i) => {
            const status = getStatus(apt)
            const isBeingRejected = rejectingId === apt._id

            return (
              <div
  key={apt._id}
  className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200"
>

  <div className="flex items-center justify-between gap-4 flex-wrap">

    {/* Left Side */}

    <div className="flex items-center gap-3 min-w-0">

      <Avatar
        name={apt.patient?.name}
        index={i}
      />

      <div className="min-w-0">

        <div className="flex items-center gap-2 flex-wrap">

          <p className="font-bold text-slate-800 text-sm truncate">
            {apt.patient?.name}
          </p>

          <StatusBadge status={status} />

        </div>

        <div className="flex items-center gap-1.5 mt-1">

          <Mail
            size={11}
            className="text-slate-400 shrink-0"
          />

          <p className="text-xs text-slate-400 truncate">
            {apt.patient?.email}
          </p>

        </div>

      </div>

    </div>

    {/* Right Side */}

    <div className="flex items-center gap-4 flex-wrap">

      {/* Date + Time */}

      <div className="flex flex-col items-start gap-1">

        {/* Date */}

        <div className="flex items-center gap-1.5 text-sm text-slate-600">

          <CalendarDays
            size={14}
            className="text-blue-400"
          />

          <span className="font-semibold">
            {formatDate(apt.date)}
          </span>

        </div>

        {/* Time */}

        <div className="flex items-center gap-1.5 text-sm text-slate-600">

          <Clock
            size={13}
            className="text-blue-400"
          />

          <span>
            {apt.slot}
          </span>

        </div>

      </div>

      {/* Action */}

      {status === "confirmed" ? (

        <button
          onClick={() => handleReject(apt._id)}
          disabled={isBeingRejected}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-red-200 text-red-500 hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
        >

          <XCircle size={14} />

          {isBeingRejected
            ? "Rejecting..."
            : "Reject"}

        </button>

      ) : (

        <div className="flex items-center gap-1 text-xs font-semibold text-red-400">

          <XCircle size={13} />
          Rejected

        </div>

      )}

    </div>

  </div>

</div>
            )
          })
        }
      </div>
    </div>


  )


}


export default Appointments