import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiLogOut, FiMenu, FiX, FiHome, FiSettings, FiUsers, FiFileText, FiStar, FiGrid } from 'react-icons/fi';
import { AuthContext } from '../context/Auth';
import DashboardHome from '../components/dashboard/DashboardHome';
import DashboardServices from '../components/dashboard/DashboardServices';
import DashboardProjects from '../components/dashboard/DashboardProjects';
import DashboardBlog from '../components/dashboard/DashboardBlog';
import DashboardTestimonials from '../components/dashboard/DashboardTestimonials';
import DashboardTeam from '../components/dashboard/DashboardTeam';
import Loading from '../components/Loading';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext)
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
        //await new Promise(resolve => setTimeout(resolve, 1000));

        const servicesReq = await axios.get("http://localhost:8000/api/services", {
          headers: {
            "Content-Type": "application/json", // Estava escrito errado como "aplication"
            "Authorization": `Bearer ${user.token}`
          }

        })

        setServices(servicesReq.data)

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
  const getRecentCount = (items, days = 7) => {
    const now = new Date();
    const pastDate = new Date(now);
    pastDate.setDate(now.getDate() - days);

    return items.filter(item => new Date(item.created_at) >= pastDate).length;
  };
  const serviceRecentCount = getRecentCount(services, 7);
  const stats = [
    { title: 'Serviços', value: services.length, change: `+${serviceRecentCount} recentes` },
    { title: 'Projetos', value: projects.length, change: '+5 em andamento' },
    { title: 'Artigos', value: blogPosts.length, change: '+3 novos' },
    { title: 'Depoimentos', value: testimonials.length, change: '+10 aprovados' }
  ];

  // Renderizar conteúdo baseado na aba ativa
  const renderContent = () => {
    if (loading) {
      return <Loading />
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome stats={stats} />


      case 'services':
        return <DashboardServices services={services} />
      case 'projects':
        return <DashboardProjects projects={projects} />

      case 'blog':
        return <DashboardBlog blogPosts={blogPosts} />
      case 'testimonials':
        return <DashboardTestimonials testimonials={testimonials} />

      case 'team':
        return <DashboardTeam teamMembers={teamMembers} />

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'
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
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${activeTab === 'dashboard' ? 'bg-gray-700' : ''
              }`}
          >
            <FiHome size={20} />
            {sidebarOpen && <span className="ml-4">Dashboard</span>}
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${activeTab === 'services' ? 'bg-gray-700' : ''
              }`}
          >
            <FiSettings size={20} />
            {sidebarOpen && <span className="ml-4">Serviços</span>}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${activeTab === 'projects' ? 'bg-gray-700' : ''
              }`}
          >
            <FiGrid size={20} />
            {sidebarOpen && <span className="ml-4">Projetos</span>}
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${activeTab === 'blog' ? 'bg-gray-700' : ''
              }`}
          >
            <FiFileText size={20} />
            {sidebarOpen && <span className="ml-4">Blog</span>}
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${activeTab === 'testimonials' ? 'bg-gray-700' : ''
              }`}
          >
            <FiStar size={20} />
            {sidebarOpen && <span className="ml-4">Depoimentos</span>}
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full text-left flex items-center p-4 hover:bg-gray-700 ${activeTab === 'team' ? 'bg-gray-700' : ''
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
              <h1 className="text-2xl font-bold text-gray-800 max-sm:hidden">Dashboard Administrativo</h1>
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
          <div className="transition-opacity duration-300 ease-in-out">{renderContent()}</div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;