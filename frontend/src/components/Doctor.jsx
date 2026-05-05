// import { useState, useRef, useEffect } from "react";

// const specialties = ["All", "Cardiologist", "Dermatologist", "Orthopedic", "Neurologist", "Pediatrician", "Dentist"];

// const doctors = [
//   {
//     id: 1,
//     initials: "AM",
//     name: "Dr. Arjun Mehta",
//     specialty: "Cardiologist",
//     experience: "7 yrs",
//     fee: "₹800",
//     rating: 4.9,
//     reviews: 312,
//     location: "AIIMS, Delhi",
//     available: true,
//     nextSlot: "Today, 10:00 AM",
//     avatarBg: "from-blue-400 to-blue-600",
//   },
//   {
//     id: 2,
//     initials: "PS",
//     name: "Dr. Priya Sharma",
//     specialty: "Dermatologist",
//     experience: "5 yrs",
//     fee: "₹600",
//     rating: 4.8,
//     reviews: 218,
//     location: "Fortis, Mumbai",
//     available: true,
//     nextSlot: "Today, 12:30 PM",
//     avatarBg: "from-rose-400 to-pink-600",
//   },
//   {
//     id: 3,
//     initials: "RK",
//     name: "Dr. Rajesh Kumar",
//     specialty: "Orthopedic",
//     experience: "12 yrs",
//     fee: "₹1000",
//     rating: 4.7,
//     reviews: 489,
//     location: "Apollo, Chennai",
//     available: false,
//     nextSlot: "Tomorrow, 9:00 AM",
//     avatarBg: "from-amber-400 to-orange-500",
//   },
//   {
//     id: 4,
//     initials: "SV",
//     name: "Dr. Sunita Verma",
//     specialty: "Neurologist",
//     experience: "9 yrs",
//     fee: "₹1200",
//     rating: 4.9,
//     reviews: 174,
//     location: "Medanta, Gurugram",
//     available: true,
//     nextSlot: "Today, 3:00 PM",
//     avatarBg: "from-violet-400 to-purple-600",
//   },
//   {
//     id: 5,
//     initials: "NK",
//     name: "Dr. Nikhil Kapoor",
//     specialty: "Pediatrician",
//     experience: "6 yrs",
//     fee: "₹500",
//     rating: 4.8,
//     reviews: 396,
//     location: "Max, Delhi",
//     available: true,
//     nextSlot: "Today, 5:30 PM",
//     avatarBg: "from-teal-400 to-cyan-600",
//   },
//   {
//     id: 6,
//     initials: "AD",
//     name: "Dr. Anjali Desai",
//     specialty: "Dentist",
//     experience: "4 yrs",
//     fee: "₹400",
//     rating: 4.6,
//     reviews: 143,
//     location: "Columbia Asia, Pune",
//     available: false,
//     nextSlot: "Tomorrow, 11:00 AM",
//     avatarBg: "from-emerald-400 to-green-600",
//   },
// ];

// function StarRating({ rating }) {
//   return (
//     <div className="flex items-center gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <svg
//           key={star}
//           className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ))}
//     </div>
//   );
// }

// function DoctorCard({ doctor, index }) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisible(true); },
//       { threshold: 0.1 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={`group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-500 cursor-pointer
//         ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
//       style={{ transitionDelay: `${index * 80}ms` }}
//     >
//       {/* Card top */}
//       <div className="p-5 pb-4">
//         <div className="flex items-start gap-4">
//           {/* Avatar */}
//           <div className={`relative shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${doctor.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
//             {doctor.initials}
//             {/* availability dot */}
//             <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doctor.available ? "bg-emerald-500" : "bg-slate-300"}`} />
//           </div>

//           <div className="flex-1 min-w-0">
//             <h3 className="font-bold text-slate-800 text-base leading-tight truncate">{doctor.name}</h3>
//             <p className="text-sm text-blue-600 font-semibold mt-0.5">{doctor.specialty}</p>
//             <div className="flex items-center gap-1.5 mt-1.5">
//               <StarRating rating={doctor.rating} />
//               <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
//               <span className="text-xs text-slate-400">({doctor.reviews})</span>
//             </div>
//           </div>
//         </div>

//         {/* Info pills */}
//         <div className="flex flex-wrap gap-2 mt-4">
//           <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
//             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             {doctor.experience} exp
//           </span>
//           <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
//             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             {doctor.location}
//           </span>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="mx-5 border-t border-slate-100" />

//       {/* Bottom */}
//       <div className="p-5 pt-4">
//         {/* Next slot */}
//         <div className={`flex items-center gap-2 mb-4 text-xs font-semibold rounded-lg px-3 py-2
//           ${doctor.available ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-500"}`}
//         >
//           <span className={`relative flex h-2 w-2 shrink-0`}>
//             {doctor.available && (
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
//             )}
//             <span className={`relative inline-flex h-2 w-2 rounded-full ${doctor.available ? "bg-emerald-500" : "bg-slate-300"}`} />
//           </span>
//           {doctor.nextSlot}
//         </div>

//         {/* Fee + CTA */}
//         <div className="flex items-center gap-3">
//           <div>
//             <p className="text-[11px] text-slate-400 font-medium">Consult Fee</p>
//             <p className="text-base font-bold text-slate-800">{doctor.fee}</p>
//           </div>
//           <button className="flex-1 rounded-xl bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md shadow-blue-100">
//             Book Appointment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FeaturedDoctors() {
//   const [activeTab, setActiveTab] = useState("All");
//   const headingRef = useRef(null);
//   const [headingVisible, setHeadingVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setHeadingVisible(true); },
//       { threshold: 0.2 }
//     );
//     if (headingRef.current) observer.observe(headingRef.current);
//     return () => observer.disconnect();
//   }, []);

//   const filtered = activeTab === "All"
//     ? doctors
//     : doctors.filter((d) => d.specialty === activeTab);

//   return (
//     <section className="relative w-full bg-white py-20 px-6 md:px-10 lg:px-16 overflow-hidden">

//       {/* Subtle top border gradient */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

//       <div className="max-w-7xl mx-auto">

//         {/* Heading */}
//         <div
//           ref={headingRef}
//           className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 transition-all duration-700
//             ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
//         >
//           <div>
//             <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">
//               Our Specialists
//             </span>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
//               Meet our{" "}
//               <span className="text-blue-600">top doctors</span>
//             </h2>
//             <p className="mt-3 text-slate-500 text-base max-w-md">
//               Handpicked specialists with verified credentials and thousands of happy patients.
//             </p>
//           </div>

//           <a href="#" className="shrink-0 self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group">
//             View all doctors
//             <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </a>
//         </div>

//         {/* Filter tabs */}
//         <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
//           {specialties.map((s) => (
//             <button
//               key={s}
//               onClick={() => setActiveTab(s)}
//               className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95
//                 ${activeTab === s
//                   ? "bg-blue-600 text-white shadow-md shadow-blue-200"
//                   : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
//                 }`}
//             >
//               {s}
//             </button>
//           ))}
//         </div>

//         {/* Cards grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {filtered.map((doc, i) => (
//             <DoctorCard key={doc.id} doctor={doc} index={i} />
//           ))}
//         </div>

//         {/* Empty state */}
//         {filtered.length === 0 && (
//           <div className="text-center py-20 text-slate-400">
//             <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="font-semibold">No doctors found for this specialty</p>
//           </div>
//         )}

//         {/* Load more */}
//         {filtered.length > 0 && (
//           <div className="text-center mt-10">
//             <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 active:scale-95">
//               Load more doctors
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

// export default FeaturedDoctors;