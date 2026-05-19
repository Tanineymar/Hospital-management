import { useEffect, useState } from "react"
import API from "../../api/axios.js"
function Profile(){
    const [profile , setProfile] =useState()

    useEffect(()=>{
        API.get("/doctor/profile/me")
        .then((res)=>{
            setProfile(res.data)
            console.log(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    return(
        <div className="flex">
            <main className="text-3xl font-bold">
                Profile Page
            </main>
        </div>
    )
}

export default Profile