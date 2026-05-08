import { useState, useRef, useEffect, useCallback } from "react";

// ─── CONFIG ───────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "";
// Set VITE_API_URL in .env when your backend is ready
// e.g. VITE_API_URL=http://localhost:5000
// ──────────────────────────────────────────────────────────

const specialties = ["All", "Cardiologist", "Dermatologist", "Orthopedic", "Neurologist", "Pediatrician", "Dentist"];

// ─── MOCK DATA (used when API_BASE is empty or API fails) ──
const MOCK_DOCTORS = [
  { _id: "1", initials: "AM", name: "Dr. Arjun Mehta",    specialty: "Cardiologist",  experience: 7,  fee: 800,  rating: 4.9, reviewCount: 312, location: "AIIMS, Delhi",         available: true,  nextSlot: "Today, 10:00 AM",   avatarColor: "blue"    },
  { _id: "2", initials: "PS", name: "Dr. Priya Sharma",   specialty: "Dermatologist", experience: 5,  fee: 600,  rating: 4.8, reviewCount: 218, location: "Fortis, Mumbai",        available: true,  nextSlot: "Today, 12:30 PM",   avatarColor: "rose"    },
  { _id: "3", initials: "RK", name: "Dr. Rajesh Kumar",   specialty: "Orthopedic",    experience: 12, fee: 1000, rating: 4.7, reviewCount: 489, location: "Apollo, Chennai",       available: false, nextSlot: "Tomorrow, 9:00 AM", avatarColor: "amber"   },
  { _id: "4", initials: "SV", name: "Dr. Sunita Verma",   specialty: "Neurologist",   experience: 9,  fee: 1200, rating: 4.9, reviewCount: 174, location: "Medanta, Gurugram",     available: true,  nextSlot: "Today, 3:00 PM",    avatarColor: "violet"  },
  { _id: "5", initials: "NK", name: "Dr. Nikhil Kapoor",  specialty: "Pediatrician",  experience: 6,  fee: 500,  rating: 4.8, reviewCount: 396, location: "Max, Delhi",            available: true,  nextSlot: "Today, 5:30 PM",    avatarColor: "teal"    },
  { _id: "6", initials: "AD", name: "Dr. Anjali Desai",   specialty: "Dentist",       experience: 4,  fee: 400,  rating: 4.6, reviewCount: 143, location: "Columbia Asia, Pune",   available: false, nextSlot: "Tomorrow, 11:00 AM",avatarColor: "emerald" },
];

// ─── HELPERS ──────────────────────────────────────────────
const avatarGradients = {
  blue:    "from-blue-400 to-blue-600",
  rose:    "from-rose-400 to-pink-600",
  amber:   "from-amber-400 to-orange-500",
  violet:  "from-violet-400 to-purple-600",
  teal:    "from-teal-400 to-cyan-600",
  emerald: "from-emerald-400 to-green-600",
};
const colorKeys = Object.keys(avatarGradients);

function getInitials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// ─── STAR RATING ──────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── SKELETON CARD ────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="p-5 pb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-slate-200 shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
            <div className="h-3 bg-slate-100 rounded w-1/3" />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-7 bg-slate-100 rounded-lg w-24" />
          <div className="h-7 bg-slate-100 rounded-lg w-28" />
        </div>
      </div>
      <div className="mx-5 border-t border-slate-100" />
      <div className="p-5 pt-4 space-y-3">
        <div className="h-8 bg-slate-100 rounded-lg w-full" />
        <div className="flex gap-3">
          <div className="h-10 bg-slate-100 rounded-lg w-16" />
          <div className="h-10 bg-blue-100 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}

// ─── DOCTOR CARD ──────────────────────────────────────────
function DoctorCard({ doctor, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const initials    = doctor.initials    || getInitials(doctor.name);
  const colorKey    = doctor.avatarColor || colorKeys[index % colorKeys.length];
  const gradientCls = avatarGradients[colorKey] || avatarGradients.blue;

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl border border-slate-100 overflow-hidden
        hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1
        transition-all duration-500 cursor-pointer
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-4">
          <div className={`relative shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${gradientCls} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
            {initials}
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doctor.available ? "bg-emerald-500" : "bg-slate-300"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 text-base leading-tight truncate">{doctor.name}</h3>
            <p className="text-sm text-blue-600 font-semibold mt-0.5">{doctor.specialty}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <StarRating rating={doctor.rating} />
              <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
              <span className="text-xs text-slate-400">({doctor.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {doctor.experience} yrs exp
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {doctor.location}
          </span>
        </div>
      </div>

      <div className="mx-5 border-t border-slate-100" />

      {/* Bottom */}
      <div className="p-5 pt-4">
        <div className={`flex items-center gap-2 mb-4 text-xs font-semibold rounded-lg px-3 py-2 ${doctor.available ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-500"}`}>
          <span className="relative flex h-2 w-2 shrink-0">
            {doctor.available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${doctor.available ? "bg-emerald-500" : "bg-slate-300"}`} />
          </span>
          {doctor.nextSlot}
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Consult Fee</p>
            <p className="text-base font-bold text-slate-800">₹{doctor.fee}</p>
          </div>
          <button className="flex-1 rounded-xl bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md shadow-blue-100">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────
function FeaturedDoctors() {
  const [activeTab, setActiveTab]     = useState("All");
  const [doctors, setDoctors]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [page, setPage]               = useState(1);
  const [hasMore, setHasMore]         = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [usingMock, setUsingMock]     = useState(false);

  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadingVisible(true); },
      { threshold: 0.2 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchDoctors = useCallback(async (specialty, pageNum, append = false) => {
    // ── No backend yet → use mock data ──
    if (!API_BASE) {
      const filtered = specialty === "All"
        ? MOCK_DOCTORS
        : MOCK_DOCTORS.filter((d) => d.specialty === specialty);
      setDoctors(filtered);
      setHasMore(false);
      setUsingMock(true);
      setLoading(false);
      return;
    }

    // ── Real API call ──
    try {
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);

      const params = new URLSearchParams({ page: pageNum, limit: 6 });
      if (specialty !== "All") params.append("specialty", specialty);

      const res = await fetch(`${API_BASE}/api/doctors?${params}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data  = await res.json();
      const list  = Array.isArray(data) ? data : data.doctors ?? [];
      const more  = Array.isArray(data) ? list.length === 6 : data.hasMore ?? false;

      setDoctors((prev) => append ? [...prev, ...list] : list);
      setHasMore(more);
      setUsingMock(false);
    } catch (err) {
      // API failed → silently fall back to mock
      console.warn("API unavailable, using mock data:", err.message);
      const filtered = specialty === "All"
        ? MOCK_DOCTORS
        : MOCK_DOCTORS.filter((d) => d.specialty === specialty);
      setDoctors(filtered);
      setHasMore(false);
      setUsingMock(true);
      setError(null);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setDoctors([]);
    fetchDoctors(activeTab, 1, false);
  }, [activeTab, fetchDoctors]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDoctors(activeTab, nextPage, true);
  };

  return (
    <section className="relative w-full bg-white py-20 px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div
          ref={headingRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 transition-all duration-700
            ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">Our Specialists</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Meet our <span className="text-blue-600">top doctors</span>
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-md">
              Verified specialists with real credentials and thousands of happy patients.
            </p>
          </div>
          <a href="#" className="shrink-0 self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group">
            View all doctors
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Mock data banner */}
        {usingMock && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700 font-medium">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Showing sample data — connect your backend to load real doctors.
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveTab(s)}
              className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95
                ${activeTab === s
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold">No doctors found for this specialty</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && doctors.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {doctors.map((doc, i) => (
                <DoctorCard key={doc._id} doctor={doc} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Loading...</>
                  ) : (
                    <>Load more doctors <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></>
                  )}
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}

export default FeaturedDoctors;