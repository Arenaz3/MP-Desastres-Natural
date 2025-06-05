import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Card from '../components/Card';

interface ApiDisaster {
  id: string;
  nome: string;
  descricao: string;
  localizacao: string;    // ex: "Recife, PE"
  dataDesastre: string;   // ex: "2025-06-10"
}

interface MapPlaceholderProps {
  className?: string;
  height?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  className = '',
  height = 'h-96',
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Faremos GET apenas para manter consistência, mas não usaremos coordenadas
  useEffect(() => {
    const fetchDesastres = async () => {
      try {
        await fetch('http://localhost:8080/api/desastres');
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido ao buscar desastres.');
      } finally {
        setLoading(false);
      }
    };
    fetchDesastres();
  }, []);

  // Centro aproximado do Brasil
  const brasilCenter: [number, number] = [-14.2350, -51.9253];

  if (loading) {
    return (
      <div
        className={`bg-gray-200 rounded-xl flex items-center justify-center ${height} ${className}`}
      >
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-500 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600 font-medium">Carregando mapa do Brasil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-gray-200 rounded-xl flex items-center justify-center ${height} ${className}`}
      >
        <Card className="p-4 bg-white">
          <p className="text-red-600 font-semibold">Erro: {error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden ${height} ${className}`}>
      <MapContainer
        center={brasilCenter}
        zoom={4}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </MapContainer>
    </div>
  );
};

export default MapPlaceholder;
