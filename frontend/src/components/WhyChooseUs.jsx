import React from 'react';
import building1 from "../assets/images/construction4.jpg"
import building2 from "../assets/images/construction4 (2).jpg"
import building3 from "../assets/images/construction12121.jpg"
import building4  from "../assets/images/construction-work-2698790_1280.jpg"
import CEO from "../assets/images/ceo.jpg"

const WhyChooseUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Nossa Excelência
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Porquê Escolher a <span className="text-primary">Construmax</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Descubra os diferenciais que nos tornam a escolha certa para sua obra
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagem com destaque */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-lg h-64">
                <img src={building1} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-80 -mt-8">
                <img src={building2} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-80">
                <img src={building3} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-full h-full" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-64 -mt-8">
                <img src={building4} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-full h-full" />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary rounded-lg transform rotate-12 z-10"></div>
          </div>
          
          {/* Lista de diferenciais */}
          <div>
            <div className="space-y-8">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Qualidade Garantida',
                  description: 'Utilizamos materiais premium e seguimos rigorosos padrões de qualidade em todas as etapas da construção.'
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Cumprimento de Prazos',
                  description: 'Metodologias ágeis e planejamento detalhado garantem que seu projeto será entregue no prazo combinado.'
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Transparência Total',
                  description: 'Orçamentos detalhados sem surpresas, acompanhamento de obras em tempo real e comunicação direta com a equipe.'
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: 'Equipe Qualificada',
                  description: 'Profissionais certificados, engenheiros experientes e mão de obra especializada para resultados excepcionais.'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    {item.icon}
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-primary/10 p-6 rounded-xl border-l-4 border-primary">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compromisso com a Excelência</h3>
              <p className="text-gray-700">
                "Na Construmax, não construímos apenas estruturas, construímos relacionamentos. 
                Nosso compromisso vai além da entrega da obra - garantimos suporte pós-entrega e 
                satisfação total do cliente."
              </p>
              <div className="mt-4 flex items-center">
                <img src={CEO} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <p className="font-bold text-gray-900">Carlos Silva</p>
                  <p className="text-gray-600">Fundador e CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;