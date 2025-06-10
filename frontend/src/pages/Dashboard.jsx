import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiLogOut, FiMenu, FiX, FiHome, FiSettings, FiUsers, FiFileText, FiStar, FiGrid } from 'react-icons/fi';
import { AuthContext } from '../context/Auth';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const {logout} = useContext(AuthContext)
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  // Simular carregamento de dados do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simular chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados de exemplo para serviços
        setServices([
          { id: 1, title: 'Construção Civil', status: 'Ativo', created: '2023-05-15' },
          { id: 2, title: 'Reformas e Renovações', status: 'Ativo', created: '2023-06-20' },
          { id: 3, title: 'Construção Industrial', status: 'Ativo', created: '2023-07-10' },
          { id: 4, title: 'Obras Públicas', status: 'Inativo', created: '2023-04-05' },
        ]);
        
        // Dados de exemplo para projetos
        setProjects([
          { id: 1, title: 'Residencial Alto das Colinas', status: 'Em andamento', progress: 65 },
          { id: 2, title: 'Centro Comercial Moderna', status: 'Em andamento', progress: 45 },
          { id: 3, title: 'Fábrica Industrial Técnica', status: 'Concluído', progress: 100 },
          { id: 4, title: 'Hospital Municipal', status: 'Concluído', progress: 100 },
        ]);
        
        // Dados de exemplo para artigos do blog
        setBlogPosts([
          { id: 1, title: 'Tendências em Construção Sustentável', views: 1245, status: 'Publicado', created: '2023-08-12' },
          { id: 2, title: 'Como Escolher os Melhores Materiais', views: 876, status: 'Publicado', created: '2023-07-28' },
          { id: 3, title: 'Inovações em Estruturas Metálicas', views: 0, status: 'Rascunho', created: '2023-09-01' },
        ]);
        
        // Dados de exemplo para depoimentos
        setTestimonials([
          { id: 1, client: 'Carlos Mendonça', project: 'Residencial Green View', rating: 5, status: 'Aprovado' },
          { id: 2, client: 'Fernanda Oliveira', project: 'Shopping Center Norte', rating: 4, status: 'Aprovado' },
          { id: 3, client: 'Ricardo Silva', project: 'Escola Técnica', rating: 5, status: 'Pendente' },
        ]);
        
        // Dados de exemplo para equipe
        setTeamMembers([
          { id: 1, name: 'Carlos Silva', position: 'Fundador & CEO', department: 'Diretoria' },
          { id: 2, name: 'Fernanda Oliveira', position: 'Diretora de Operações', department: 'Operações' },
          { id: 3, name: 'Ricardo Mendes', position: 'Diretor Financeiro', department: 'Financeiro' },
          { id: 4, name: 'Juliana Santos', position: 'Diretora de Engenharia', department: 'Engenharia' },
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    
    logout()
    navigate('/admin/login');
  };

  // Estatísticas do dashboard
  const stats = [
    { title: 'Serviços', value: services.length, change: '+2 recentes' },
    { title: 'Projetos', value: projects.length, change: '+5 em andamento' },
    { title: 'Artigos', value: blogPosts.length, change: '+3 novos' },
    { title: 'Depoimentos', value: testimonials.length, change: '+10 aprovados' }
  ];

  // Renderizar conteúdo baseado na aba ativa
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-medium text-gray-600">{stat.title}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    <span className="ml-2 text-sm text-green-500">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FiFileText className="text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-800"><strong>Você</strong> publicou um novo artigo no blog</p>
                    <p className="text-gray-500 text-sm">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FiStar className="text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-800"><strong>Carlos Silva</strong> enviou um novo depoimento</p>
                    <p className="text-gray-500 text-sm">Há 5 horas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <FiSettings className="text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-800"><strong>Você</strong> atualizou um serviço</p>
                    <p className="text-gray-500 text-sm">Ontem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Gerenciar Serviços</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                Adicionar Serviço
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criado em
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{service.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.status === 'Ativo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.created}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Editar
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Gerenciar Projetos</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                Adicionar Projeto
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-sm font-medium ${
                        project.status === 'Concluído' 
                          ? 'text-green-600' 
                          : 'text-yellow-600'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-500">{project.progress}% completo</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className={`h-2 rounded-full ${
                          project.status === 'Concluído' 
                            ? 'bg-green-500' 
                            : 'bg-primary'
                        }`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-900">
                        Editar
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-900">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Gerenciar Artigos do Blog</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                Novo Artigo
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
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
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'Publicado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.created}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Editar
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Gerenciar Depoimentos</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                Adicionar Depoimento
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{testimonial.client}</h3>
                      <p className="text-gray-600">{testimonial.project}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      testimonial.status === 'Aprovado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testimonial.status}
                    </span>
                    <div>
                      <button className="text-sm text-blue-600 hover:text-blue-900 mr-3">
                        Editar
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-900">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'team':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Gerenciar Equipe</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                Adicionar Membro
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow overflow-auto">
              <table className="min-w-full overflow-y-auto divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cargo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Departamento
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Editar
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`bg-gray-800 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">Painel Admin</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <nav className="mt-5">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${
              activeTab === 'dashboard' ? 'bg-gray-700' : ''
            }`}
          >
            <FiHome size={20} />
            {sidebarOpen && <span className="ml-4">Dashboard</span>}
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${
              activeTab === 'services' ? 'bg-gray-700' : ''
            }`}
          >
            <FiSettings size={20} />
            {sidebarOpen && <span className="ml-4">Serviços</span>}
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${
              activeTab === 'projects' ? 'bg-gray-700' : ''
            }`}
          >
            <FiGrid size={20} />
            {sidebarOpen && <span className="ml-4">Projetos</span>}
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${
              activeTab === 'blog' ? 'bg-gray-700' : ''
            }`}
          >
            <FiFileText size={20} />
            {sidebarOpen && <span className="ml-4">Blog</span>}
          </button>
          <button 
            onClick={() => setActiveTab('testimonials')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${
              activeTab === 'testimonials' ? 'bg-gray-700' : ''
            }`}
          >
            <FiStar size={20} />
            {sidebarOpen && <span className="ml-4">Depoimentos</span>}
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${
              activeTab === 'team' ? 'bg-gray-700' : ''
            }`}
          >
            <FiUsers size={20} />
            {sidebarOpen && <span className="ml-4">Equipe</span>}
          </button>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex justify-between items-center p-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Admin</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-red-600"
              >
                <FiLogOut size={20} />
                {sidebarOpen && <span className="ml-2">Sair</span>}
              </button>
            </div>
          </div>
        </header>

        {/* Conteúdo Dinâmico */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;