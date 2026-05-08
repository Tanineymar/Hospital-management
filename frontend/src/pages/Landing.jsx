import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import Services from "../components/Services.jsx"
import FeaturedDoctors from "../components/DoctorSection.jsx"

function LandingPage(){
    return(
        <>
        <div>
            <Navbar/>
            <Hero/>
            <Services/> 
            <FeaturedDoctors/>       
        </div>
        </>
    )
}

export default LandingPage