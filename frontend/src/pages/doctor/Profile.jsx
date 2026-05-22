import { User, Mail, Stethoscope, GraduationCap, Clock, IndianRupee, BadgeCheck, FileText } from 'lucide-react'
import API from "../../api/axios.js"
import { useEffect, useState } from 'react'

function Field({ icon: Icon, label, value }) {
  return (
    <div>
      <label className='flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2'>
        <Icon size={14} />
        {label}
      </label>
      <div className='border border-slate-100 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 font-medium'>
        {value || "-"}
      </div>
    </div>
  )
}

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get("/doctor/profile/me")
      .then((res) => {
        setProfile(res.data.doctor)
        console.log(res.data.doctor)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[90vh] '>
        Loading your profile...
      </div>
    )
  }
  return (
    <div className='space-y-6'>

      <div>
        <h1 className='text-2xl font-bold text-slate-800'>My profile</h1>
        <p className='text-sm text-slate-500'>View your professional details</p>
      </div>

      <div className='bg-white border border-slate-200 rounded-2xl p-6'>
        {/* avatar */}
        <div className='flex justify-between py-5'>
          <div className=' flex items-center gap-4 mb-8'>
            <div className='w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center text-2xl justify-center font-bold'>
              {profile?.user?.name?.charAt(0)}
            </div>
            {/* /Info */}
            <div>
              <h2 className='text-xl font-bold text-slate-800'>{profile?.user?.name}</h2>
              <p className='text-sm text-slate-600'>{profile?.specialization}</p>
              <p className='text-xs text-slate-500'>{profile?.user?.email}</p>
            </div>
          </div>

          {/* Availability */}
          <div className='flex items-center gap-4 mb-8 px-1'>
            <p className='text-sm  font-semibold text-slate-600'>Available</p>
            <div
              className={`w-14 h-7 rounded-full relative
  
              ${profile?.isAvailable
                  ? "bg-green-500"
                  : "bg-slate-300"
                }
              `}
            >

              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all
      
              ${profile?.isAvailable
                    ? "left-8"
                    : "left-1"
                  }
              `}
              />

            </div>

            <span
              className={`text-sm font-medium
    
            ${profile?.isAvailable
                  ? "text-green-600"
                  : "text-slate-400"
                }
             `}
            >

              {
                profile?.isAvailable
                  ? "Online"
                  : "Offline"
              }

            </span>

          </div>


        </div>

        {/* fields */}
        <div className='grid grid-cols-2 gap-5 '>
          <Field
            icon={User} label="Full Name"
            value={profile?.user?.name}
          />
          <Field
            icon={Mail} label="Email"
            value={profile?.user?.email}
          />
          <Field
            icon={Stethoscope} label="Speacialization"
            value={profile?.specialization}
          />
          <Field
            icon={GraduationCap} label="Qualification"
            value={profile?.qualification}
          />
          <Field
            icon={Clock} label="Experience"
            value={`${profile?.experience}`}
          />
          <Field
            icon={IndianRupee} label="Consultation Fee"
            value={`₹ ${profile?.consultationFee}`}
          />
          <Field
            icon={BadgeCheck} label="License Number"
            value={profile?.licenseNumber}
          />
          
        </div>

        {/* About */}
        <div className='mt-6'>
          <Field 
           icon={FileText} label="About"
           value={profile?.about}
          />
        </div>
      </div>

    </div>

  )
}

export default Profile