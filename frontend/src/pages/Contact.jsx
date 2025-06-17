import React, { useState } from 'react';
import { Link } from 'react-router';
import contactHero from '../assets/images/contact-hero.jpg';
import officeImage from '../assets/images/office.jpg';

import member1 from "../assets/images/member-1.jpg"
import member2 from "../assets/images/pexels-pixabay-220453.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';
const Contact = () => {
    // Estados para o formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Informações de contato
    const contactInfo = [
        {
            title: 'Endereço',
            details: 'Av. das Construções, 1234 - Centro, São Paulo/SP, CEP 04578-000',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            title: 'Telefone',
            details: '(11) 3456-7890\n(11) 99999-9999',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            )
        },
        {
            title: 'Email',
            details: 'contato@construmax.com.br\ncomercial@construmax.com.br',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'Horário',
            details: 'Segunda a Sexta: 8h às 18h\nSábado: 9h às 13h',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    // Manipular mudanças no formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Enviar formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post(`http://localhost:8000/api/contact`, formData);

            if (response.status === 200) {
                setSubmitSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                });
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            toast.error('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="">
            {/* Hero Section */}
            <section className="relative bg-gray-900 py-24 md:py-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src={contactHero}
                        alt="Entre em Contato"
                        className="w-full h-full object-cover opacity-80"
                    />
                    {/*<div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary/30"></div>*/}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                        Fale <span className="text-primary">Conosco</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Estamos prontos para responder suas dúvidas, receber suas sugestões e orçar seu próximo projeto.
                    </p>
                </div>
            </section>

            {/* Formulário e Informações */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Formulário de Contato */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                Envie sua <span className="text-primary">Mensagem</span>
                            </h2>

                            {submitSuccess ? (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                                    <p className="font-bold">Mensagem enviada com sucesso!</p>
                                    <p>Entraremos em contato o mais breve possível.</p>
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                        placeholder="Seu nome completo"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                            placeholder="seu.email@exemplo.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Telefone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Assunto
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                    >
                                        <option value="">Selecione um assunto</option>
                                        <option value="orcamento">Solicitar Orçamento</option>
                                        <option value="duvida">Dúvida sobre Serviços</option>
                                        <option value="trabalhe-conosco">Trabalhe Conosco</option>
                                        <option value="parceria">Proposta de Parceria</option>
                                        <option value="outro">Outro Assunto</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mensagem
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                        placeholder="Descreva sua necessidade ou dúvida..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                </button>
                            </form>
                        </div>

                        {/* Informações de Contato */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                Nossos <span className="text-primary">Contatos</span>
                            </h2>

                            <div className="bg-gray-50 rounded-xl shadow-lg p-6 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {contactInfo.map((item, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                                                <p className="text-gray-700 whitespace-pre-line text-sm">{item.details}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    title="Localização Construmax"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.097682376029!2d-46.65390548502199!3d-23.5653464674753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1641826586952!5m2!1spt-BR!2sbr"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    className="rounded-lg"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Equipe Comercial */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Nossa <span className="text-primary">Equipe Comercial</span>
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Conheça os profissionais que estarão disponíveis para atendê-lo
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                                <div className="md:col-span-1 flex justify-center">
                                    <img src={member2} className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 object-cover" />
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Carlos Mendes</h3>
                                    <p className="text-primary font-semibold mb-3">Gerente Comercial e </p>
                                    <p className="text-gray-600 mb-4">
                                        Especialista em projetos residenciais e comerciais, com mais de 15 anos de experiência na área.
                                    </p>
                                    <div className="flex items-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>(11) 91234-5678</span>
                                    </div>
                                    <div className="flex items-center text-gray-700 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>carlos.mendes@construmax.com.br</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                                <div className="md:col-span-1 flex justify-center">
                                    <img src={member1} className="bg-gray-200 border-2 border-dashed object-cover rounded-xl w-32 h-32" />
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Fernanda Oliveira</h3>
                                    <p className="text-primary font-semibold mb-3">Executiva de Contas</p>
                                    <p className="text-gray-600 mb-4">
                                        Especialista em projetos industriais e obras públicas, com foco em soluções sustentáveis.
                                    </p>
                                    <div className="flex items-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>(11) 99876-5432</span>
                                    </div>
                                    <div className="flex items-center text-gray-700 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>fernanda.oliveira@construmax.com.br</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visite Nossa Sede */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Visite Nossa <span className="text-primary">Sede</span>
                            </h2>
                            <p className="text-gray-700 mb-6 text-lg">
                                Estamos localizados em um moderno escritório na região central de São Paulo, onde você pode agendar uma reunião para discutir seu projeto em detalhes.
                            </p>
                            <p className="text-gray-700 mb-8 text-lg">
                                Nossa equipe está pronta para recebê-lo e apresentar cases de sucesso, materiais utilizados em nossas obras e soluções personalizadas para sua necessidade.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Endereço:</h3>
                                        <p className="text-gray-700">
                                            Av. das Construções, 1234  <br />
                                            Centro, São Paulo/SP<br />
                                            CEP 04578-000
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Horário de Visitas:</h3>
                                        <p className="text-gray-700">
                                            Segunda a Sexta: 9h às 17h<br />
                                            (Agendamento prévio necessário)
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        to="/agendamento"
                                        className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center text-lg"
                                    >
                                        Agendar Visita
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="CurrentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src={officeImage}
                                alt="Sede Construmax"
                                className="bg-gray-200 object-cover border-2 border-dashed rounded-xl w-full h-96"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Pronto para iniciar seu projeto?
                    </h2>
                    <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                        Entre em contato agora mesmo e solicite um orçamento personalizado.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="tel:+551134567890"
                            className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
                        >
                            Ligar Agora
                        </a>
                        <Link
                            to="/contato"
                            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg hover:bg-white/10"
                        >
                            Enviar Mensagem
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;