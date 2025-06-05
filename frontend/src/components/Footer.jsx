import React from 'react';
import { Link } from 'react-router';
import logo from "../assets/images/construmax_3.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import {FaXTwitter}  from "react-icons/fa6"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Coluna 1: Logo e Descrição */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logo}
                alt="Construmax Construções" 
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Há mais de 25 anos construindo sonhos e transformando realidades com excelência, segurança e inovação.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, url: '#' },
                { icon: FaXTwitter, url: '#' },
                { icon: FaInstagram, url: '#' },
                { icon: FaLinkedinIn, url: '#' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  className="bg-primary hover:bg-primary-dark text-white p-3 rounded-full transition-colors"
                  aria-label={`Siga-nos no ${social.icon.name}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Sobre Nós', path: '/about' },
                { name: 'Serviços', path: '/services' },
                { name: 'Projetos', path: '/projects' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contato', path: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Serviços */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Nossos Serviços</h3>
            <ul className="space-y-3">
              {[
                'Construção Civil',
                'Reformas e Renovações',
                'Construção Industrial',
                'Obras Públicas',
                'Projetos Personalizados',
                'Consultoria em Engenharia'
              ].map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato e Newsletter - CORRIGIDA */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">Contato</h3>
            <ul className="space-y-4 mb-6">
              {[
                { icon: FaMapMarkerAlt, text: 'Av. das Construções, 1234 - Centro, São Paulo/SP' },
                { icon: FaPhone, text: '(11) 99999-9999' },
                { icon: FaEnvelope, text: 'contato@construmax.com.br' }
              ].map((contact, index) => (
                <li key={index} className="flex items-start">
                  <contact.icon className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">{contact.text}</span>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Inscreva-se para receber novidades e promoções.
              </p>
              
              {/* Formulário corrigido */}
              <form className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 w-full"
                />
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors w-full"
                >
                  Inscrever
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Construmax Construções. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              {[
                { name: 'Política de Privacidade', path: '#' },
                { name: 'Termos de Uso', path: '#' },
                { name: 'Mapa do Site', path: '#' }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.path}
                  className="text-gray-500 hover:text-primary text-sm transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;