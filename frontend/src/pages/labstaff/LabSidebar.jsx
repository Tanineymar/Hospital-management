// function Sidebar(){
//     return(
//         <div>
//             Labstaff SidebarOpen
//         </div>
//     )
// }
// export default Sidebar

import {
    LayoutDashboard,
    Upload,
    FileText,
    FilePen,
    Settings,
    ChevronLeft,
    ChevronRight,
    TestTubeDiagonal,
} from "lucide-react"

import { NavLink } from "react-router-dom"

const NAV_ITEMS = [
    {
        key: "overview",
        label: "Overview",
        icon: LayoutDashboard,
        path: "/labstaff/orders",
    },
    {
        key: "upload",
        label: "Upload Report",
        icon: Upload,
        path: "/lab/upload",
    },
    {
        key: "reports",
        label: "Reports",
        icon: FileText,
        path: "/lab/reports",
    },
    {
        key: "patch",
        label: "Patch Status",
        icon: FilePen,
        path: "/lab/patch-status",
    },
    {
        key: "settings",
        label: "Settings",
        icon: Settings,
        path: "/lab/settings",
    },
]

function LabSidebar({ sidebarOpen, setSidebarOpen, pendingCount }) {
    return (
        <aside
            className={`${sidebarOpen ? "w-64" : "w-20"}
            fixed left-0 top-0 h-screen
            bg-white border-r border-slate-300
            flex flex-col shrink-0
            transition-all duration-300
            shadow-lg
        `}
        >
            {/* Logo */}
            <div className="h-20 border-b border-slate-300 flex items-center px-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#085041] to-[#1D9E75] flex items-center justify-center shrink-0 shadow-md">
                    <TestTubeDiagonal className="w-5 h-5 text-white" />
                </div>
                {sidebarOpen && (
                    <div className="ml-3 overflow-hidden">
                        <h1 className="text-base font-bold text-[#085041]">
                            Medi<span className="text-[#1D9E75]">Lab</span>
                        </h1>
                        <p className="text-[11px] text-slate-500 whitespace-nowrap">
                            Lab Staff Panel
                        </p>
                    </div>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-4">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.key}
                            to={item.path}
                            className={({ isActive }) => `
                                group relative w-full flex items-center
                                ${sidebarOpen ? "justify-start px-4" : "justify-center"}
                                gap-3 py-3 rounded-2xl text-sm font-semibold
                                transition-all duration-200
                                ${
                                    isActive
                                        ? "bg-[#085041] text-white shadow-md"
                                        : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                                }
                            `}
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            {sidebarOpen && (
                                <span className="whitespace-nowrap">{item.label}</span>
                            )}
                            {item.key === "reports" && pendingCount > 0 && (
                                <div
                                    className={`${sidebarOpen ? "ml-auto" : "absolute -top-1 right-1"}
                                    min-w-[20px] h-5 px-1
                                    flex items-center justify-center
                                    rounded-full bg-red-500 text-white
                                    text-[10px] font-mono shadow-sm
                                `}
                                >
                                    {pendingCount}
                                </div>
                            )}
                        </NavLink>
                    )
                })}
            </nav>

            {/* Collapse button */}
            <div className="p-3 border-t border-slate-300">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
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
                            <ChevronLeft className="w-4 h-4" />
                        </>
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </button>
            </div>
        </aside>
    )
}

export default LabSidebar