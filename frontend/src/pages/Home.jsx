import AboutIntro from "../components/AboutIntro"
import BlogSection from "../components/BlogSection"
import Hero from "../components/Hero"
import OngoingProjects from "../components/OnGoingProjects"
import ServicesSection from "../components/ServicesSection"
import Testimonials from "../components/Testimonials"
import WhyChooseUs from "../components/WhyChooseUs"
import { Helmet } from 'react-helmet-async'

const Home = () => {

  return (
    <div className="">
      <Helmet>
        <title>Construmax | Construindo Sonhos, Criando Realidades</title>
        <meta
          name="description"
          content="A Construmax oferece serviços de construção civil, reformas e gerenciamento de projetos com qualidade e confiança."
        />
        <meta
          name="keywords"
          content="construção civil, obras, reformas, gerenciamento de obras, construtora, Construmax"
        />
        <meta name="author" content="Construmax" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph (Facebook, WhatsApp) */}
        <meta property="og:title" content="Construmax | Construindo Sonhos, Criando Realidades" />
        <meta
          property="og:description"
          content="Serviços de construção civil e reformas com excelência e compromisso."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://construmax.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Construmax | Construindo Sonhos" />
        <meta
          name="twitter:description"
          content="Serviços especializados em construção e reforma com qualidade."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </Helmet>


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