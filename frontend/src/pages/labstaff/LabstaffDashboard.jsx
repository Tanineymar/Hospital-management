import { Outlet } from "react-router-dom"
import LabSidebar from "./LabSidebar"
import { useState } from "react"

function LabstaffDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    return (
        <div className="flex min-h-screen">
            <LabSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <main className={`
            flex-1 p-6 overflow-y-auto h-screen
            transition-all duration-300

            ${sidebarOpen ? "ml-64" : "ml-20"}
        `}>
                <Outlet />
            </main>

        </div>
    )
}
export default LabstaffDashboard