import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TeamMemberModal from '../modals/TeamMemberModal';
import Loading from '../Loading';
import { AuthContext } from '../../context/Auth';

const DashboardTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/team-members', {
        headers: {
          "Content-Type":"application/json"
        },
      });
      setTeamMembers(res.data);
    } catch (error) {
      console.error('Erro ao carregar membros da equipe:', error);
      toast.error('Erro ao carregar membros da equipe');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedMember(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Deseja realmente excluir este membro?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/team-members/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTeamMembers(prev => prev.filter(m => m.id !== id));
      toast.success('Membro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir membro:', error);
      toast.error('Erro ao excluir membro');
    }
  };

  const handleSave = (savedMember) => {
    if (selectedMember) {
      setTeamMembers(prev => 
        prev.map(m => m.id === savedMember.id ? savedMember : m)
      );
    } else {
      setTeamMembers(prev => [...prev, savedMember]);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gerenciar Equipe</h2>
        <button
          onClick={handleCreate}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          Adicionar Membro
        </button>
      </div>

      {teamMembers.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Nenhum membro da equipe cadastrado.</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
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
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      )}
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
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
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
        <TeamMemberModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          selectedMember={selectedMember}
        />
      )}
    </div>
  );
};

export default DashboardTeam;