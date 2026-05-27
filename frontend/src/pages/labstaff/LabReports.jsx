import { useEffect, useState } from "react"
import API from "../../api/axios"


function LabReports(){
const [reports , setReports] = useState([])

useEffect(()=>{
    API.get("/lab-orders/department")
    .then((res)=>{
        console.log(res.data.orders)
        setReports(res.data.orders)
    }).catch((err)=>{
        console.log(err)
    })
},[])

    return(
        <div>
            <h1>LAB REPORTS PAGE</h1>
            <h1>{reports.department}</h1>
            <h1>{reports.length}</h1>
        </div>
    )
}

export default LabReports