import React, { useState } from 'react';
import { Link } from 'react-router';
import reformaImg from '../assets/images/construction1.jpg';
import industrialImg from '../assets/images/construction2.jpg';
import civilImg from '../assets/images/construction7.jpg';
import publicasImg from '../assets/images/construction122 (2).jpg';
import { useEffect } from 'react';
import axios from 'axios';
const ServicesSection = () => {
  const [services,setServices] = useState([])
 /* const services = [
    {
      id: 1,  
      title: 'Reformas e Renovações',
      description: 'Transformamos espaços existentes com soluções criativas e funcionais, mantendo a qualidade e respeitando prazos.',
      image: reformaImg,
      link: '/services',
      features: ['Residenciais', 'Comerciais', 'Restauração histórica', 'Modernização']
    },
    {
      id: 2,
      title: 'Construção Industrial',
      description: 'Projetos industriais robustos com tecnologia de ponta, garantindo eficiência e segurança operacional.',
      image: industrialImg,
      link: '/services',
      features: ['Galpões', 'Fábricas', 'Armazéns', 'Infraestrutura logística']
    },
    {
      id: 3,
      title: 'Construção Civil',
      description: 'Edificações residenciais e comerciais com design inovador, qualidade superior e cumprimento rigoroso de normas.',
      image: civilImg,
      link: '/services',
      features: ['Prédios residenciais', 'Condomínios', 'Shopping Centers', 'Edifícios corporativos']
    },
    {
      id: 4,
      title: 'Obras Públicas',
      description: 'Infraestrutura para a comunidade com responsabilidade social, transparência e excelência técnica.',
      image: publicasImg,
      link: '/services',
      features: ['Pontes e viadutos', 'Escolas e hospitais', 'Saneamento básico', 'Infraestrutura urbana']
    }
  ];*/
  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get('http://localhost:8000/api/services')
      setServices(res.data)
    }
    fetchServices()
  },[])
  console.log(services)


  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Nossas Especialidades
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Serviços de <span className="text-primary">Excelência</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Oferecemos soluções completas em construção civil, desde projetos personalizados até a entrega final com qualidade superior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                    Principais Atuações
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mr-3"></span>
                        <span className="text-gray-700">{feature.feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  to={"/services"}
                  className="inline-flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors"
                >
                  Saiba mais sobre este serviço
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            to="/services" 
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-flex items-center shadow-lg hover:shadow-xl"
          >
            Conheça todos os nossos serviços
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="CurrentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;