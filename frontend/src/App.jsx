import {Routes , Route} from "react-router-dom"
import LandingPage from "./pages/Landing.jsx"
import FetchDoctors from "./pages/patient/FetchDoctor.jsx"
import LabTests from "./pages/patient/Labtest.jsx"
import BookAppointment from "./pages/patient/BookAppointment.jsx"
import DoctorProfile from "./pages/patient/DoctorProfile.jsx"
import MyBookings from "./pages/patient/Appointments.jsx"

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
    </Routes>
    </>
    )
}

export default App
