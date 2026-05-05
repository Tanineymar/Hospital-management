import { useEffect, useRef, useState } from "react";

const services = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Find a Doctor",
    desc: "Search 500+ verified specialists by symptom, city, or name. See real patient reviews before you book.",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-700",
    accent: "blue",
    stats: "500+ Specialists",
    cta: "Search Doctors",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    title: "Book Appointment",
    desc: "Pick a date, pick a slot — confirmed in under 60 seconds. Get instant SMS & email confirmation.",
    tag: "Instant Booking",
    tagColor: "bg-sky-100 text-sky-700",
    accent: "sky",
    stats: "< 60 sec booking",
    cta: "Book Now",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      </svg>
    ),
    title: "Book Lab Tests",
    desc: "Order from 800+ NABL-certified tests online. Home sample collection available at your doorstep.",
    tag: "Home Collection",
    tagColor: "bg-teal-100 text-teal-700",
    accent: "teal",
    stats: "800+ Tests",
    cta: "Browse Tests",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M12 18v-4m-2 2h4" />
      </svg>
    ),
    title: "Get Reports Fast",
    desc: "Receive digital lab reports within 24 hours via WhatsApp, email, or directly in the app.",
    tag: "Reports in 24hrs",
    tagColor: "bg-violet-100 text-violet-700",
    accent: "violet",
    stats: "Digital + Printable",
    cta: "Learn More",
  },
];

const accentMap = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    border: "hover:border-blue-300",
    glow: "hover:shadow-blue-100",
    btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
    line: "bg-blue-500",
  },
  sky: {
    icon: "bg-sky-50 text-sky-600",
    border: "hover:border-sky-300",
    glow: "hover:shadow-sky-100",
    btn: "bg-sky-600 hover:bg-sky-700 shadow-sky-200",
    line: "bg-sky-500",
  },
  teal: {
    icon: "bg-teal-50 text-teal-600",
    border: "hover:border-teal-300",
    glow: "hover:shadow-teal-100",
    btn: "bg-teal-600 hover:bg-teal-700 shadow-teal-200",
    line: "bg-teal-500",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    border: "hover:border-violet-300",
    glow: "hover:shadow-violet-100",
    btn: "bg-violet-600 hover:bg-violet-700 shadow-violet-200",
    line: "bg-violet-500",
  },
};

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const a = accentMap[service.accent];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col bg-white rounded-2xl border border-slate-100 p-6 transition-all duration-500 cursor-pointer
        ${a.border} ${a.glow} hover:shadow-xl hover:-translate-y-1
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Hover top line */}
      <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full ${a.line} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

      {/* Tag */}
      <span className={`self-start text-[11px] font-semibold px-2.5 py-1 rounded-full ${service.tagColor} mb-4`}>
        {service.tag}
      </span>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${a.icon} transition-transform duration-300 group-hover:scale-110`}>
        {service.icon}
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-1">{service.desc}</p>

      <div className="border-t border-slate-100 my-4" />

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-400">{service.stats}</span>
        <button className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-200 active:scale-95 ${a.btn}`}>
          {service.cta}
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Services() {
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

  return (
    <section className="relative w-full bg-[#f8faff] py-20 px-6 md:px-10 lg:px-16 overflow-hidden">

      {/* Dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #1e40af 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <div
          ref={headingRef}
          className={`text-center mb-14 transition-all duration-700 ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Everything you need,{" "}
            <span className="text-blue-600">one place</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Book doctors, order lab tests, and get your reports — all without leaving your home.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* Category labels */}
         <div className="mt-5  grid grid-cols-2 lg:grid-cols-4 gap-5 px-1">
          <p className="hidden lg:block text-center text-[11px] font-bold text-blue-300 uppercase tracking-widest col-span-1 lg:col-span-2">
            ── Doctor Services ──
          </p>
          <p className="hidden lg:block text-center text-[11px] font-bold text-teal-300 uppercase tracking-widest col-span-1 lg:col-span-2">
            ── Lab Services ──
          </p>
        </div> 

        

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl bg-blue-950 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-xl">Not sure where to start?</p>
            <p className="text-blue-300 text-sm mt-1">
              Search by symptom and we'll recommend the right doctor or test for you.
            </p>
          </div>
          <button className="shrink-0 flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-950 hover:bg-blue-50 transition-all duration-200 active:scale-95 shadow-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            Search by Symptom
          </button>
        </div>

      </div>
    </section>
  );
}

export default Services;