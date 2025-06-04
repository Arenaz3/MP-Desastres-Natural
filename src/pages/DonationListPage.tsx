import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import Card from '../components/Card';
import DonationTable from '../components/DonationTable';
import Select from '../components/Select';
import Button from '../components/Button';

// Mock data
const mockDonations = [
  {
    id: '1',
    requester: 'Maria Silva',
    category: 'Alimento',
    location: 'Porto Alegre, RS',
    date: '10/05/2024'
  },
  {
    id: '2',
    requester: 'ONG Reconstruir',
    category: 'Roupa',
    location: 'Petrópolis, RJ',
    date: '15/05/2024'
  },
  {
    id: '3',
    requester: 'Instituto Águas Claras',
    category: 'Higiene',
    location: 'Blumenau, SC',
    date: '18/05/2024'
  },
  {
    id: '4',
    requester: 'João Pereira',
    category: 'Alimento',
    location: 'Belo Horizonte, MG',
    date: '20/05/2024'
  },
  {
    id: '5',
    requester: 'Associação Solidária',
    category: 'Outros',
    location: 'São Paulo, SP',
    date: '22/05/2024'
  }
];

const categoryOptions = [
  { value: 'alimento', label: 'Alimento' },
  { value: 'roupa', label: 'Roupa' },
  { value: 'higiene', label: 'Higiene' },
  { value: 'outros', label: 'Outros' }
];

const locationOptions = [
  { value: 'rs', label: 'Rio Grande do Sul' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'sc', label: 'Santa Catarina' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'sp', label: 'São Paulo' }
];

const requesterOptions = [
  { value: 'pessoa', label: 'Pessoa física' },
  { value: 'ong', label: 'ONG' },
  { value: 'instituicao', label: 'Instituição' }
];

const DonationListPage = () => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [requester, setRequester] = useState('');
  
  const handleDonate = (id: string) => {
    alert(`Iniciando processo de doação para o pedido ${id}`);
  };
  
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pedidos de Doação</h1>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          Filtros
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <Select
              id="category"
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Local
            </label>
            <Select
              id="location"
              options={locationOptions}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="requester" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de solicitante
            </label>
            <Select
              id="requester"
              options={requesterOptions}
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="primary"
            icon={<Search className="h-4 w-4" />}
          >
            Buscar
          </Button>
        </div>
      </Card>
      
      <div className="rounded-xl overflow-hidden">
        <DonationTable 
          donations={mockDonations}
          onDonate={handleDonate}
        />
      </div>
    </div>
  );
};

export default DonationListPage;