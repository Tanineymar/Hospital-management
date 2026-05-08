import {Routes , Route} from "react-router-dom"
import LandingPage from "./pages/Landing.jsx"
import FetchDoctors from "./pages/patient/Doctor.jsx"
import LabTests from "./pages/patient/Labtest.jsx"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
       <Route path="/doctors" element={<FetchDoctors/>}/>
       <Route path="/lab-tests" element={<LabTests/>}/>
    </Routes>
    </>
    )
}

export default App
