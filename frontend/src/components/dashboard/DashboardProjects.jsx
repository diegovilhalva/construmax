import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/Auth';
import { toast } from 'react-toastify';
import ProjectModal from '../modals/ProjectModal';
import Loading from '../Loading';

const DashboardProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/projects', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProjects(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar projetos.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Deseja realmente excluir este projeto?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Projeto excluído com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir projeto.');
    }
  };

  const handleSave = (savedProject) => {
    if (editingProject) {
      // Atualiza projeto na lista
      setProjects(prev =>
        prev.map(p => (p.id === savedProject.id ? savedProject : p))
      );
    } else {
      // Adiciona novo projeto
      setProjects(prev => [...prev, savedProject]);
    }
    setModalOpen(false);
  };

  if (loading) return <Loading />;
  console.log(projects)
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gerenciar Projetos</h2>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          Adicionar Projeto
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Nenhum projeto cadastrado.</p>
      ) : (
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
                  Início
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map(project => (
                <tr key={project.id}>
                  <td className="px-6 py-4">{project.title}</td>
                  <td className="px-6 py-4 capitalize">{project.status}</td>
                  <td className="px-6 py-4">{project.start_date?.split('T')[0]}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-500 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-500 hover:underline"
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
      <ProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        project={editingProject}
      />
    </div>
  )
}
export default DashboardProjects