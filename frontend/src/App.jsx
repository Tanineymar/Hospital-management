import {Routes , Route} from "react-router-dom"
import LandingPage from "./pages/Landing.jsx"
import Doctors from "./pages/patient/doctors.jsx"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/doctors" element={<Doctors/>} />
    </Routes>
    </>
    )
}

export default App
