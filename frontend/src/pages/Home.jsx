import AboutIntro from "../components/AboutIntro"
import BlogSection from "../components/BlogSection"
import Hero from "../components/Hero"
import OngoingProjects from "../components/OnGoingProjects"
import ServicesSection from "../components/ServicesSection"
import Testimonials from "../components/Testimonials"
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
            <Testimonials />
            <BlogSection />
        </main>
    </div>
  )
}

export default Home