import {
    LayoutDashboard,
    ClipboardList,
    User,
    ChevronLeft,
    ChevronRight,
    Stethoscope,
    SidebarOpen
} from "lucide-react";

import { NavLink } from "react-router-dom";




const Nav_items = [
    {
        key: "overview",
        label: "Overview",
        icon: LayoutDashboard,
        path:"/doctor/dashboard"
        
    },
    {
        key: "appointments",
        label: "Appointments",
        icon: ClipboardList,
        path:"/doctor/appointments"
    },
    {
        key: "profile",
        label: "My Profile",
        icon: User,
        path:"/doctor/myprofile"
      
    },

]

function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    pendingCount,
}) {
    return (
        <aside className={`${sidebarOpen ? "w-64" : "w-20"}
        fixed left-0 top-0 h-screen
         bg-white border-r border-slate-300
         flex flex-col shrink-0 
         transition-all duration-300
         shadow-lg
        `}>
            {/* Logo */}
            <div className="h-20 border-b border-slate-300 flex items-center px-4 ">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-md">
                    <Stethoscope className="w-5 h-5 text-white" />
                </div>
                {
                    sidebarOpen && (
                        <div className="ml-3 overflow-hidden">
                            <h1 className="text-base font-bold text-blue-600">
                                Medi<span className="text-teal-500">Care</span>
                            </h1>
                            <p className="text-[11px] text-slate-500 whitespace-nowrap">Doctor Panel</p>
                        </div>
                    )
                }
            </div> <nav className="flex-1 p-3 space-y-4">
                {Nav_items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink key={item.key}
                              to={item.path}
                            className={({isActive})=>`
                                  group relative w-full flex items-center
                                  ${sidebarOpen ? "justify-start px-4" : "justify-center"}
                                  gap-3 py-3 rounded-2xl text-sm font-semibold 
                                  transition-all duration-200
                                  
                                  ${isActive ? "bg-blue-600 text-white shadow-md"
                                    : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                                }
                                `}>

                            <Icon className="w-5 h-5 shrink-0" />
                            {sidebarOpen && (
                                <span className="whitespace-nowrap">
                                    {item.label}
                                </span>
                            )}
                            {item.key === "appointments" && pendingCount > 0 && (
                                <div className={`${sidebarOpen ? "ml-auto" : "absolute -top-1 right-1"}
                                     min-w-[20px] h-5 px-1
                                     flex items-center justify-center
                                     rounded-full bg-red-500 text-white
                                     font-[5px] font-mono shadow-sm
                                    `}>{pendingCount}</div>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-slate-300">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`
                   w-full flex items-center 
                   ${sidebarOpen ? "justify-between px-4" : "justify-center"}
                   py-3 rounded-2xl
                   bg-slate-100 hover:bg-slate-300
                   text-slate-500 hover:text-slate-800
                   transition-all duration-200
          `}
                >
                    {sidebarOpen ? (
                        <>
                        <span className="text-sm font-semibold">Collapse</span>
                        <ChevronLeft className="w-4 h-4"/>
                        </>
                    ):(
                        <ChevronRight className="w-4 h-4"/>
                    )}

                </button>
            </div>

        </aside>
    )
}

export default Sidebar