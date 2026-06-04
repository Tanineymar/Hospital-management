import {Routes , Route} from "react-router-dom"
import LandingPage from "./pages/Landing.jsx"
import FetchDoctors from "./pages/patient/FetchDoctor.jsx"
import LabTests from "./pages/patient/Labtest.jsx"
import BookAppointment from "./pages/patient/BookAppointment.jsx"
import DoctorProfile from "./pages/patient/DoctorProfile.jsx"
import MyBookings from "./pages/patient/Appointments.jsx"
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx"
import Profile from "./pages/doctor/Profile.jsx"
import Overview from "./pages/doctor/Overview.jsx"
import Appointments from "./pages/doctor/Appointments.jsx"

import LabOverviewPage from "./pages/labstaff/Laboverviewpage.jsx"
import LabstaffDashboard from "./pages/labstaff/LabstaffDashboard.jsx"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
       <Route path="/doctors" element={<FetchDoctors/>}/>
       <Route path="/lab-tests" element={<LabTests/>}/>
       <Route path="/book/:doctorId" element={<BookAppointment/>}/>
       <Route path="/doctor/profile/:doctorId" element={<DoctorProfile/>} />
       <Route path="/appointments/my" element={<MyBookings/>}/> 
      
      {/* DOCTOR DASHBOARD */}
    <Route path="/doctor" element={<DoctorDashboard/>}>
      <Route path="myprofile" element={<Profile/>}/>
      <Route path="dashboard" element={<Overview/>}/>
      <Route path="appointments" element={<Appointments/>}/>
    </Route>

    {/* LAB-STAFF DASHBOARD */}
      <Route path="/labstaff" element={<LabstaffDashboard/>}>
       <Route path="orders" element={<LabOverviewPage/>}/>
      </Route>
    </Routes>
    
    </>
    )
}

export default App
