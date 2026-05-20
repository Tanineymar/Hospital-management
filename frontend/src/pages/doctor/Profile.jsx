import {User , Mail , Stethoscope, GraduationCap, Clock ,IndianRupee ,BadgeCheck, FileText} from 'lucide-react'
import API from "../../api/axios.js"
import { useEffect, useState } from 'react'

function Field({icon: Icon , label, value}){
  return(
    <div>
      <label className='flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2'>
        <Icon size={14}/>
        {label}
      </label>
      <div className='border border-slate-100 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 font-medium'>
        {value || "-"}
      </div>
    </div>
  )
}

function Profile(){
  const [Profile ,setProfile] = useState(null)
  const[loading ,  setLoading]= useState(true)

  useEffect(()=>{
    API.get("/doctor/profile/me")
    .then((res)=>{
      setProfile(res.data.doctor)
      console.log(res.data.doctor)
    })
    .catch((error)=>{
      console.log(error)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  if(loading){
    return(
      <div className='flex justify-center items-center text-center '>
        Loading...
      </div>
    )
  }
  return(
    <div className='space-y-6'>

      <div>
        <h1 className='text-2xl font-bold text-slate-800'>My profile</h1>
        <p className='text-sm text-slate-500'>View your professional details</p>
      </div>
      
    </div>

  )
}

export default Profile