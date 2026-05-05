import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
function Hero() {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(600px) rotateY(${x / 30}deg) rotateX(${-y / 30}deg) translateY(-4px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#f0f6ff]">

      {/* Background blobs — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-blue-200 opacity-40 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-200 opacity-30 blur-[80px]"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left ── */}
        <div className="flex flex-col gap-6">

          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 border border-blue-200 px-4 py-1.5 text-xs font-semibold text-blue-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            Trusted by 10,000+ patients
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Care that feels{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600">personal</span>
              {/* Underline accent */}
              <svg
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q50 0 100 5 Q150 10 200 4"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-slate-500 max-w-md leading-relaxed">
            Book appointments with top specialists, order lab tests & track
            your health — all in one seamless platform.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            <button onClick={()=>navigate('/doctors')}  className="group relative inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95">
              Find a Doctor
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 active:scale-95">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Book Lab Test
            </button>
          </div>

          {/* Mini stats */}
          <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-blue-100">
            {[
              { val: "500+", label: "Specialists" },
              { val: "4.9★", label: "Avg Rating" },
              { val: "10k+", label: "Happy Patients" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-lg font-bold text-slate-800">{val}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Doctor Card ── */}
        <div className="flex justify-center items-center">
          <div
            ref={cardRef}
            className="w-full max-w-xs transition-transform duration-150 ease-out cursor-pointer"
            style={{ willChange: "transform" }}
          >
            {/* Floating availability badge */}
            <div className="mb-3 flex justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available Today
              </span>
            </div>

            {/* Card */}
            <div className="rounded-2xl overflow-hidden border border-blue-100 shadow-xl shadow-blue-100 bg-white">

              {/* Card header */}
              <div className="flex items-center gap-4 bg-blue-950 px-5 py-5">
                {/* Avatar */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-800 border-2 border-blue-600 text-base font-bold text-white">
                  AM
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Dr. Arjun Mehta</h2>
                  <p className="text-sm text-blue-300 font-medium">Cardiologist · AIIMS Delhi</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50 px-2 py-3 text-center">
                {[
                  { val: "7 yrs", label: "Experience" },
                  { val: "₹800", label: "Consult Fee" },
                  { val: "4.9★", label: "Rating" },
                ].map(({ val, label }) => (
                  <div key={label} className="px-2">
                    <p className="text-sm font-bold text-slate-800">{val}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Slot picker */}
              <div className="px-5 pt-4 pb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Next available</p>
                <div className="flex gap-2 flex-wrap">
                  {["10:00 AM", "11:30 AM", "2:00 PM"].map((slot, i) => (
                    <button
                      key={slot}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                        i === 0
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 p-4">
                <button className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-95">
                  View Profile
                </button>
                <button className="flex-1 rounded-xl bg-blue-950 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-95">
                  Book Now
                </button>
              </div>
            </div>

            {/* Review snippet below card */}
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-white border border-slate-100 shadow shadow-blue-50 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                R
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">Rahul S. · 2 days ago</p>
                <p className="text-xs text-slate-500">"Very thorough and patient. Highly recommend!"</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>




  );
}

export default Hero;