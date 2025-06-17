import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BlogPostModal from '../modals/BlogPostModal';
import Loading from '../Loading';
import { AuthContext } from '../../context/Auth';

const DashboardBlog = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchBlogPosts();
    fetchTeamMembers();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/blog-posts', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBlogPosts(res.data.data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast.error('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/team-members', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTeamMembers(res.data);
    } catch (error) {
      console.error('Erro ao carregar membros:', error);
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedPost(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Deseja realmente excluir este post?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/blog-posts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBlogPosts(prev => prev.filter(p => p.id !== id));
      toast.success('Post excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      toast.error('Erro ao excluir post');
    }
  };

  const handleSave = (savedPost) => {
    if (selectedPost) {
      setBlogPosts(prev => 
        prev.map(p => p.id === savedPost.id ? savedPost : p)
      );
    } else {
      setBlogPosts(prev => [...prev, savedPost]);
    }
  };

  if (loading) return <Loading />;
  console.log(blogPosts)
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gerenciar Artigos do Blog</h2>
        <button
          onClick={handleCreate}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          Novo Artigo
        </button>
      </div>

      {blogPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Nenhuma postagem feita.</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visualizações
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post.cover_image ? (
                        <img 
                          src={post.cover_image} 
                          alt={post.title} 
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                      )}
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.author?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.views || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <BlogPostModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          selectedPost={selectedPost}
          teamMembers={teamMembers}
        />
      )}
    </div>
  );
};

export default DashboardBlog;