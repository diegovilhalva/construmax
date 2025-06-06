import React, { useState } from 'react';
import { Link } from 'react-router';
import hero from "../assets/images/blog-hero.jpg"
import CEO from "../assets/images/ceo.jpg"
import member1 from "../assets/images/member-1.jpg"
import member2 from "../assets/images/pexels-pixabay-220453.jpg"
import member3 from "../assets/images/member-3.jpg"
import image1 from "../assets/images/construction8.jpg"
import image2 from "../assets/images/construction1.jpg"
import image3 from  "../assets/images/construction10.jpg"
const Blog = () => {
  // Estados para filtros e controles
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Dados do blog (serão substituídos por dados do Laravel posteriormente)
  const blogPosts = [
    {
      id: 1,
      title: 'Tendências em Construção Sustentável para 2024',
      excerpt: 'Descubra as inovações e materiais que estão revolucionando a construção ecológica e como aplicá-las em seus projetos.',
      date: '15 Março, 2024',
      image: image1,
      category: 'Sustentabilidade',
      readingTime: '4 min leitura',
      author: 'Carlos Silva',
      authorImage: CEO,
      featured: true,
      content: 'Conteúdo completo do post...'
    },
    {
      id: 2,
      title: 'Como Planejar uma Reforma sem Surpresas',
      excerpt: 'Guia completo para evitar imprevistos e garantir que sua reforma seja concluída dentro do prazo e orçamento planejados.',
      date: '8 Março, 2024',
      image: image2,
      category: 'Reformas',
      readingTime: '6 min leitura',
      author: 'Fernanda Oliveira',
      authorImage: member1,
      featured: true,
      content: 'Conteúdo completo do post...'
    },
    {
      id: 3,
      title: 'A Importância da Manutenção Predial Preventiva',
      excerpt: 'Saiba como a manutenção regular pode prolongar a vida útil de seu prédio e evitar custos elevados com reparos emergenciais.',
      date: '1 Março, 2024',
      image:image3,
      category: 'Manutenção',
      readingTime: '5 min leitura',
      author: 'Ricardo Mendes',
      authorImage: member2,
      featured: false,
      content: 'Conteúdo completo do post...'
    },
    {
      id: 4,
      title: 'Novas Tecnologias em Concreto: Mais Resistência e Durabilidade',
      excerpt: 'Conheça os avanços em formulações de concreto que oferecem melhor desempenho estrutural e vida útil prolongada.',
      date: '22 Fevereiro, 2024',
      image: '/blog-post-4.jpg',
      category: 'Materiais',
      readingTime: '7 min leitura',
      author: 'Juliana Santos',
      authorImage: member3,
      featured: false,
      content: 'Conteúdo completo do post...'
    },
    {
      id: 5,
      title: 'Gestão de Resíduos em Obras: Melhores Práticas',
      excerpt: 'Estratégias eficientes para reduzir, reaproveitar e reciclar resíduos de construção, minimizando impacto ambiental.',
      date: '15 Fevereiro, 2024',
      image: '/blog-post-5.jpg',
      category: 'Sustentabilidade',
      readingTime: '8 min leitura',
      author: 'Carlos Silva',
      authorImage: CEO,
      featured: false,
      content: 'Conteúdo completo do post...'
    },
    {
      id: 6,
      title: 'Projetos Arquitetônicos para Climas Quentes',
      excerpt: 'Soluções inteligentes de arquitetura bioclimática para garantir conforto térmico e eficiência energética em regiões tropicais.',
      date: '8 Fevereiro, 2024',
      image: '/blog-post-6.jpg',
      category: 'Arquitetura',
      readingTime: '5 min leitura',
      author: 'Fernanda Oliveira',
      authorImage: member1,
      featured: false,
      content: 'Conteúdo completo do post...'
    },
    {
      id: 7,
      title: 'Sistemas de Impermeabilização: Como Escolher o Melhor',
      excerpt: 'Guia comparativo das principais tecnologias de impermeabilização e como selecionar a ideal para cada tipo de construção.',
      date: '1 Fevereiro, 2024',
      image: '/blog-post-7.jpg',
      category: 'Tecnologia',
      readingTime: '6 min leitura',
      author: 'Ricardo Mendes',
      authorImage: member2,
      featured: false,
      content: 'Conteúdo completo do post...'
    },
    {
      id: 8,
      title: 'Segurança em Obras: Equipamentos e Protocolos Essenciais',
      excerpt: 'Os equipamentos de proteção e procedimentos obrigatórios para garantir a segurança dos trabalhadores em canteiros de obra.',
      date: '25 Janeiro, 2024',
      image: '/blog-post-8.jpg',
      category: 'Segurança',
      readingTime: '7 min leitura',
      author: 'Juliana Santos',
      authorImage: member3,
      featured: false,
      content: 'Conteúdo completo do post...'
    },
    {
      id: 9,
      title: 'Acústica em Edifícios: Soluções para Conforto Sonoro',
      excerpt: 'Técnicas e materiais para controlar a propagação de ruídos e garantir ambientes silenciosos e confortáveis.',
      date: '18 Janeiro, 2024',
      image: '/blog-post-9.jpg',
      category: 'Conforto',
      readingTime: '5 min leitura',
      author: 'Carlos Silva',
      authorImage: CEO,
      featured: false,
      content: 'Conteúdo completo do post...'
    }
  ];

  // Filtra posts por categoria e termo de busca
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Posts em destaque
  const featuredPosts = blogPosts.filter(post => post.featured);

  // Posts regulares (paginados)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Categorias únicas
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  // Paginação
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img src={hero} className=" object-cover w-full h-full opacity-80" />
          {/*<div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary/30"></div>*/}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Conhecimento em <span className="text-primary">Construção</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Artigos, dicas e novidades do mundo da construção civil para profissionais, clientes e entusiastas.
            </p>
            
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Buscar artigos..."
                className="w-full px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Posts em Destaque */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-300">
                Artigos em <span className="text-primary">Destaque</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  >
                    <div className="relative h-56">
                      <img src={post.image} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
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
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={post.authorImage} className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                          <span className="text-sm text-gray-700">{post.author}</span>
                        </div>
                        
                        <Link 
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
                        >
                          Ler artigo
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="CurrentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Todos os Artigos */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-300">
                {searchTerm ? `Resultados para "${searchTerm}"` : 'Todos os Artigos'}
              </h2>
              
              {currentPosts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Nenhum artigo encontrado</h3>
                  <p className="text-gray-600 mb-6">Tente alterar os filtros ou a busca</p>
                  <button 
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                    }}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg"
                  >
                    Ver Todos os Artigos
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 mb-12">
                  {currentPosts.map((post) => (
                    <div 
                      key={post.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img src={post.image} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 md:h-full object-cover" />
                        </div>
                        
                        <div className="p-6 md:w-2/3">
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
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          
                          <div className="flex flex-wrap justify-between items-center">
                            <div className="flex items-center mb-4 md:mb-0">
                              <img src={post.authorImage} className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3 object-cover " />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                <p className="text-xs text-gray-500">{post.category}</p>
                              </div>
                            </div>
                            
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
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center space-x-1">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      &laquo;
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === index + 1
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Categorias */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Categorias</h3>
                  <ul className="space-y-3">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            setActiveCategory(category);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            activeCategory === category
                              ? 'bg-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category === 'all' ? 'Todas Categorias' : category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Posts Populares */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Artigos Populares</h3>
                  <ul className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <li key={post.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Newsletter */}
                <div className="bg-primary rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Assine nossa Newsletter</h3>
                  <p className="text-white/90 mb-4">
                    Receba artigos exclusivos e novidades sobre construção civil diretamente em seu e-mail.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      className="w-full px-4 py-3 rounded-lg focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-primary font-bold py-3 px-4 rounded-lg transition-colors hover:bg-gray-100"
                    >
                      Inscrever-se
                    </button>
                  </form>
                </div>
                
                {/* Tags */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tags Populares</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Concreto', 'Sustentabilidade', 'Tecnologia', 'Acabamentos', 'Eficiência Energética', 'Normas Técnicas', 'Gestão de Obras', 'Design Arquitetônico'].map((tag, index) => (
                      <a
                        key={index}
                        href="#"
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Tem um tema que gostaria de ver aqui?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Envie suas sugestões de artigos e participe da nossa comunidade de construção.
          </p>
          <Link 
            to="/contato" 
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-block"
          >
            Enviar Sugestão
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;