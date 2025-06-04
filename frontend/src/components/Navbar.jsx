import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router';
import logo from '../assets/images/construmax_3.png';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Fechar menu ao mudar de rota
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Efeito para mudar navbar no scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sobre', path: '/about' },
        { name: 'Serviços', path: '/services' },
        { name: 'Projetos', path: '/projects' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contato', path: '/contact' },
    ];

    // Função para estilização dos links
    const navLinkStyle = (isActive, isMobile = false) => {
        const baseStyles = isMobile
            ? 'block px-3 py-2 rounded-md   text-base font-medium'
            : 'px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors duration-300';

        if (isActive) {
            return `${baseStyles}  text-primary font-bold`;
        }

        return scrolled
            ? `${baseStyles} text-gray-800 hover:text-primary`
            : `${baseStyles}  max-lg:text-black text-gray-600 hover:text-primary`;
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4 lg:bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo - Contêiner flexível */}
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="flex items-center">
                            {/* Contêiner para controlar o tamanho */}
                         
                                <img
                                    src={logo}
                                    alt="Construmax Construções"
                                    className="w-auto h-14 max-h-full object-contain"
                                />
                            
                        </NavLink>
                    </div>

                    {/* Links desktop - Centralizados */}
                    <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
                        <div className="flex space-x-1 lg:space-x-3">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => navLinkStyle(isActive)}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Botão Contato Desktop */}
                    <div className="hidden md:block">
                        <NavLink
                            to="/contact"
                            className="ml-4 bg-primary text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-primary-dark transition duration-300"
                        >
                            Orçamento
                        </NavLink>
                    </div>

                    {/* Menu Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${
                                scrolled 
                                    ? 'text-gray-800 hover:text-primary' 
                                    : 'text-gray-800 hover:text-primary'
                            } focus:outline-none`}
                        >
                            {isOpen ? (
                                <FaTimes className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <FaBars className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => navLinkStyle(isActive, true)}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/contact"
                        className="block mt-2 w-full text-center bg-primary text-white px-5 py-2 rounded-md text-base font-bold hover:bg-primary-dark transition duration-300"
                        onClick={() => setIsOpen(false)}
                    >
                        Orçamento
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;