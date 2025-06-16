import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import aboutHero from '../assets/images/about-hero (1).jpg';
import historyImage from '../assets/images/history.jpg';
import teamImage from '../assets/images/team-photo (1).jpg';
import CEO from "../assets/images/ceo.jpg"
import member1 from "../assets/images/member-1.jpg"
import member2 from "../assets/images/pexels-pixabay-220453.jpg"
import member3 from "../assets/images/member-3.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
const About = () => {
  // Dados da empresa (serão substituídos por dados do Laravel posteriormente)
  const companyHistory = `Fundada em 1999 por Engenheiro Carlos Silva, a Construmax começou como uma pequena empreiteira com apenas 5 funcionários. Nos primeiros anos, concentramos nossos esforços em pequenas reformas e construções residenciais na região de São Paulo.

Em 2005, com a conquista de nosso primeiro grande projeto comercial, expandimos nossas operações e investimos em tecnologia e capacitação de pessoal. A década seguinte foi marcada por crescimento sustentável e reconhecimento no mercado, culminando com o Prêmio Nacional de Excelência em Construção Civil em 2018.

Hoje, com mais de 200 colaboradores e 500 projetos concluídos, mantemos o mesmo compromisso com qualidade, inovação e satisfação do cliente que nos guiou desde o primeiro dia.`;

const [leadershipTeam,setLeadershipTeam] = useState([])
const [loading,setLoading] = useState(false)
  // Equipe de liderança
 /* const leadershipTeam = [
    {
      id: 1,
      name: 'Carlos Silva',
      position: 'Fundador & CEO',
      bio: 'Engenheiro Civil com 30 anos de experiência, especialista em gestão de grandes projetos.',
      linkedin: '#',
      image: CEO
    },
    {
      id: 2,
      name: 'Fernanda Oliveira',
      position: 'Diretora de Operações',
      bio: 'MBA em Gestão de Projetos com 15 anos atuando em obras de alto padrão.',
      linkedin: '#',
      image: member1
    },
    {
      id: 3,
      name: 'Ricardo Mendes',
      position: 'Diretor Financeiro',
      bio: 'Contador e Especialista em Finanças para Construção Civil.',
      linkedin: '#',
      image: member2
    },
    {
      id: 4,
      name: 'Juliana Santos',
      position: 'Diretora de Engenharia',
      bio: 'Doutora em Estruturas com prêmios internacionais em engenharia sustentável.',
      linkedin: '#',
      image: member3
    }
  ];*/

  useEffect(() => {
    (async function fetchMembers() {
        try {
          setLoading(true)
          const res = await axios.get("http://localhost:8000/api/team-members",{
            headers:{
              "Content-Type":"application/json"
            }
          })
          setLeadershipTeam(res.data)
        } catch (error) {
          toast.error("Ocrorreu um erro ao carregar membros da equpie")
        }finally{
          setLoading(false)
        }
    })()
  },[])

  // Valores da empresa
  const companyValues = [
    {
      title: 'Missão',
      description: 'Construir empreendimentos de excelência que superem expectativas, através de soluções inovadoras e sustentáveis, contribuindo para o desenvolvimento das comunidades onde atuamos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Visão',
      description: 'Ser referência nacional em construção civil até 2030, reconhecida pela excelência, inovação e compromisso socioambiental.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Valores',
      description: 'Ética, transparência, qualidade, inovação, sustentabilidade, segurança e respeito às pessoas são os pilares que guiam nossas ações diárias.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  // Conquistas
  const achievements = [
    { value: '25+', label: 'Anos de Experiência' },
    { value: '500+', label: 'Projetos Concluídos' },
    { value: '50+', label: 'Prêmios Conquistados' },
    { value: '98%', label: 'Satisfação do Cliente' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutHero}
            alt="Nossa História"
            className="w-full h-full object-cover opacity-80"
          />
         {/*<div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary/20"></div>*/}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Construindo <span className="text-primary">Futuros</span> desde 1999
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Conheça nossa jornada, nossos valores e a equipe que transforma sonhos em estruturas sólidas e duradouras.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#history"
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
              >
                Nossa História
              </a>
              <a
                href="#team"
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
              >
                Conheça a Equipe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* História da Empresa */}
      <section id="history" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nossa <span className="text-primary">Jornada</span>
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                {companyHistory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{item.value}</div>
                    <div className="text-gray-600 text-sm mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img src={teamImage} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-full h-96" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-lg z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos <span className="text-primary">Pilares</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Os fundamentos que guiam cada projeto e decisão em nossa empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe de Liderança */}
      <section id="team" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa <span className="text-primary">Liderança</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Conheça os profissionais que guiam a Construmax rumo à excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {loading && <Loading />}
            {leadershipTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-64">
                  <img src={member.image} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-full h-full" />
                  <div className="absolute bottom-4 right-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-white p-2 rounded-full hover:text-primary"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-gray-900 text-white">
            <div className="absolute inset-0">
              <img src={historyImage} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary/30"></div>
            </div>

            <div className="relative z-10 py-16 px-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Junte-se ao nosso time de talentos
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Estamos sempre buscando profissionais apaixonados por construção e inovação.
              </p>
              <a
                href="/carreiras"
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-block"
              >
                Ver Oportunidades
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar seu projeto?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Nossa equipe está pronta para transformar sua visão em realidade com excelência e profissionalismo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contato"
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
            >
              Solicitar Orçamento
            </Link>
            <Link
              to="/projetos"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg hover:bg-white/10"
            >
              Ver Projetos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;