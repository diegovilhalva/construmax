import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import reformaImg from '../assets/images/construction1.jpg';
import industrialImg from '../assets/images/construction2.jpg';
import civilImg from '../assets/images/construction7.jpg';
import publicasImg from '../assets/images/construction122 (2).jpg'
import servicesHero from "../assets/images/services-hero.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const Services = () => {
  const [services,setServices] = useState([])
  const [loading,setLoading] = useState(false)
  /*const services = [
    {
      id: 1,
      title: 'Construção Civil',
      description: 'Projetamos e executamos construções residenciais e comerciais com qualidade superior, desde pequenas edificações até grandes complexos arquitetônicos.',
      detailedDescription: 'Nossa expertise em construção civil abrange todo o ciclo do projeto, desde o desenvolvimento do conceito arquitetônico até a entrega final. Utilizamos tecnologias construtivas avançadas e materiais de primeira linha para garantir durabilidade, segurança e excelência estética. Nossos projetos seguem rigorosos padrões de qualidade e são executados com atenção aos detalhes, prazos e orçamentos.',
      image: civilImg,
      features: [
        'Edifícios residenciais e comerciais',
        'Condomínios horizontais e verticais',
        'Estruturas em concreto armado e metálicas',
        'Gestão completa da obra',
        'Acabamentos de alto padrão'
      ],
      process: [
        { step: 1, title: 'Consultoria Inicial', description: 'Análise de viabilidade e concepção inicial do projeto' },
        { step: 2, title: 'Projeto Executivo', description: 'Desenvolvimento detalhado com soluções técnicas' },
        { step: 3, title: 'Aprovações Legais', description: 'Obtenção de licenças e alvarás necessários' },
        { step: 4, title: 'Execução da Obra', description: 'Construção com monitoramento constante de qualidade' },
        { step: 5, title: 'Entrega e Garantia', description: 'Vistoria final e garantia de 24 meses' }
      ]
    },
    {
      id: 2,
      title: 'Reformas e Renovações',
      description: 'Transformamos espaços existentes com soluções criativas e funcionais, mantendo a qualidade e respeitando prazos.',
      detailedDescription: 'Especializados em revitalizar estruturas existentes, oferecemos soluções completas para reformas residenciais, comerciais e industriais. Nossa abordagem inclui diagnóstico estrutural, projetos de modernização, atualização de sistemas elétricos e hidráulicos, além de acabamentos que renovam completamente os ambientes. Trabalhamos com mínimo impacto nas atividades do local, garantindo segurança e qualidade em todas as etapas.',
      image: reformaImg,
      features: [
        'Reformas residenciais e corporativas',
        'Ampliações e modificações estruturais',
        'Restauração de fachadas históricas',
        'Modernização de instalações',
        'Gerenciamento de obras com moradores presentes'
      ]
    },
    {
      id: 3,
      title: 'Construção Industrial',
      description: 'Projetos industriais robustos com tecnologia de ponta, garantindo eficiência e segurança operacional.',
      detailedDescription: 'Desenvolvemos soluções integradas para o setor industrial, desde galpões logísticos até complexos fabris completos. Nossos projetos priorizam eficiência operacional, flexibilidade de layout e conformidade com normas técnicas rigorosas. Utilizamos estruturas metálicas de alta resistência, sistemas de automação avançados e soluções sustentáveis que reduzem custos operacionais e impacto ambiental.',
      image: industrialImg,
      features: [
        'Galpões industriais e logísticos',
        'Plataformas e estruturas metálicas',
        'Instalações para produção e armazenagem',
        'Infraestrutura para utilidades industriais',
        'Sistemas de automação e segurança'
      ]
    },
    {
      id: 4,
      title: 'Obras Públicas',
      description: 'Infraestrutura para a comunidade com responsabilidade social, transparência e excelência técnica.',
      detailedDescription: 'Com experiência comprovada em obras públicas, entregamos projetos de infraestrutura que transformam comunidades. Atuamos em parceria com órgãos governamentais desenvolvendo soluções para mobilidade urbana, saneamento básico, equipamentos públicos e infraestrutura urbana. Nossos processos seguem rigorosos padrões de transparência, qualidade técnica e sustentabilidade, garantindo o melhor retorno para o investimento público.',
      image: publicasImg,
      features: [
        'Sistemas de saneamento básico',
        'Ponte, viadutos e obras de arte especiais',
        'Escolas, postos de saúde e equipamentos públicos',
        'Infraestrutura viária e urbanização',
        'Parques e áreas de lazer públicas'
      ]
    }
  ];*/
useEffect(() => {
   const fetchServices = async () => {
        try {
          setLoading(true)
          const res = await axios.get('http://localhost:8000/api/services')
        setServices(res.data)
        } catch (error) {
          toast.error("Erro ao carregar os serviços")
        }finally{
          setLoading(false)
        }
      }
      fetchServices()
},[])

console.log(services)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img src={servicesHero} className=" w-full h-full opacity-80" />
          {/*<div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary/30"></div>*/}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Nossos <span className="text-primary">Serviços</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluções completas em construção civil, desde projetos personalizados até a entrega final com excelência.
          </p>
        </div>
      </section>
    
      {/* Lista de Serviços */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading && <Loading  />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="relative h-56">
                  <img src={service.image} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-full h-full" />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <Link 
                    to={`/contato?service=${service.title}`}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
                  >
                    Solicitar Orçamento
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="CurrentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detalhamento dos Serviços */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-primary">Soluções Especializadas</span> para Cada Necessidade
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Conheça em detalhes como podemos transformar seu projeto em realidade
            </p>
          </div>
          
          {services.map((service) => (
            <div 
              key={service.id} 
              id={`service-${service.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 lg:p-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.detailedDescription}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Principais Características:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {service.process_steps && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Nosso Processo:</h3>
                      <div className="space-y-4">
                        {service.process_steps.map((step) => (
                          <div key={step.step} className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-4">
                              {step.step}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{step.title}</h4>
                              <p className="text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Link 
                    to={`/contact?service=${service.title}`}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center"
                  >
                    Solicitar Proposta para {service.title}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="CurrentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
                
                <div className="h-96 lg:h-auto">
                  <img src={service.image} className="bg-gray-200 object-cover   border-2 border-dashed rounded-xl w-full h-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Precisa de uma solução personalizada?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Nossa equipe está pronta para desenvolver um projeto sob medida para suas necessidades específicas.
          </p>
          <Link 
            to="/contato" 
            className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-block"
          >
            Fale com Nossos Especialistas
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;