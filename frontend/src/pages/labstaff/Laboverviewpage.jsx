// import { useEffect, useState } from "react"
// import API from "../../api/axios"

// export default function LabOverviewPage() {
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await API.get("/lab-orders/department")

//         console.log("API Response:", res.data)

//         // Handle all possible response formats
//         if (Array.isArray(res.data)) {
//           setOrders(res.data)
//         } else if (Array.isArray(res.data.orders)) {
//           setOrders(res.data.orders)
//         } else if (Array.isArray(res.data.labOrders)) {
//           setOrders(res.data.labOrders)
//         } else {
//           setOrders([])
//         }
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrders()
//   }, [])

//   if (loading) {
//     return (
//       <div className="p-10 text-center">
//         Loading...
//       </div>
//     )
//   }

//   const total = orders.length
//   const completed = orders.filter(
//     (order) => order.status === "completed"
//   ).length

//   const pending = orders.filter(
//     (order) => order.status === "pending"
//   ).length

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         Lab Dashboard
//       </h1>

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-blue-100 p-4 rounded">
//           <h2>Total Orders</h2>
//           <p className="text-2xl font-bold">{total}</p>
//         </div>

//         <div className="bg-green-100 p-4 rounded">
//           <h2>Completed</h2>
//           <p className="text-2xl font-bold">{completed}</p>
//         </div>

//         <div className="bg-yellow-100 p-4 rounded">
//           <h2>Pending</h2>
//           <p className="text-2xl font-bold">{pending}</p>
//         </div>
//       </div>

//       <div className="space-y-3">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="border rounded p-4 bg-white shadow-sm"
//           >
//             <h3 className="font-semibold">
//               {order.patient?.name}
//             </h3>

//             <p>Email: {order.patient?.email}</p>

//             <p>
//               Patient: {order.patientInfo?.name}
//             </p>

//             <p>
//               Age: {order.patientInfo?.age}
//             </p>

//             <p>
//               Blood Group: {order.patientInfo?.bloodGroup}
//             </p>

//             <p>
//               Status:
//               <span className="font-semibold ml-2">
//                 {order.status}
//               </span>
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import API from "../../api/axios"
import {
  FlaskConical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Mail,
  CalendarDays,
  FileText,
  Droplets,
  User,
} from "lucide-react"

// ─── AVATAR ───────────────────────────────────────────────
const GRADIENTS = [
  "from-teal-500 to-emerald-600",
  "from-pink-400 to-rose-600",
  "from-orange-400 to-orange-600",
  "from-violet-400 to-purple-600",
  "from-blue-400 to-blue-600",
  "from-red-400 to-rose-500",
]

function Avatar({ name = "", size = "md", index = 0 }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
  const sizeClass =
    { sm: "w-9 h-9 text-xs", md: "w-10 h-10 text-sm", lg: "w-16 h-16 text-xl" }[size] ??
    "w-10 h-10 text-sm"
  return (
    <div
      className={`${sizeClass} bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-md`}
    >
      {initials || "?"}
    </div>
  )
}

// ─── STAT CARD ────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, gradient }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 flex items-center gap-4 shadow-lg text-white relative overflow-hidden`}
    >
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
    completed: { classes: "bg-green-100 text-green-700",   label: "Completed" },
    pending:   { classes: "bg-amber-100 text-amber-700",   label: "Pending"   },
    running:   { classes: "bg-purple-100 text-purple-700", label: "Running"   },
    urgent:    { classes: "bg-red-100 text-red-700",       label: "Urgent"    },
  }
  const { classes, label } = config[status] ?? config.pending
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
export default function LabOverviewPage() {
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res  = await API.get("/lab-orders/department")
        const data = res.data
        if      (Array.isArray(data))           setOrders(data)
        else if (Array.isArray(data.orders))    setOrders(data.orders)
        else if (Array.isArray(data.labOrders)) setOrders(data.labOrders)
        else                                    setOrders([])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    )

  const total       = orders.length
  const completed   = orders.filter((o) => o.status === "completed").length
  const pending     = orders.filter((o) => o.status === "pending").length
  const urgent      = orders.filter((o) => o.status === "urgent").length
  const recent      = orders.slice(0, 5)
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0

  const hour     = new Date().getHours()
  const greeting = hour < 12 ? "Good morning ☀️" : hour < 17 ? "Good afternoon 👋" : "Good evening 🌙"

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-r from-[#085041] to-[#1D9E75] rounded-2xl p-5 mb-5 flex items-center gap-4 shadow-lg shadow-teal-100">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
          <FlaskConical size={28} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-teal-200 text-xs font-semibold mb-0.5">{greeting}</p>
          <h2 className="text-white text-xl font-black leading-tight">Lab Dashboard</h2>
          <p className="text-teal-100 text-xs mt-1">Department orders overview</p>
        </div>
        <div className="shrink-0 text-right hidden sm:block">
          <p className="text-teal-200 text-[10px] font-semibold uppercase tracking-widest">Total Orders</p>
          <p className="text-white text-3xl font-black">{total}</p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <StatCard icon={FlaskConical}  label="Total"     value={total}     gradient="from-teal-500 via-teal-600 to-emerald-600"   />
        <StatCard icon={CheckCircle2}  label="Completed" value={completed} gradient="from-emerald-500 via-green-600 to-teal-600"  />
        <StatCard icon={Clock}         label="Pending"   value={pending}   gradient="from-amber-500 via-orange-500 to-orange-600" />
        <StatCard icon={AlertTriangle} label="Urgent"    value={urgent}    gradient="from-rose-500 via-red-500 to-pink-600"       />
      </div>

      {/* ── Progress ── */}
      <div className="bg-white border border-teal-100 rounded-2xl px-5 py-4 mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-extrabold text-slate-800">Overall progress</p>
          <p className="text-sm font-extrabold text-[#085041]">{progressPct}%</p>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#085041] to-[#1D9E75] rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">{completed} of {total} orders completed</p>
      </div>

      {/* ── Orders List ── */}
      <div className="bg-white border border-teal-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-slate-800">Lab Orders</h3>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
            {orders.length} total
          </span>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <FileText size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-semibold">No lab orders found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {recent.map((order, i) => (
              <div
                key={order._id}
                className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-3 hover:border-teal-100 transition-all"
              >
                <Avatar name={order.patient?.name || order.patientInfo?.name} size="sm" index={i} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate m-0">
                    {order.patient?.name || "—"}
                  </p>

                  {order.patientInfo?.name && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <User size={10} className="text-slate-400 shrink-0" />
                      <p className="text-xs text-slate-400 truncate m-0">
                        {order.patientInfo.name}
                        {order.patientInfo.age    ? `, ${order.patientInfo.age} yrs`   : ""}
                        {order.patientInfo.gender ? ` · ${order.patientInfo.gender}`   : ""}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    {order.patient?.email && (
                      <div className="flex items-center gap-1">
                        <Mail size={10} className="text-slate-400 shrink-0" />
                        <p className="text-xs text-slate-400 truncate m-0 max-w-[130px]">
                          {order.patient.email}
                        </p>
                      </div>
                    )}
                    {order.patientInfo?.bloodGroup && (
                      <div className="flex items-center gap-1">
                        <Droplets size={10} className="text-rose-400 shrink-0" />
                        <p className="text-xs text-slate-400 m-0">{order.patientInfo.bloodGroup}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <CalendarDays size={11} className="text-teal-400" />
                    <span className="text-xs font-bold text-slate-700">
                      {formatDate(order.scheduledAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    <FlaskConical size={10} className="text-slate-400" />
                    <span className="text-xs text-slate-400">
                      {order.tests?.length ?? 0} test{order.tests?.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <StatusBadge status={order.status} />
              </div>
            ))}

            {orders.length > 5 && (
              <p className="text-center text-xs text-slate-400 font-semibold pt-1">
                +{orders.length - 5} more — check Reports tab
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  )
}