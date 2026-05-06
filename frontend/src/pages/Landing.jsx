import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import Services from "../components/Services.jsx"

function LandingPage(){
    return(
        <>
        <div>
            <Navbar/>
            <Hero/>
            <Services/>        
        </div>
        </>
    )
}

export default LandingPage