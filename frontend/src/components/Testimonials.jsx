import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import Loading from '../components/Loading'; // Importe seu componente de loading

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/testimonials");
        setTestimonials(res.data);
      } catch (error) {
        console.error("Erro ao buscar depoimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Função para renderizar estrelas de classificação
  const renderStars = (rating) => {
    if (!rating) return null;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  // Navegação para o depoimento anterior
  const goToPrevious = () => {
    setIsAutoPlaying(false);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Navegação para o próximo depoimento
  const goToNext = () => {
    setIsAutoPlaying(false);
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Navegação para um slide específico
  const goToSlide = (slideIndex) => {
    setIsAutoPlaying(false);
    setCurrentIndex(slideIndex);
  };

  // Auto-play do slider
  useEffect(() => {
    let interval;
    if (isAutoPlaying && testimonials.length > 0) {
      interval = setInterval(() => {
        goToNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, testimonials]);

  if (loading) {
    return <Loading />;
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Nenhum depoimento encontrado.</p>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="grid grid-cols-5 gap-8">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Satisfação Garantida
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O que Nossos <span className="text-primary">Clientes Dizem</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Confira depoimentos reais de quem já construiu com a Construmax
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Depoimento atual */}
          <div
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-500 ease-in-out transform"
            key={currentTestimonial.id}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-6">
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name} 
                  className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 md:w-24 md:h-24 object-cover"
                />
              </div>
              <div>
                <div className="flex mb-4">
                  {renderStars(currentTestimonial.rating)}
                </div>
                <FaQuoteLeft className="text-primary text-3xl mb-4 opacity-30" />
                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                  "{currentTestimonial.content}"
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{currentTestimonial.name}</p>
                  <p className="text-gray-600">{currentTestimonial.company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navegação */}
          <div className="flex justify-center mt-12">
            <button
              onClick={goToPrevious}
              className="bg-white rounded-full p-3 shadow-md mr-4 hover:bg-primary hover:text-white transition-colors"
              aria-label="Depoimento anterior"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center">
              {testimonials.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`mx-1 w-3 h-3 rounded-full transition-all ${currentIndex === slideIndex ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                  aria-label={`Ir para depoimento ${slideIndex + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="bg-white rounded-full p-3 shadow-md ml-4 hover:bg-primary hover:text-white transition-colors"
              aria-label="Próximo depoimento"
            >
              <FaChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Depoimentos adicionais (visualização em desktop) */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mt-12">
            {testimonials
              .filter((_, idx) => idx !== currentIndex)
              .slice(0, 3)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
                >
                  <div className="flex mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3 object-cover" 
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-flex items-center"
          >
            {isAutoPlaying ? 'Pausar Depoimentos' : 'Continuar Depoimentos'}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 ${isAutoPlaying ? 'hidden' : 'block'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 ${isAutoPlaying ? 'block' : 'hidden'}`} viewBox="0 0 20 20" fill="CurrentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;