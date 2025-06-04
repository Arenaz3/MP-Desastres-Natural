import React from 'react';
import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  className?: string;
  height?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ 
  className = '', 
  height = 'h-96' 
}) => {
  return (
    <div className={`bg-gray-200 rounded-xl flex items-center justify-center ${height} ${className}`}>
      <div className="text-center">
        <MapPin className="h-12 w-12 text-gray-500 mx-auto" />
        <p className="mt-2 text-gray-600 font-medium">Mapa Interativo</p>
        <p className="text-gray-500 text-sm">(Placeholder para implementação do mapa)</p>
      </div>
    </div>
  );
};

export default MapPlaceholder;