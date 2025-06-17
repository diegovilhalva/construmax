import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import { DiscussionEmbed } from 'disqus-react';
import { FaCalendarAlt, FaClock, FaUser, FaArrowLeft } from 'react-icons/fa';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/blog-posts/${slug}`);
        setPost(response.data);
        
        // Buscar posts relacionados
        const relatedResponse = await axios.get(`http://localhost:8000/api/blog-posts?category=${response.data.category}&limit=3&exclude=${response.data.id}`);
        setRelatedPosts(relatedResponse.data);
      } catch (err) {
        setError('Post não encontrado');
        console.error('Erro ao carregar post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h2>
          <p className="text-gray-600 mb-8">O post que você está procurando não existe ou foi removido.</p>
          <Link 
            to="/blog" 
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg"
          >
            Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  // Calcular tempo de leitura
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); 
  
  // Configurações do Disqus
  const disqusConfig = {
    url: window.location.href,
    identifier: post.slug,
    title: post.title,
    language:'pt_BR'
  };
 

  return (
    <div className="min-h-screen">
      {/* Cabeçalho */}
    
<div className="bg-white py-16 pt-28 border-b  border-gray-200">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <Link 
      to="/blog" 
      className="inline-flex items-center text-primary hover:underline font-medium mb-4"
    >
      <FaArrowLeft className="mr-2" />
      Voltar para o Blog
    </Link>
    
    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
      {post.title}
    </h1>
    
    <div className="flex flex-wrap items-center text-gray-600 text-sm gap-x-6 gap-y-2">
      <div className="flex items-center gap-1">
        <FaCalendarAlt />
        <span> {new Date(post.created_at).toLocaleDateString('pt-BR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
      </div>
      <div className="flex items-center gap-1">
        <FaClock />
        <span>{readingTime} min leitura</span>
      </div>
      <div className="flex items-center gap-1">
        <FaUser />
        <span>{post.author?.name || 'Autor desconhecido'}</span>
      </div>
    </div>
  </div>
</div>


      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          {post.cover_image && (
            <img 
              src={post.cover_image} 
              alt={post.title} 
              className="w-full h-96 object-cover"
            />
          )}
          
          <div className="p-6 md:p-10">
            <div className="flex justify-between items-center mb-6">
              <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">
                {post.views} visualizações
              </span>
            </div>
            
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center">
                {post.author?.image ? (
                  <img 
                    src={post.author.image} 
                    alt={post.author.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900">{post.author?.name || 'Autor desconhecido'}</h4>
                  <p className="text-gray-600">{post.author?.position || ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comentários */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Comentários ({post.comments_count || 0})
          </h3>
          <DiscussionEmbed
            shortname="construmax" 
            config={disqusConfig}
          />
        </div>

        {/* Posts Relacionados */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Artigos Relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="h-48">
                    {relatedPost.cover_image ? (
                      <img 
                        src={relatedPost.cover_image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed w-full h-full" />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mb-2 inline-block">
                      {relatedPost.category}
                    </span>
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      <span>
                        {new Date(relatedPost.created_at).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;