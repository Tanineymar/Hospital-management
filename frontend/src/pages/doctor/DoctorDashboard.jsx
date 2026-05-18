import { useEffect, useState } from "react"
import Sidebar from "./Sidebar.jsx"
import API from "../../api/axios.js"

function DoctorDashboard(){
    const [appointments , setAppointments] =useState()

    useEffect(()=>{
        API.get('/appointments/doctor')
        .then((res)=>{
            console.log(res.data)
            setAppointments(res.data || [])
        })
    },[])
    return(
        <div>
            <Sidebar/>
        </div>
    )
}

export default DoctorDashboard