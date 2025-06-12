import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import image1 from "../assets/images/construction6.jpg"
import image2 from "../assets/images/construction2.jpg"
import image3 from "../assets/images/factory.jpg"
import image4 from "../assets/images/hospital.jpg"
import image5 from "../assets/images/condominio (1).jpg"
import image6 from "../assets/images/school.jpg"
import hero from "../assets/images/projects-hero.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';
const Projects = () => {
  // Estados para controle da interface
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([])

  // Dados dos projetos (serão substituídos por dados do Laravel posteriormente)
  /*  const projects = [
      {
        id: 1,
        title: 'Residencial Alto das Colinas',
        status: 'Em andamento',
        progress: 65,
        location: 'São Paulo, SP',
        description: 'Condomínio fechado com 24 unidades, arquitetura contemporânea e áreas de lazer completas.',
        image: image1,
        startDate: 'Jan/2024',
        endDate: 'Dez/2026',
        area: '12.500m²',
        investment: 'R$ 82M',
        category: 'Residencial',
        completed: false
      },
      {
        id: 2,
        title: 'Centro Comercial Moderna',
        status: 'Em andamento',
        progress: 45,
        location: 'Rio de Janeiro, RJ',
        description: 'Complexo comercial com 5 andares, cinema, praça de alimentação e estacionamento para 500 carros.',
        image: image2,
        startDate: 'Mar/2024',
        endDate: 'Nov/2026',
        area: '28.000m²',
        investment: 'R$ 120M',
        category: 'Comercial',
        completed: false
      },
      {
        id: 3,
        title: 'Fábrica Industrial Técnica',
        status: 'Concluído',
        progress: 100,
        location: 'Campinas, SP',
        description: 'Complexo industrial com 3 galpões de produção, escritórios administrativos e centro de distribuição.',
        image: image3,
        startDate: 'Ago/2021',
        endDate: 'Jun/2022',
        area: '15.000m²',
        investment: 'R$ 65M',
        category: 'Industrial',
        completed: true
      },
      {
        id: 4,
        title: 'Hospital Municipal',
        status: 'Concluído',
        progress: 100,
        location: 'Belo Horizonte, MG',
        description: 'Unidade de saúde pública com 120 leitos, centro cirúrgico e pronto atendimento 24h.',
        image: image4,
        startDate: 'Fev/2020',
        endDate: 'Dez/2021',
        area: '8.500m²',
        investment: 'R$ 48M',
        category: 'Público',
        completed: true
      },
      {
        id: 5,
        title: 'Condomínio Green View',
        status: 'Em andamento',
        progress: 80,
        location: 'Florianópolis, SC',
        description: 'Condomínio sustentável com 40 unidades, energia solar e sistema de reaproveitamento de água.',
        image: image5,
        startDate: 'Set/2022',
        endDate: 'Ago/2024',
        area: '9.200m²',
        investment: 'R$ 56M',
        category: 'Residencial',
        completed: false
      },
      {
        id: 6,
        title: 'Escola Técnica Estadual',
        status: 'Concluído',
        progress: 100,
        location: 'Porto Alegre, RS',
        description: 'Instituição de ensino profissionalizante com 12 salas de aula, laboratórios e auditório.',
        image: image6,
        startDate: 'Jan/2021',
        endDate: 'Dez/2021',
        area: '6.800m²',
        investment: 'R$ 32M',
        category: 'Público',
        completed: true
      },
      {
        id: 7,
        title: 'Shopping Center Norte',
        status: 'Concluído',
        progress: 100,
        location: 'Salvador, BA',
        description: 'Centro comercial com 150 lojas, praça de alimentação, cinema e estacionamento coberto.',
        image: '/project-7.jpg',
        startDate: 'Mar/2019',
        endDate: 'Nov/2020',
        area: '45.000m²',
        investment: 'R$ 185M',
        category: 'Comercial',
        completed: true
      },
      {
        id: 8,
        title: 'Resort Praia Dourada',
        status: 'Em andamento',
        progress: 30,
        location: 'Maceió, AL',
        description: 'Complexo turístico com 120 suítes, piscinas, spa e centro de convenções.',
        image: '/project-8.jpg',
        startDate: 'Jan/2023',
        endDate: 'Dez/2025',
        area: '32.000m²',
        investment: 'R$ 210M',
        category: 'Comercial',
        completed: false
      }
    ];
    */

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
  // Filtra os projetos com base no filtro ativo
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ongoing') return !project.completed;
    if (activeFilter === 'completed') return project.completed;
    return project.category === activeFilter;
  });

  // Projetos atualmente visíveis
  const projectsToShow = filteredProjects.slice(0, visibleProjects);

  // Simula carregamento de mais projetos
  const loadMoreProjects = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProjects(prev => prev + 4);
      setIsLoading(false);
    }, 800);
  };

  // Verifica se há mais projetos para carregar
  const hasMoreProjects = visibleProjects < filteredProjects.length;
  console.log(projects)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img src={hero} className="object-cover opacity-100  w-full h-full" />
          {/*<div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary/30"></div>*/}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Nossos <span className="text-primary">Projetos</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça nosso portfólio de obras realizadas e acompanhe os projetos em desenvolvimento.
          </p>
        </div>
      </section>

      {/* Filtros e Controles */}
      <section className="py-12 bg-gray-50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'ongoing', label: 'Em Andamento' },
                { id: 'completed', label: 'Concluídos' },
                { id: 'Residencial', label: 'Residencial' },
                { id: 'Comercial', label: 'Comercial' },
                { id: 'Industrial', label: 'Industrial' },
                { id: 'Público', label: 'Público' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setVisibleProjects(6);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="text-sm text-gray-600">
              Mostrando {Math.min(visibleProjects, filteredProjects.length)} de {filteredProjects.length} projetos
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Projetos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nenhum projeto encontrado</h3>
              <p className="text-gray-600 mb-6">Tente alterar os filtros de busca</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg"
              >
                Ver Todos os Projetos
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsToShow.map(project => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  >
                    <div className="relative h-64">
                      <img src={project.image} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                      <div className="absolute top-4 left-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-secondary text-gray-900'
                          }`}>
                          {project.completed ? 'Concluído' : 'Em Andamento'}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <p className="text-white/90 text-sm">{project.location}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{project.description}</p>

                      {!project.completed && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-700 mb-1">
                            <span>Progresso</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {project.completed ? new Date(project.end_date).toLocaleDateString(
                            'pt-BR',{
                              month:"short",
                              year:"numeric"
                            }

                          ) : new Date(project.end_date).toLocaleDateString(
                            "pt-BR", {
                            month: "short",
                            year: "numeric"

                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {project.area} m²
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {project.investment}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {project.category}
                        </div>
                      </div>

                      <Link
                        to={`/projetos/${project.id}`}
                        className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
                      >
                        Ver detalhes do projeto
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão Carregar Mais */}
              {hasMoreProjects && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMoreProjects}
                    disabled={isLoading}
                    className="bg-white border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Carregando...
                      </>
                    ) : (
                      'Carregar Mais Projetos'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Projetos Concluídos' },
              { value: '25+', label: 'Anos de Experiência' },
              { value: 'R$ 2B+', label: 'Investido em Obras' },
              { value: '98%', label: 'Satisfação do Cliente' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Quer fazer parte do nosso portfólio?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Transforme sua visão em realidade com a qualidade e expertise Construmax.
          </p>
          <Link
            to="/contato"
            className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-block"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;