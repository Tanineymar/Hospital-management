import { useRef, useState } from 'react'
import API from '../api/axios.js'
import axios from 'axios'
import { X } from "lucide-react"
import AuthImg from '../assets/login.jpg'

function AuthModal({ onClose, activeModal }) {

    const [name, setName] = useState("")
    const [signEmail, setSignEmail] = useState("")
    const [signPassword, setSignPassword] = useState("")

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const timeRef = useRef(null)


    if (!activeModal) {
        return null
    }

    // Register API

    const handleRegister = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post("/auth/signup", {
                name,
                email: signEmail,
                password: signPassword,
                role: "patient"
            })
            onClose()
        } catch (error) {
            message: "Registration failed",
                console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // Login API

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/auth/login', {
                email: loginEmail,
                password: loginPassword
            })
            onClose()
        } catch (error) {
            message: "Login failed",
                console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div onClick={() => onClose()} className=' fixed inset-0 z-50 backdrop-blur-xs bg-black/40 ' />

            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                <div className='relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row' >
                    <button onClick={() => onClose()} className=' absolute right-4 top-4 p-1.5 rounded-full bg-white/80 hover:bg-red-100 transition-colors'>
                        <X className='w-5 h-5 text-gray-600' />
                    </button>

                    <div className='hidden sm:block w-1/2'>
                        <img src={AuthImg}
                            className='w-full h-full object-cover'
                        />
                    </div>

                    <div className='w-full sm:w-1/2 p-8 flex flex-col' >
                        <h1 className='text-2xl font-bold text-blue-600 mb-1' >Medi<span className='text-teal-500'>Care</span></h1>
                        <div className='flex border-b border-slate-100 mb-5 mt-4'>
                            <button onClick={() => onClose("login")} className={`flex-1 pb-2.5 text-sm 
                                font-semibold border-b-2 transition-all ${activeModal === "login" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400"}
                                `}>
                                Login
                            </button>
                            <button onClick={() => onClose("signup")} className={`flex-1 pb-2.5 text-sm font-semibold border-b-2 transition-all ${activeModal === "signup" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400"
                                }`}>
                                Sign up
                            </button>
                        </div>

                    </div>



                </div>
            </div>
        </>

    )
}

export default AuthModal