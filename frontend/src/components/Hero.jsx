import React, { useEffect } from 'react';
import heroImage from '../assets/images/hero.jpg';
import hero2Image from '../assets/images/hero2.jpg';

const Hero = () => {
    useEffect(() => {
        const slider = () => {
            const slide1 = document.querySelector('img[alt="Construmax - Construções de Alto Padrão"]');
            const slide2 = document.getElementById('hero-slide-2');

            if (!slide1 || !slide2) return;

            let activeSlide = slide1;

            setInterval(() => {
                if (activeSlide === slide1) {
                    slide1.style.opacity = '0';
                    slide2.style.opacity = '100';
                    activeSlide = slide2;
                } else {
                    slide1.style.opacity = '100';
                    slide2.style.opacity = '0';
                    activeSlide = slide1;
                }
            }, 10000); 
        };

        slider();
    }, []);
    return (
        <section className="relative overflow-hidden">
            {/* Imagem de fundo com overlay e slider */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

                {/* Slider de imagens */}
                <div className="relative w-full h-full">
                    <img
                        src={heroImage}
                        alt="Construmax - Construções de Alto Padrão"
                        className="w-full h-full object-cover absolute inset-0 opacity-100 transition-opacity duration-1000"
                    />
                    <img
                        src={hero2Image}
                        alt="Construmax - Projetos de Excelência"
                        className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-1000"
                        id="hero-slide-2"
                    />
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Texto principal */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                            Construindo <span className="text-primary">Sonhos</span>, Criando <span className="text-secondary">Realidades</span>
                        </h1>

                        <p className="text-xl text-white mb-8 max-w-2xl mx-auto lg:mx-0">
                            Construtora especializada em obras de alto padrão com qualidade, segurança e inovação. Transformamos sua visão em estruturas sólidas e duradouras.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <a
                                href="/projects"
                                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Ver Projetos
                            </a>
                            <a
                                href="/contact"
                                className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg border-2 border-transparent hover:border-primary"
                            >
                                Solicitar Orçamento
                            </a>
                        </div>
                    </div>

                    {/* Destaques da empresa com ícones */}
                    <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                        {[
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                ),
                                value: '25+',
                                label: 'Anos de experiência'
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                ),
                                value: '500+',
                                label: 'Projetos concluídos'
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                value: '98%',
                                label: 'Satisfação de clientes'
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                ),
                                value: '50+',
                                label: 'Prêmios conquistados'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                            >
                                <div className="flex flex-col items-center">
                                    {item.icon}
                                    <div className="text-2xl font-bold text-primary mt-2">{item.value}</div>
                                    <div className="text-white text-sm mt-1 text-center">{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Elemento decorativo */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>

            {/* Animação de scroll */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <a href="#about" className="block">
                    <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </a>
            </div>
        </section>
    )
}

export default Hero;