import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import image1  from "../assets/images/construction6.jpg"
import image2  from "../assets/images/construction2.jpg"
import axios from 'axios';
const OngoingProjects = () => {
  const [projects,setProjects] = useState([])
  // Dados dos projetos (serão substituídos por dados do Laravel posteriormente)
 /* const projects = [
    {
      id: 1,
      title: 'Residencial Alto das Colinas',
      type: 'Residencial de Luxo',
      location: 'São Paulo, SP',
      progress: 65,
      description: 'Condomínio fechado com 24 unidades, arquitetura contemporânea e áreas de lazer completas.',
      image: image1
    },
    {
      id: 2,
      title: 'Centro Comercial Moderna',
      type: 'Shopping Center',
      location: 'Rio de Janeiro, RJ',
      progress: 45,
      description: 'Complexo comercial com 5 andares, cinema, praça de alimentação e estacionamento para 500 carros.',
      image:  image2
    }
  ];*/

    useEffect(() => {
    (async function fetchProjects() {
      try {
        const res = await axios.get("http://localhost:8000/api/projects")
        setProjects(res.data)
      } catch (error) {
        toast.error("Erro ao carregar projetos")
      }
    })()
  }, [])
  const onGoingProjects =  projects.filter(p => p.status === "Em andamento" && p.progress < 70)
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Obras em Andamento
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projetos em <span className="text-primary">Construção</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Acompanhe nossas obras ativas e veja a transformação em tempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {onGoingProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64 md:h-80">
                <img src={project.image} className="bg-gray-200 object-cover  border-2 border-dashed rounded-xl w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-secondary text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                      Em Andamento
                    </span>
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {project.progress}% concluído
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-white/80 text-sm">{project.type} | {project.location}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Progresso da obra</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  
                    <div  className="text-center bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Início</div>
                      <div className="font-bold text-gray-900">{new Date(project.start_date).toLocaleDateString("pt-BR",{month:"short",year:"numeric",})}</div>
                    </div>
                     <div  className="text-center bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Previsão</div>
                      <div className="font-bold text-gray-900">{new Date(project.end_date).toLocaleDateString("pt-BR",{month:"short",year:"numeric",})}</div>
                    </div>
                     <div  className="text-center bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Área</div>
                      <div className="font-bold text-gray-900">{project.area}</div>
                    </div>
                      <div  className="text-center bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Investimento</div>
                      <div className="font-bold text-gray-900">{project.investment}</div>
                    </div>
                             
                </div>
                
                <Link 
                  to={`/projects`}
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  Acompanhar evolução
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/projects" 
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-flex items-center shadow-lg hover:shadow-xl"
          >
            Ver todos os nossos projetos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="CurrentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;