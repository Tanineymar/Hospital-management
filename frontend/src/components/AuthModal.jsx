import loginImg from '../assets/login.jpg'
import { X } from 'lucide-react'

function AuthModal() {
    return (
        <>
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-8'>

                {/* Modal container */}

                <div className='relative w-full h-auto max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col sm:flex-row'>
                    <button className='absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-gray-100'>
                        <X className='w-5 h-5 text-gray-600' />
                    </button>
                    {/* Left img */}
                    <div className='hidden sm:block sm:w-1/2 h-48 sm:h-auto'>
                        <img src={loginImg} alt='img' className='w-full h-full object-cover' />
                    </div>
                    {/* right side */}
                    <div className='w-full sm:w-1/2 p-6 sm:p-10 flex flex-col text-gray-800'>
                        <h2 className='text-2xl sm:text-3xl font-semibold mb-2 text-gray-800'>Sign up</h2>
                        <p className='text-sm text-gray-600 mb-4'>Create your account to manage appointments and lab tests in one place.</p>
                        <input className='p-2 w-full border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter Full Name' />
                        <input className='w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" placeholder='Enter Email' />
                        <input className='w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Enter password' />
                        <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-lg font-medium">
                            Continue
                        </button>
                           
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthModal