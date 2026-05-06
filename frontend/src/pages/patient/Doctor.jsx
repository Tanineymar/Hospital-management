import { useEffect, useState } from "react"
import API from "../../api/axios"




function FetchDoctors(){
    const [doctors , setDoctors]=useState([])

useEffect(()=>{
    API.get('/doctor')
    .then((res)=>{
        console.log(res.data.doctors)
        setDoctors(res.data.doctors || [])
    }).catch((err)=>{
        console.error(err)
    })
},[])
    return(
        <>
        <div>
            <h1>Book appointments with doctor</h1>
            <div className="grid md:grid-cols-3 gap-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold">{doc.user?.name}</h2>
            <p className="text-gray-500 text-sm">{doc.specialization}</p>
            <p className="text-sm mt-2">₹{doc.consultationFee}</p>
            <p className="text-sm mt-2">{doc.experience} yrs</p>
          </div>
        ))}
      </div>
        </div>
        </>
    )
}

export default FetchDoctors