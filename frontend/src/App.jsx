import {Routes , Route} from "react-router-dom"
import LandingPage from "./pages/Landing.jsx"
import FetchDoctors from "./pages/patient/Doctor.jsx"
import LabTests from "./pages/patient/Labtest.jsx"
import BookAppointment from "./pages/patient/BookAppointment.jsx"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
       <Route path="/doctors" element={<FetchDoctors/>}/>
       <Route path="/lab-tests" element={<LabTests/>}/>
       <Route path="/book/:doctorId" element={<BookAppointment/>}/>
    </Routes>
    </>
    )
}

export default App
