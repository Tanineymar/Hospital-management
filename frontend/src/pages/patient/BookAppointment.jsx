import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar.jsx"
import { useEffect } from "react"
import API from "../../api/axios.js"

function BookAppointment(){
    const {doctorId} = useParams()
    console.log(doctorId)

    useEffect(()=>{
        API.get(`/doctor/profile/${doctorId}`)
        .then((res)=>{
            console.log(res.data)
        })
    },[])
    return(
        <div>
            <Navbar/>

        </div>
    )
}
export default BookAppointment