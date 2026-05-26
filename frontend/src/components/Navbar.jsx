import { useState } from "react"
import AuthModal from "./AuthModal"
import { NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"

function Navbar() {

    const [activeModal, setActiveModal] = useState("")
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinkClass = ({ isActive }) =>
        `group relative py-1 transition-colors duration-300
        ${
            isActive
                ? "text-blue-600"
                : "text-gray-500 hover:text-blue-600"
        }`

    return (
        <>
            <nav className="bg-white shadow-md px-5 md:px-8 py-4">

                <div className="flex items-center justify-between">

                    {/* Logo */}

                    <h1 className="text-xl font-bold text-blue-600">
                        Medi<span className="text-teal-500">Care</span>
                    </h1>

                    {/* Desktop Nav */}

                    <div className="hidden lg:flex items-center gap-7 font-medium">

                        <NavLink to="/" className={navLinkClass}>
                            Home
                        </NavLink>

                        <NavLink to="/doctors" className={navLinkClass}>
                            Doctors
                        </NavLink>

                        <NavLink to="/lab-tests" className={navLinkClass}>
                            Lab Tests
                        </NavLink>

                        <NavLink
                            to="/appointments/my"
                            className={navLinkClass}
                        >
                            My Appointments
                        </NavLink>

                    </div>

                    {/* Desktop Buttons */}

                    <div className="hidden sm:flex gap-2.5">

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

                    {/* Mobile Menu Button */}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition"
                    >

                        {
                            menuOpen
                                ? <X size={22} />
                                : <Menu size={22} />
                        }

                    </button>

                </div>

                {/* Mobile Menu */}

                {
                    menuOpen && (

                        <div className="lg:hidden mt-5 flex flex-col gap-4 border-t pt-4">

                            <NavLink
                                to="/"
                                className={navLinkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/doctors"
                                className={navLinkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Doctors
                            </NavLink>

                            <NavLink
                                to="/lab-tests"
                                className={navLinkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Lab Tests
                            </NavLink>

                            <NavLink
                                to="/appointments/my"
                                className={navLinkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                My Appointments
                            </NavLink>

                            {/* Mobile Buttons */}

                            <div className="flex gap-3 pt-2">

                                <button
                                    onClick={() => {
                                        setActiveModal("login")
                                        setMenuOpen(false)
                                    }}
                                    className="flex-1 text-sm font-semibold text-blue-600 px-4 py-2 border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => {
                                        setActiveModal("signup")
                                        setMenuOpen(false)
                                    }}
                                    className="flex-1 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    Signup
                                </button>

                            </div>

                        </div>

                    )
                }

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