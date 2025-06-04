import React from 'react';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  isAdmin = false,
  title
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-16 px-4">
        {isAdmin && (
          <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-lg mb-6 text-center">
            <span className="font-semibold">Área Administrativa</span>
          </div>
        )}
        
        {title && (
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h1>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default PageLayout;