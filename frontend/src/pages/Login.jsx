import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router';
import loginHero from '../assets/images/login-hero.jpg';
import axios from "axios"
import { AuthContext } from '../context/Auth';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, user } = useContext(AuthContext)
    useEffect(() => {
        if (user) {
           console.log(user)
           navigate("/admin/dashboard")
        }
    }, [user])

    const onSubmit = async (data) => {
        setError('');
        setIsLoading(true);


        try {

            const res = await axios.post("http://localhost:8000/api/authenticate", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            if (res.data.status) {
                const userInfo = {
                    id: res.data.user.id,
                    token: res.data.token
                }

                login(userInfo)
                navigate('/admin/dashboard');
            } else {
                setError('Credenciais inválidas. Por favor, tente novamente.');
            }

        } catch (err) {
            console.log(err)
            if (err.response && err.response.status === 401) {
                setError(err.response.data.message)
            } else {
                setError('Ocorreu um erro durante o login. Tente novamente mais tarde.');
            }
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setError("")
            }, 10000)
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Imagem Lateral */}
            <div className="hidden md:block md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary/50 z-10"></div>
                <img
                    src={loginHero}
                    alt="Painel Administrativo"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-10 left-10 z-20 text-white">
                    <h2 className="text-3xl font-bold mb-4">Sistema Administrativo Construmax</h2>
                    <p className="text-lg max-w-md">
                        Gerencie projetos, clientes e todo o conteúdo do site de forma centralizada e segura.
                    </p>
                </div>
            </div>

            {/* Formulário de Login */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Acesso Administrativo</h1>
                        <p className="text-gray-600">Entre com suas credenciais para acessar o painel</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Administrativo
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                {
                                ...register('email', {
                                    required: "O email é obrigatório",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Formato de email inválido"
                                    }
                                })
                                }

                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="seu.email@construmax.com.br"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Senha
                                </label>
                                <Link to="/recuperar-senha" className="text-sm text-primary hover:text-primary-dark">
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"

                                {
                                ...register('password', {
                                    required: "A senha é obrigatória",
                                    minLength: {
                                        value: 6,
                                        message: "A senha deve ter pelo  menos 6 caracteres"
                                    },

                                })
                                }

                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Manter conectado
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex justify-center items-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Autenticando...
                                    </>
                                ) : (
                                    'Acessar Painel'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                © {new Date().getFullYear()} Construmax • Todos os direitos reservados
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Acesso restrito ao pessoal autorizado
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;