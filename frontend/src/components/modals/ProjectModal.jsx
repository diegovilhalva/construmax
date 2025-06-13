import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/Auth';

const ProjectModal = ({ open, onClose, onSave, project }) => {
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Em andamento');
    const [progress, setProgress] = useState(0);
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [area, setArea] = useState('');
    const [investment, setInvestment] = useState('');
    const [category, setCategory] = useState('');
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (project) {
            setTitle(project.title || '');
            setDescription(project.description || '');
            setStatus(project.status || 'Em andamento');
            setProgress(project.progress || 0);
            setLocation(project.location || '');
            setStartDate(project.start_date?.split('T')[0] || '');
            setEndDate(project.end_date?.split('T')[0] || '');
            setArea(project.area || '');
            setInvestment(project.investment || '');
            setCategory(project.category || '');
            setCompleted(!!project.completed);
            setImage(null); // resetar input de imagem (não reutilizável por segurança)
        } else {
            setTitle('');
            setDescription('');
            setStatus('Em andamento');
            setProgress(0);
            setLocation('');
            setImage(null);
            setStartDate('');
            setEndDate('');
            setArea('');
            setInvestment('');
            setCategory('');
            setCompleted(false);
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !location || !startDate || !endDate || !area || !investment || !category) {
            toast.error('Preencha todos os campos obrigatórios.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('status', status);
        formData.append('progress', progress);
        formData.append('location', location);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('area', area);
        formData.append('investment', investment);
        formData.append('category', category);
        formData.append('completed', completed ? '1' : '0');

        if (image) {
            formData.append('image', image);
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            let res;
            if (project) {
                formData.append('_method', 'PUT');
                res = await axios.post(`http://localhost:8000/api/projects/${project.id}`, formData, config);

            } else {
                res = await axios.post('http://localhost:8000/api/projects/create', formData, config);
            }

            toast.success(project ? 'Projeto atualizado com sucesso!' : 'Projeto criado com sucesso!');
            onSave(res.data);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar projeto.');
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{project ? 'Editar Projeto' : 'Adicionar Projeto'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Título */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Título *</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>

                    {/* Descrição */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Descrição *</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} />
                    </div>

                    {/* Localização */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Localização *</label>
                        <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Status *</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded px-3 py-2">
                            <option value="Em andamento">Em andamento</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Concluido">Concluído</option>
                        </select>
                    </div>

                    {/* Progresso */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Progresso (%) *</label>
                        <input type="number" min={0} max={100} value={progress} onChange={e => setProgress(Number(e.target.value))} className="w-full border rounded px-3 py-2" />
                    </div>

                    {/* Imagem */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Imagem</label>
                        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full" />
                        {image && (
                            <p className="mt-2 text-sm text-gray-600">Imagem selecionada: {image.name}</p>
                        )}
                    </div>

                    {/* Datas */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-1">Data de Início *</label>
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Data de Término *</label>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                    </div>

                    {/* Área e Investimento */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-1">Área (m²) *</label>
                            <input type="text" value={area} onChange={e => setArea(e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Investimento *</label>
                            <input type="text" value={investment} onChange={e => setInvestment(e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                    </div>

                    {/* Categoria */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Categoria *</label>
                        <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>

                    {/* Concluído */}
                    <div className="mb-4 flex items-center space-x-2">
                        <input type="checkbox" id="completed" checked={completed} onChange={e => setCompleted(e.target.checked)} />
                        <label htmlFor="completed" className="font-medium">Projeto concluído</label>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100" disabled={loading}>
                            Cancelar
                        </button>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectModal;