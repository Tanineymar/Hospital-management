import Navbar from "../../components/Navbar.jsx"
import API from "../../api/axios.js"
import { useEffect, useRef, useState } from "react"

// ─── COLORS ─────────────────────────────
const colorMap = {
    blue: {
        badge: "bg-blue-100 text-blue-700",
        btn: "bg-blue-600 hover:bg-blue-700",
    },
}

// ─── TEST CARD ──────────────────────────
function TestCard({ test, index, deptColor }) {

    const ref = useRef(null)

    const [visible, setVisible] = useState(false)
    const [added, setAdded] = useState(false)

    const c = colorMap[deptColor] || colorMap.blue

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                }
            },
            { threshold: 0.08 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()

    }, [])

    const handleAdd = () => {

        setAdded(true)

        setTimeout(() => {
            setAdded(false)
        }, 2000)

    }

    return (

        <div
            ref={ref}
            className={`group relative flex flex-col bg-white rounded-2xl border border-slate-100
            hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1
            transition-all duration-500 overflow-hidden
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${(index % 6) * 70}ms` }}
        >

            {/* Badge */}
            <div className="absolute top-3 right-3 z-10">

                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full">
                    ⭐ Popular
                </span>

            </div>

            {/* Top */}
            <div className="p-5 flex-1">

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">

                    <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}
                    >
                        🧪 Blood Test
                    </span>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        🏠 Home Collection
                    </span>

                </div>

                {/* Name */}
                <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 pr-8">
                    {test.testName}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed">
                    {test.description || "Fast and accurate diagnostic lab test."}
                </p>

                {/* Report Time */}
                <div className="flex items-center gap-1.5 mt-4 text-xs text-slate-400 font-medium">

                    <svg
                        className="w-3.5 h-3.5"
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

                    Report in 24 hrs

                </div>

            </div>

            {/* Bottom */}
            <div className="px-5 pb-5">

                <div className="border-t border-slate-100 mb-4" />

                <div className="flex items-center justify-between gap-3">

                    {/* Price */}
                    <div>

                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                            Price
                        </p>

                        <p className="text-xl font-extrabold text-slate-800">
                            ₹{test.price}
                        </p>

                    </div>

                    {/* Button */}
                    <button
                        onClick={handleAdd}
                        className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 active:scale-95
                        ${added
                                ? "bg-emerald-500 shadow-emerald-100"
                                : `${c.btn} shadow-md`
                            }`}
                    >

                        {added ? (
                            <>
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>

                                Added!
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>

                                Book Test
                            </>
                        )}

                    </button>

                </div>

            </div>

        </div>
    )
}

// ─── MAIN PAGE ──────────────────────────
function Labtest() {

    const [labTest, setLabtest] = useState([])

    useEffect(() => {

        API.get("lab-tests")
            .then((res) => {

                setLabtest(res.data.tests || [])
                console.log(res.data.tests)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    return (

        <div className="min-h-screen bg-[#f8faff]">

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-800 to-slate-950 overflow-hidden">

                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 50%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 20%, #818cf8 0%, transparent 40%)",
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">

                    <span className="inline-block text-xs font-bold tracking-widest text-blue-300 uppercase mb-3">
                        NABL Certified Labs
                    </span>

                    <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                        Book Lab Tests <br className="hidden md:block" />
                        <span className="text-blue-300">
                            from home
                        </span>
                    </h1>

                    <p className="mt-3 text-blue-200 text-sm max-w-md">
                        800+ tests across multiple departments.
                        Sample collected at your doorstep.
                        Reports in 6–24 hrs.
                    </p>

                </div>

            </div>

            {/* Cards Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10">

                {/* Heading */}
                <div className="flex items-center justify-between mb-4">

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">
                            All Lab Tests
                        </h2>

                        <p className="text-sm text-slate-400 mt-1">
                            {labTest.length} tests available
                        </p>

                    </div>

                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {labTest.map((test, index) => (

                        <TestCard
                            key={test._id}
                            test={test}
                            index={index}
                            deptColor="blue"
                        />

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Labtest