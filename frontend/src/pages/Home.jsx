import AboutIntro from "../components/AboutIntro"
import Hero from "../components/Hero"
import OngoingProjects from "../components/OnGoingProjects"
import ServicesSection from "../components/ServicesSection"
import WhyChooseUs from "../components/WhyChooseUs"


const Home = () => {
    
  return (
    <div className="">
        
        <main>
            <Hero />
            <AboutIntro />
            <ServicesSection />
            <WhyChooseUs />
            <OngoingProjects />
        </main>
    </div>
  )
}

export default Home