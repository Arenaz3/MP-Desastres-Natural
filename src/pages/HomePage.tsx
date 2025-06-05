import React, {useEffect, useState} from 'react';
import { Calendar, Filter } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import DisasterCard from '../components/DisasterCard';
import MapPlaceholder from '../components/MapPlaceholder';
import Select from '../components/Select';
import {Disaster} from "../models/Disaster.ts";

const disasterTypes = [
  { value: 'enchente', label: 'Enchente' },
  { value: 'deslizamento', label: 'Deslizamento' },
  { value: 'seca', label: 'Seca' },
  { value: 'incendio', label: 'Incêndio' },
  { value: 'barragem', label: 'Rompimento de Barragem' }
];

const regions = [
  { value: 'sul', label: 'Região Sul' },
  { value: 'sudeste', label: 'Região Sudeste' },
  { value: 'centro-oeste', label: 'Região Centro-Oeste' },
  { value: 'nordeste', label: 'Região Nordeste' },
  { value: 'norte', label: 'Região Norte' }
];

const dateOptions = [
  { value: 'semana', label: 'Última semana' },
  { value: 'mes', label: 'Último mês' },
  { value: 'trimestre', label: 'Último trimestre' },
  { value: 'ano', label: 'Último ano' }
];

const HomePage = () => {
  const [selectedDisaster, setSelectedDisaster] = useState(mockDisasters[0]);
  const [disasterType, setDisasterType] = useState('');
  const [region, setRegion] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/desastres')
        .then(response => response.json())
        .then(json => setData(element => json.map(element.id, element.title, element.location, element.date, element.description, element.active)))
        .then(error => console.error(error))
  })

  const handleDisasterClick = (disaster: typeof mockDisasters[0]) => {
    setSelectedDisaster(disaster);
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mapa de Desastres e Áreas Afetadas</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-600" />
              Filtros
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="disasterType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Desastre
                </label>
                <Select
                  id="disasterType"
                  options={disasterTypes}
                  value={disasterType}
                  onChange={(e) => setDisasterType(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Região/UF
                </label>
                <Select
                  id="region"
                  options={regions}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
                  Período
                </label>
                <Select
                  id="dateRange"
                  options={dateOptions}
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </div>

              <Button variant="primary" isFullWidth>
                Aplicar Filtros
              </Button>
            </div>
          </Card>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-2">
          <MapPlaceholder height="h-[400px]" />
        </div>

        {/* Right Sidebar - Selected Disaster */}
        <div className="lg:col-span-1">
          <Card className="h-[400px] flex flex-col">
            <h3 className="text-xl font-bold text-gray-900">{selectedDisaster.title}</h3>

            <div className="flex items-center text-gray-600 mt-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">{selectedDisaster.date}</span>
            </div>

            <div className="mt-4 flex-grow">
              <p className="text-gray-700">{selectedDisaster.description}</p>
            </div>

            <div className="mt-4 space-y-2">
              <Button variant="primary" isFullWidth>
                Ver mais detalhes
              </Button>
              <Button variant="secondary" isFullWidth>
                Doe / Peça Ajuda
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Disasters Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-blue-600" />
          Desastres Recentes
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {data ? <pre>{data.map((disaster) => (
            <DisasterCard
                key={disaster.id}
                title={disaster.title}
                location={disaster.location}
                date={disaster.date}
                description={disaster.description}
                isActive={disaster.active}
                onClick={() => handleDisasterClick(disaster)}
                horizontal
            />
          ))}</pre> : "loading..."}
        </div>
      </div>
    </div>
  );
};

export default HomePage;