import { act, useRef, useState } from 'react'
import API from '../api/axios.js'
import axios from 'axios'
import { X } from "lucide-react"
import AuthImg from '../assets/login.jpg'
import toast from 'react-hot-toast'

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

    // VALIDATION ERROR MESSAGE

    const handleError = (error)=>{
        const data =  error.response?.data

        if(data?.error && Array.isArray(data.error)){
            toast.error(data.error[0].msg)
        }else if(data?.message){
            toast.error(data.message)
        }else{
            toast.error("Something went wrong")
        }
    }

    // Register API

    const handleRegister = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await API.post("/auth/signup", {
                name,
                email: signEmail,
                password: signPassword,
                role: "patient"
            })
            toast.success(response.data.message)
            
            onClose()
        } catch (error) {
           handleError(error)
        } finally {
            setLoading(false)
        }
    }

    // Login API

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await API.post('/auth/login', {
                email: loginEmail,
                password: loginPassword
            })
            toast.success(response.data.message)
            console.log(response.data)
            onClose()
        } catch (error) {
            console.log(error.response?.data)
            handleError(error)
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
                        <div className='flex border-b border-slate-100 mb-1 mt-4'>
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
                        {/* LOGIN */}
                        {activeModal === "login" && (
                            <form onSubmit={handleLogin} className='flex flex-col gap-3'>
                                <p className='text-sm text-gray-600 mt-2 mb-1'>
                                    Get access to your orders, lab tests & doctor consultations
                                </p>
                                <input type="email" placeholder='Enter Email' value={loginEmail}
                                    className='w-full border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    onChange={(event) => setLoginEmail(event.target.value)} />

                                <input type={showPassword ? "text" : "password"} placeholder='Enter Password' value={loginPassword}
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                    className="w-full border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10"
                                />

                                <button type='submit'
                                    className='w-full bg-blue-600 text-white p-3 rounded-lg font-medium text-sm flex items-center justify-center hover:bg-blue-700 transition-colors '>
                                    Continue</button>
                                <p className="text-sm text-gray-600 text-center mt-1">
                                    New on Mediare? {" "}
                                    <button
                                        type="button"
                                        onClick={() => onClose("signup")}
                                        className="text-blue-600 font-semibold hover:underline">
                                        Sign up
                                    </button>
                                </p>
                            </form>
                        )}

                        {/* REGISTER */}
                        {
                            activeModal === 'signup' && (
                                <form onSubmit={handleRegister} className='flex flex-col gap-3'>
                                    <p className='text-sm text-gray-600 mt-2 mb-1'> Sign up to book appointments with doctors and lab tests seamlessly</p>

                                    <input type="text" placeholder='Enter Name' value={name} 
                                     onChange={(event)=>setName(event.target.value)}
                                     className='w-full border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                    <input type="email" placeholder='Enter Email' value={signEmail} 
                                     onChange={(event)=>setSignEmail(event.target.value)}
                                     className='w-full border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                    <input type="password" placeholder='Enter Password' value={signPassword} 
                                     onChange={(event)=>setSignPassword(event.target.value)}
                                     className='w-full border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                    <button type='submit'className='w-full bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors' >
                                        Continue</button>
                                    <p className='text-sm text-gray-600 text-center mt-1'>Already on Medicare? {""}
                                        <button onClick={()=>onClose("login")}
                                            className='text-blue-600 font-semibold hover:underline p'>Login</button>
                                    </p>
                                </form>
                            )
                        }
                    </div>



                </div>
            </div>
        </>

    )
}

export default AuthModal