import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import hero from "../assets/images/blog-hero.jpg";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['all']);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/blog-posts');
    
       const publishedArticles = response.data.data.filter(post => post.status === "published")
        setBlogPosts(publishedArticles);
        
        // Extrair categorias únicas
        const uniqueCategories = ['all', ...new Set(publishedArticles.map(post => post.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Função para criar um excerto a partir do conteúdo (removendo HTML)
  const createExcerpt = (content, maxLength = 150) => {
    if (!content) return '';
    
    // Remover tags HTML
    const plainText = content.replace(/<[^>]*>/g, '');
    
    if (plainText.length <= maxLength) return plainText;
    
    return plainText.substring(0, maxLength) + '...';
  };

  // Função para calcular tempo de leitura
  const calculateReadingTime = (content) => {
    if (!content) return '1 min leitura';
    
    // Remover tags HTML para contar apenas o texto
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min leitura`;
  };

  // Função para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Filtra posts por categoria e termo de busca
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    // Criar texto sem HTML para busca
    const plainTextContent = post.content ? post.content.replace(/<[^>]*>/g, '') : '';
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          plainTextContent.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Posts regulares (paginados)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Paginação
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img src={hero} className="object-cover w-full h-full opacity-80" alt="Construmax Blog" />
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
            {/* Lista de Artigos */}
            <div className="lg:w-2/3">
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
                          {post.cover_image ? (
                            <img 
                              src={post.cover_image} 
                              alt={post.title} 
                              className="w-full h-48 md:h-full object-cover"
                            />
                          ) : (
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 md:h-full" />
                          )}
                        </div>
                        
                        <div className="p-6 md:w-2/3">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center text-sm text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(post.created_at)}</span>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {calculateReadingTime(post.content)}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                          <p className="text-gray-600 mb-4">{createExcerpt(post.content)}</p>
                          
                          <div className="flex flex-wrap justify-between items-center">
                            <div className="flex items-center mb-4 md:mb-0">
                              {post.author?.image ? (
                                <img 
                                  src={post.author.image} 
                                  alt={post.author.name} 
                                  className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                              ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-900">{post.author?.name || 'Autor desconhecido'}</p>
                                <p className="text-xs text-gray-500">{post.category}</p>
                              </div>
                            </div>
                            
                            <Link 
                              to={`/blog/${post.slug}`}
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
                        {post.cover_image ? (
                          <img 
                            src={post.cover_image} 
                            alt={post.title} 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4 flex-shrink-0" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{calculateReadingTime(post.content)}</span>
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
            to="/contact" 
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