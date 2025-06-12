import React, { useState, useEffect, useContext } from 'react';
import ServiceModal from '../modals/ServiceModal'
import Loading from '../Loading';
import axios from 'axios';
import { AuthContext } from '../../context/Auth';
import { toast } from 'react-toastify';

const DashboardServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const { user } = useContext(AuthContext)

  // Pega os serviços do backend na montagem do componente
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/services", {
        headers: {
          "Content-Type": "application/json", // Estava escrito errado como "aplication"
          "Authorization": `Bearer ${user.token}`
        }

      })

      console.log(res.data)
      setServices(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Deseja realmente excluir este serviço?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/services/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });

      setServices((prev) => prev.filter((service) => service.id !== id));
      toast.success("Serviço excluído com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir serviço.");
    }
  };

  const handleSave = async (serviceData) => {
    try {
      if (editingService) {
        // Editar
        const res = await fetch(`/api/services/${serviceData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceData),
        });
        if (!res.ok) throw new Error('Erro ao atualizar serviço');
        const updatedService = await res.json();
        setServices((prev) =>
          prev.map((s) => (s.id === updatedService.id ? updatedService : s))
        );
      } else {
        // Criar
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceData),
        });
        if (!res.ok) throw new Error('Erro ao criar serviço');
        const newService = await res.json();
        setServices((prev) => [...prev, newService]);
      }
      setModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return <Loading />

  if (services.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 mt-10">Nenhum serviço cadastrado.</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleAdd}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
          >
            Adicionar Serviço
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gerenciar Serviços</h2>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
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
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {service ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(service.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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

      <ServiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        service={editingService}
      />
    </div>
  );
};

export default DashboardServices;
