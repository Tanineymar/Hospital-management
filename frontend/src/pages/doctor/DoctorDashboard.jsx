import { useState } from "react"
import Sidebar from "./Sidebar.jsx"
import { Outlet } from "react-router-dom"

function DoctorDashboard(){
    const [sidebarOpen , setSidebarOpen] = useState(true)
    return(
        <div className=" flex min-h-screen">
            <Sidebar
             sidebarOpen={sidebarOpen}
             setSidebarOpen={setSidebarOpen}
            />
            <main className="flex-1 p-6 bg-slate-100">
                <Outlet/>
            </main>
        </div>
    )
}
export default DoctorDashboard