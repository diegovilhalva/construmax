import AboutIntro from "../components/AboutIntro"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import ServicesSection from "../components/ServicesSection"


const Home = () => {
    
  return (
    <div className="">
        
        <main>
            <Hero />
            <AboutIntro />
            <ServicesSection />
        </main>
    </div>
  )
}

export default Home