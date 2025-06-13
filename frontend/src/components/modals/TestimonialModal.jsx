import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/Auth';

const TestimonialModal = ({ onClose, onSave, selectedTestimonial }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    company: '',
    content: '',
    rating: 5,
    image: null,
    status: 'Pendente'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTestimonial) {
      setForm({
        name: selectedTestimonial.name || '',
        company: selectedTestimonial.company || '',
        content: selectedTestimonial.content || '',
        rating: selectedTestimonial.rating || 5,
        image: selectedTestimonial.image || null,
        status: selectedTestimonial.status || 'pendente'
      });
    } else {
      setForm({
        name: '',
        company: '',
        content: '',
        rating: 5,
        image: null,
        status: 'pendente'
      });
    }
  }, [selectedTestimonial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setForm(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleRatingChange = (rating) => {
    setForm(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.company || !form.content) {
      toast.error('Preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('company', form.company);
    formData.append('content', form.content);
    formData.append('rating', form.rating);
    formData.append('status', form.status);
    
    if (form.image && form.image instanceof File) {
      formData.append('image', form.image);
    }

    try {
      let response;
      if (selectedTestimonial) {
        formData.append('_method', 'PUT');
        response = await axios.post(
          `http://localhost:8000/api/testimonials/${selectedTestimonial.id}`,
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
          'http://localhost:8000/api/testimonials/create',
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
      toast.success('Depoimento salvo com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao salvar depoimento:', error);
      
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        let errorMessage = 'Erros de validação:';
        
        for (const field in errors) {
          errorMessage += `\n${field}: ${errors[field].join(', ')}`;
        }
        
        toast.error(errorMessage);
      } else {
        toast.error(error.response?.data?.message || 'Erro ao salvar depoimento');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {selectedTestimonial ? 'Editar Depoimento' : 'Adicionar Depoimento'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Nome do Cliente *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          {/* Empresa/Projeto */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Empresa / Projeto *</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          {/* Conteúdo */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Depoimento *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={4}
              required
            />
          </div>
          
          {/* Avaliação */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Avaliação *</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="text-2xl mr-1 focus:outline-none"
                >
                  {star <= form.rating ? '★' : '☆'}
                </button>
              ))}
              <span className="ml-2 text-gray-600">{form.rating}/5</span>
            </div>
          </div>
          
          {/* Imagem */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Imagem do Cliente</label>
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
          
          {/* Status */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
            </select>
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

export default TestimonialModal;