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
            {
                reports.map((report)=>(
                    <div key={report._id} className="flex items-center justify-center p-3 border border-blue-400 m-5 bg-blue-50">
                        <h1 className="text-slate-900 font-semibold">{report.patient.name}</h1>

                    </div>
                ))
            }
        </div>
    )
}

export default LabR