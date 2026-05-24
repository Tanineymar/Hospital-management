import { useEffect, useState } from "react"
import API from "../../api/axios"

function Appointments(){
    const [appointments , setAppointments] = useState(null)

    useEffect(()=>{
        API.get("/appointments/doctor")
        .then((res)=>{
            console.log(res.data)
            setAppointments(res.data.appointments)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-lg">{appointments?.length}</p>
        </div>
    )
}

export default Appointments