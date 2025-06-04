import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router';

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
        { name: 'Contato', path: '/contacto' },
    ];

    // Função para estilização dos links
    const navLinkStyle = (isActive, isMobile = false) => {
        const baseStyles = isMobile
            ? 'block px-3 text-black py-2 rounded-md text-base font-medium'
            : 'px-3 py-2 text-black rounded-md text-sm lg:text-base font-medium transition-colors duration-300';

        if (isActive) {
            return `${baseStyles} text-primary text-primary-300 font-bold`;
        }

        return scrolled
            ? `${baseStyles} text-gray-800 hover:text-primary`
            : `${baseStyles} text-black hover:text-primary`;
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 lg:border-b ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/">
                            <img
                                src="/construmax_3.png"
                                alt="Construmax Construções"
                                className="block max-h-16 max-w-[180px] object-contain"
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
                            to="/contato"
                            className="ml-4 bg-primary text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-primary-dark transition duration-300"
                        >
                            Orçamento
                        </NavLink>
                    </div>

                    {/* Menu Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${scrolled
                                ? 'text-gray-800'
                                : 'text-black'
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
            <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
                        to="/contato"
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