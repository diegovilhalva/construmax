import React from 'react';
import { Link } from 'react-router';
import image1 from "../assets/images/construction8.jpg"
import image2 from "../assets/images/construction1.jpg"
import image3 from  "../assets/images/construction10.jpg"
const BlogSection = () => {

  // Dados de exemplo (serão substituídos por dados do Laravel)
  const blogPosts = [
    {
      id: 1,
      title: 'Tendências em Construção Sustentável para 2024',
      excerpt: 'Descubra as inovações e materiais que estão revolucionando a construção ecológica e como aplicá-las em seus projetos.',
      date: '15 Março, 2024',
      image: image1,
      category: 'Sustentabilidade',
      readingTime: '4 min leitura'
    },
    {
      id: 2,
      title: 'Como Planejar uma Reforma sem Surpresas',
      excerpt: 'Guia completo para evitar imprevistos e garantir que sua reforma seja concluída dentro do prazo e orçamento planejados.',
      date: '8 Março, 2024',
      image: image2,
      category: 'Reformas',
      readingTime: '6 min leitura'
    },
    {
      id: 3,
      title: 'A Importância da Manutenção Predial Preventiva',
      excerpt: 'Saiba como a manutenção regular pode prolongar a vida útil de seu prédio e evitar custos elevados com reparos emergenciais.',
      date: '1 Março, 2024',
      image: image3,
      category: 'Manutenção',
      readingTime: '5 min leitura'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Conhecimento em Construção
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimas do <span className="text-primary">Blog</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Artigos, dicas e novidades do mundo da construção civil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-56">
                <img src={post.image} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-full h-full" />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{post.date}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {post.readingTime}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  Continuar lendo
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/blog" 
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-flex items-center shadow-lg hover:shadow-xl"
          >
            Ver todos os artigos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="CurrentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;