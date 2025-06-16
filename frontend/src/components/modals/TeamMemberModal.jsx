import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/Auth';

const TeamMemberModal = ({ onClose, onSave, selectedMember }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    position: '',
    department: '',
    bio: '',
    linkedin: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMember) {
      setForm({
        name: selectedMember.name || '',
        position: selectedMember.position || '',
        department: selectedMember.department || '',
        bio: selectedMember.bio || '',
        linkedin: selectedMember.linkedin || '',
        image: selectedMember.image || null,
      });
    } else {
      setForm({
        name: '',
        position: '',
        department: '',
        bio: '',
        linkedin: '',
        image: null,
      });
    }
  }, [selectedMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setForm(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.position || !form.bio) {
      toast.error('Preencha todos os campos obrigatórios: Nome, Cargo e Bio.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('position', form.position);
    formData.append('department', form.department);
    formData.append('bio', form.bio);
    formData.append('linkedin', form.linkedin);
    
    if (form.image && form.image instanceof File) {
      formData.append('image', form.image);
    }

    try {
      let response;
      if (selectedMember) {
        formData.append('_method', 'PUT');
        response = await axios.post(
          `http://localhost:8000/api/team-members/${selectedMember.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        response = await axios.post(
          'http://localhost:8000/api/team-members/create',
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      onSave(response.data);
      toast.success('Membro salvo com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao salvar membro:', error);
      
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        let errorMessage = 'Erros de validação:';
        
        for (const field in errors) {
          errorMessage += `\n${field}: ${errors[field].join(', ')}`;
        }
        
        toast.error(errorMessage);
      } else {
        toast.error(error.response?.data?.message || 'Erro ao salvar membro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {selectedMember ? 'Editar Membro da Equipe' : 'Adicionar Membro da Equipe'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Nome *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          {/* Cargo */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Cargo *</label>
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          {/* Departamento */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Departamento</label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          
          {/* Bio */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Bio *</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={4}
              required
            />
          </div>
          
          {/* LinkedIn */}
          <div className="mb-4">
            <label className="block font-medium mb-1">LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          {/* Imagem */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {form.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                {typeof form.image === 'string' ? (
                  <img 
                    src={form.image} 
                    alt="Preview" 
                    className="w-24 h-24 mt-2 rounded object-cover"
                  />
                ) : (
                  <img 
                    src={URL.createObjectURL(form.image)} 
                    alt="Preview" 
                    className="w-24 h-24 mt-2 rounded object-cover"
                  />
                )}
              </div>
            )}
          </div>
          
          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberModal;