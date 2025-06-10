

const DashboardTestimonials = ({ testimonials }) => {
    if (testimonials.length === 0) {
        return (
             <p className="text-center text-gray-500 mt-10">Nenhum depoimento cadastrado.</p>
        )
    }
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Gerenciar Depoimentos</h2>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                    Adicionar Depoimento
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-xl shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{testimonial.client}</h3>
                                <p className="text-gray-600">{testimonial.project}</p>
                            </div>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${testimonial.status === 'Aprovado'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {testimonial.status}
                            </span>
                            <div>
                                <button className="text-sm text-blue-600 hover:text-blue-900 mr-3">
                                    Editar
                                </button>
                                <button className="text-sm text-red-600 hover:text-red-900">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardTestimonials