import { HandHelping, Heart, LogIn, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-[500]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Marketplace Solidário</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <MapPin className="h-5 w-5 mr-1" />
              <span>Mapa</span>
            </Link>
            <Link to="/register-donation" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <HandHelping className="h-5 w-5 mr-1" />
              <span>Quero Ajudar</span>
            </Link>
            <Link to="/donation-list" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Heart className="h-5 w-5 mr-1" />
              <span>Preciso de Ajuda</span>
            </Link>
            <Link to="/admin" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <LogIn className="h-5 w-5 mr-1" />
              <span>Admin</span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg z-[9998]">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Mapa</span>
              </div>
            </Link>
            <Link
              to="/register-donation"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <HandHelping className="h-5 w-5 mr-2" />
                <span>Quero Ajudar</span>
              </div>
            </Link>
            <Link
              to="/donation-list"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                <span>Preciso de Ajuda</span>
              </div>
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <LogIn className="h-5 w-5 mr-2" />
                <span>Admin</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
