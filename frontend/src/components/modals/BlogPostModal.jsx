import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { AuthContext } from '../../context/Auth';

const BlogPostModal = ({ onClose, onSave, selectedPost, teamMembers }) => {
  const { user } = useContext(AuthContext);
  const editor = useRef(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    cover_image: null,
    team_member_id: '',
    status: 'draft',
    category: 'Geral', // Campo adicionado
  });

  const [loading, setLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setForm({
        title: selectedPost.title || '',
        slug: selectedPost.slug || '',
        content: selectedPost.content || '',
        cover_image: selectedPost.cover_image || null,
        team_member_id: selectedPost.team_member_id || '',
        status: selectedPost.status || 'draft',
        category: selectedPost.category || 'Geral', // Campo adicionado
      });
      setSlugManuallyEdited(true);
    } else {
      setForm({
        title: '',
        slug: '',
        content: '',
        cover_image: null,
        team_member_id: '',
        status: 'draft',
        category: 'Geral', // Campo adicionado
      });
      setSlugManuallyEdited(false);
    }
  }, [selectedPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm(prev => ({
      ...prev,
      title,
      slug: slugManuallyEdited ? prev.slug : generateSlug(title),
    }));
  };

  const handleSlugChange = (e) => {
    setForm(prev => ({ ...prev, slug: e.target.value }));
    setSlugManuallyEdited(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setForm(prev => ({ ...prev, cover_image: e.target.files[0] }));
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Campo categoria adicionado à validação
    if (!form.title || !form.content || !form.team_member_id || !form.category) {
      toast.error('Preencha todos os campos obrigatórios: Título, Conteúdo, Autor e Categoria.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('content', form.content);
    formData.append('status', form.status);
    formData.append('team_member_id', form.team_member_id);
    formData.append('category', form.category); // Campo adicionado

    if (form.cover_image && form.cover_image instanceof File) {
      formData.append('cover_image', form.cover_image);
    } else if (typeof form.cover_image === 'string') {
      formData.append('cover_image_url', form.cover_image);
    }

    try {
      let response;
      if (selectedPost) {
        formData.append('_method', 'PUT');
        response = await axios.post(
          `http://localhost:8000/api/blog-posts/${selectedPost.id}`,
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
          'http://localhost:8000/api/blog-posts/create',
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
      toast.success('Post salvo com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao salvar post:', error);

      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        let errorMessage = 'Erros de validação:';

        for (const field in errors) {
          errorMessage += `\n${field}: ${errors[field].join(', ')}`;
        }

        toast.error(errorMessage);
      } else {
        toast.error(error.response?.data?.message || 'Erro ao salvar post');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {selectedPost ? 'Editar Post' : 'Novo Post'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Título */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Título *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleTitleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Slug *</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleSlugChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Editor de Conteúdo */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Conteúdo *</label>
            <JoditEditor
              ref={editor}
              value={form.content}
              config={{
                readonly: false,
                height: 300,
              }}
              tabIndex={1}
              onBlur={(newContent) =>
                setForm(prev => ({ ...prev, content: newContent }))
              }
              onChange={() => {}}
            />
          </div>

          {/* Imagem de Capa */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Imagem de Capa</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {form.cover_image && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                {typeof form.cover_image === 'string' ? (
                  <img
                    src={form.cover_image}
                    alt="Preview"
                    className="w-24 h-24 mt-2 rounded object-cover"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(form.cover_image)}
                    alt="Preview"
                    className="w-24 h-24 mt-2 rounded object-cover"
                  />
                )}
              </div>
            )}
          </div>

          {/* Categoria - Campo adicionado */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Categoria *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="Geral">Geral</option>
              <option value="Construção Civil">Construção Civil</option>
              <option value="Arquitetura">Arquitetura</option>
              <option value="Engenharia">Engenharia</option>
              <option value="Sustentabilidade">Sustentabilidade</option>
              <option value="Tecnologia">Tecnologia</option>
               <option value="Reformas">Reformas</option>
            </select>
          </div>

          {/* Autor */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Autor *</label>
            <select
              name="team_member_id"
              value={form.team_member_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Selecione um autor</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.position}
                </option>
              ))}
            </select>
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
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
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

export default BlogPostModal;