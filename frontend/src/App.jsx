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

import LabReports from "./pages/labstaff/LabReports.jsx"
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
       <Route path="/labreports/order" element={<LabReports/>}/>
    </Routes>
    
    </>
    )
}

export default App
