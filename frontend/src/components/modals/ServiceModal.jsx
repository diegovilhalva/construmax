import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/Auth';
import imageCompression from 'browser-image-compression'
const ServiceModal = ({ open, onClose, onSave, service }) => {
    const { user } = useContext(AuthContext)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [detailedDescription, setDetailedDescription] = useState('');
    const [features, setFeatures] = useState(['']);
    const [process, setProcess] = useState([{ step: 1, title: '', description: '' }]);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (service) {
            setTitle(service.title || '');
            setDescription(service.description || '');
            setDetailedDescription(service.detailed_description || '');
            setFeatures(service.features?.map(f => f.feature) || ['']);
            setProcess(service.processSteps || [{ step: 1, title: '', description: '' }]);
            setImageFile(null);
        } else {
            setTitle('');
            setDescription('');
            setDetailedDescription('');
            setFeatures(['']);
            setProcess([{ step: 1, title: '', description: '' }]);
            setImageFile(null);
        }
    }, [service]);

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const addFeature = () => setFeatures([...features, '']);
    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures.length ? newFeatures : ['']);
    };

    const handleProcessChange = (index, field, value) => {
        const newProcess = [...process];
        newProcess[index][field] = value;
        setProcess(newProcess);
    };

    const addProcessStep = () => {
        setProcess([...process, { step: process.length + 1, title: '', description: '' }]);
    };

    const removeProcessStep = (index) => {
        const newProcess = process.filter((_, i) => i !== index);
        const adjustedProcess = newProcess.map((p, idx) => ({ ...p, step: idx + 1 }));
        setProcess(adjustedProcess.length ? adjustedProcess : [{ step: 1, title: '', description: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            toast.error('Título e descrição são obrigatórios.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        if (detailedDescription) {
            formData.append('detailed_description', detailedDescription);
        }

        features.filter(f => f.trim()).forEach((f, idx) => {
            formData.append(`features[${idx}]`, f.trim());
        });

        process.filter(p => p.title.trim() && p.description.trim()).forEach((step, idx) => {
            formData.append(`process[${idx}][step]`, step.step);
            formData.append(`process[${idx}][title]`, step.title);
            formData.append(`process[${idx}][description]`, step.description);
        });

        if (imageFile) {
            // Comprimir imagem antes de enviar
            try {
                const compressedFile = await compressImage(imageFile);
                formData.append('image', compressedFile);
            } catch (error) {
                console.error('Erro na compressão:', error);
                formData.append('image', imageFile);
            }
        }

        try {
            const res = await axios.post('http://localhost:8000/api/services/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.token}`
                },
                timeout: 180000, // 3 minutos timeout
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload: ${percentCompleted}%`);
                    // Atualizar UI com progresso se necessário
                }
            });

            toast.success('Serviço cadastrado com sucesso!');
            onSave(res.data);
            onClose();
        } catch (error) {
            console.error('Erro completo:', error);

            if (error.code === 'ECONNABORTED') {
                toast.error('Tempo de conexão excedido. Tente uma imagem menor.');
            } else if (error.response?.status === 413) {
                toast.error('Arquivo muito grande. Tente uma imagem menor.');
            } else if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                let errorMessage = 'Erros de validação:';

                for (const field in errors) {
                    errorMessage += `\n${field}: ${errors[field].join(', ')}`;
                }

                toast.error(errorMessage);
            } else {
                toast.error('Erro ao salvar serviço: ' + (error.message || 'Tente novamente mais tarde'));
            }
        }
    };

    // Função para comprimir imagens
    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 2,          // Tamanho máximo em MB
            maxWidthOrHeight: 1920, // Resolução máxima
            useWebWorker: true,
            fileType: 'image/webp'  // Converter para WebP para melhor compressão
        };

        try {
            const compressedFile = await imageCompression(file, options);
            console.log('Imagem comprimida:',
                `Original: ${(file.size / 1024 / 1024).toFixed(2)}MB ->`,
                `Comprimida: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`
            );
            return compressedFile;
        } catch (error) {
            console.error('Erro na compressão:', error);
            return file;
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{service ? 'Editar Serviço' : 'Adicionar Serviço'}</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Título *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Descrição *</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Descrição detalhada</label>
                        <textarea
                            value={detailedDescription}
                            onChange={e => setDetailedDescription(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            rows={5}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Features</label>
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center mb-2 space-x-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={e => handleFeatureChange(idx, e.target.value)}
                                    className="flex-grow border rounded px-3 py-2"
                                    placeholder="Feature"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFeature(idx)}
                                    className="text-red-600 hover:text-red-800 font-bold"
                                    aria-label="Remover feature"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFeature}
                            className="text-primary font-semibold"
                        >
                            + Adicionar feature
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Processo (steps)</label>
                        {process.map((step, idx) => (
                            <div key={idx} className="mb-3 border rounded p-3 relative">
                                <div className="flex justify-between items-center mb-2">
                                    <strong>Step {step.step}</strong>
                                    <button
                                        type="button"
                                        onClick={() => removeProcessStep(idx)}
                                        className="text-red-600 hover:text-red-800 font-bold"
                                        aria-label="Remover step"
                                    >
                                        &times;
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Título"
                                    value={step.title}
                                    onChange={e => handleProcessChange(idx, 'title', e.target.value)}
                                    className="w-full border rounded px-3 py-2 mb-2"
                                    required
                                />
                                <textarea
                                    placeholder="Descrição"
                                    value={step.description}
                                    onChange={e => handleProcessChange(idx, 'description', e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    rows={2}
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addProcessStep}
                            className="text-primary font-semibold"
                        >
                            + Adicionar step
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Imagem</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setImageFile(e.target.files[0])}
                            className="border rounded px-3 py-2"
                        />
                        {imageFile && (
                            <p className="mt-2 text-sm text-gray-600">Imagem selecionada: {imageFile.name}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceModal;
