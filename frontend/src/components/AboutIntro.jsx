import React from 'react';
import { Link } from 'react-router';
import aboutImage from '../assets/images/1.jpg'; 

const AboutIntro = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={aboutImage} 
                alt="Construmax - Nossa Equipe" 
                className="w-full h-auto object-cover transform hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary rounded-lg transform rotate-12 z-10"></div>
          </div>
          
          {/* Conteúdo textual */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-primary">25 Anos</span> Construindo o Futuro
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Fundada em 1999, a Construmax é referência em construção civil, com mais de duas décadas de experiência em projetos residenciais e comerciais de alto padrão. Nossa missão é transformar sonhos em estruturas sólidas e duradouras.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Compromisso com Qualidade', 
                  description: 'Padrões rigorosos em todas as etapas construtivas' 
                },
                { 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: 'Segurança em Primeiro Lugar', 
                  description: 'Ambientes protegidos para trabalhadores e clientes' 
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/about" 
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg inline-flex items-center"
              >
                Conheça Nossa História
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <a 
                href="#projects" 
                className="bg-white text-gray-900 border-2 border-primary font-bold py-3 px-6 rounded-lg transition duration-300 text-lg inline-flex items-center hover:bg-primary/10"
              >
                Veja Nossos Projetos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;