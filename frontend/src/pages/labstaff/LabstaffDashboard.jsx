import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function LabstaffDashboard(){
    return(
        <div>
            
            <div>
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    )
}
export default LabstaffDashboard