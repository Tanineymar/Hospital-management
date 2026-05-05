
import { useState } from "react"
import AuthModal from "./AuthModal"

function Navbar() {
    const [activeModal, setActiveModal] = useState("")
    return (
        <>
            <nav className="flex justify-between items-center px-8 py-4 border-b-olive-700 bg-white shadow-md  ">
                <h1 className="text-xl font-bold text-blue-600">Medi<span className="text-teal-500">Care</span></h1>
                
                <div className=" hidden md:flex items-center gap-7 text-gray-500 font-medium ">
                    <a href="#" className=" hover:text-blue-600 transition-colors">Home</a>
                    <a href="#" className=" hover:text-blue-600 transition-colors">Doctors</a>
                    <a href="#" className=" hover:text-blue-600 transition-colors">Lab Tests</a>
                    <a href="#" className=" hover:text-blue-600 transition-colors">Contact</a>
                </div>

                <div className="flex gap-2.5">
                    <button onClick={() => setActiveModal("login")}
                        className="text-sm font-semibold text-blue-600 px-4 py-2 border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100  transition-colors">Login</button>
                    <button
                        onClick={() => setActiveModal("signup")}
                        className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors ">Signup</button>
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

