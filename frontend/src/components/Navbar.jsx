
// import { useState } from "react"
// import AuthModal from "./AuthModal"
// import { useNavigate } from "react-router-dom"

// function Navbar() {
//     const navigate = useNavigate()
//     const [activeModal, setActiveModal] = useState("")
//     return (
//         <>
//             <nav className="flex justify-between items-center px-8 py-4 border-b-olive-700 bg-white shadow-md  ">
//                 <h1 className="text-xl font-bold text-blue-600">Medi<span className="text-teal-500">Care</span></h1>
                
//                 <div className=" hidden md:flex items-center gap-7 text-gray-500 font-medium ">
//                     <a href="/"  className=" hover:text-blue-600 transition-colors">Home</a>
//                     <a href="/doctors"  className=" hover:text-blue-600 transition-colors">Doctors</a>
//                     <a href="/lab-tests" className=" hover:text-blue-600 transition-colors">Lab Tests</a>
//                     <a href="#" className=" hover:text-blue-600 transition-colors">Contact</a>
//                 </div>

//                 <div className="flex gap-2.5">
//                     <button onClick={() => setActiveModal("login")}
//                         className="text-sm font-semibold text-blue-600 px-4 py-2 border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100  transition-colors">Login</button>
//                     <button
//                         onClick={() => setActiveModal("signup")}
//                         className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors ">Signup</button>
//                 </div>
//             </nav>

//             <AuthModal
//                 activeModal={activeModal}
//                 onClose={(switchTo) => {
//                     if (switchTo) {
//                         setActiveModal(switchTo)  
//                     } else {
//                         setActiveModal("")         
//                     }
//                 }}
//             />
//         </>
//     )
// }

// export default Navbar


import { useState } from "react"
import AuthModal from "./AuthModal"
import { NavLink } from "react-router-dom"

function Navbar() {
    const [activeModal, setActiveModal] = useState("")

    const navLinkClass = ({ isActive }) =>
        `group relative py-1 transition-colors duration-300
        ${isActive
            ? "text-blue-600"
            : "text-gray-500 hover:text-blue-600"
        }`

    return (
        <>
            <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">

                {/* Logo */}
                <h1 className="text-xl font-bold text-blue-600">
                    Medi<span className="text-teal-500">Care</span>
                </h1>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-7 font-medium">

                    <NavLink to="/" className={navLinkClass}>
                        Home
                        <span
                            className="
                            absolute left-1/2 bottom-0 h-[2px] w-0
                            -translate-x-1/2 rounded-full bg-blue-600
                            transition-all duration-500 ease-out
                            group-hover:w-full
                        "
                        />
                    </NavLink>

                    <NavLink to="/doctors" className={navLinkClass}>
                        Doctors
                        <span
                            className="
                            absolute left-1/2 bottom-0 h-[2px] w-0
                            -translate-x-1/2 rounded-full bg-blue-600
                            transition-all duration-500 ease-out
                            group-hover:w-full
                        "
                        />
                    </NavLink>

                    <NavLink to="/lab-tests" className={navLinkClass}>
                        Lab Tests
                        <span
                            className="
                            absolute left-1/2 bottom-0 h-[2px] w-0
                            -translate-x-1/2 rounded-full bg-blue-600
                            transition-all duration-500 ease-out
                            group-hover:w-full
                        "
                        />
                    </NavLink>

                    <NavLink to="/appointments/my" className={navLinkClass}>
                        My appointments
                        <span
                            className="
                            absolute left-1/2 bottom-0 h-[2px] w-0
                            -translate-x-1/2 rounded-full bg-blue-600
                            transition-all duration-500 ease-out
                            group-hover:w-full
                        "
                        />
                    </NavLink>

                </div>

                {/* Buttons */}
                <div className="flex gap-2.5">
                    <button
                        onClick={() => setActiveModal("login")}
                        className="text-sm font-semibold text-blue-600 px-4 py-2 border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setActiveModal("signup")}
                        className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Signup
                    </button>
                </div>
            </nav>

            <AuthModal
                activeModal={activeModal}
                onClose={(switchTo) => {
                    if (switchTo) {
                        setActiveModal(switchTo)
                    } else {
                        setActiveModal("")
                    }
                }}
            />
        </>
    )
}

export default Navbar