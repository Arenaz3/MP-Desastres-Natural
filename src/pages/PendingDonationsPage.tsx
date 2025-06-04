import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import Card from '../components/Card';
import DonationTable from '../components/DonationTable';
import Select from '../components/Select';
import Button from '../components/Button';

// Mock data
const mockPendingDonations = [
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

const PendingDonationsPage = () => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [requester, setRequester] = useState('');
  const [pendingDonations, setPendingDonations] = useState(mockPendingDonations);
  
  const handleApprove = (id: string) => {
    setPendingDonations(prev => prev.filter(donation => donation.id !== id));
    alert(`Pedido ${id} aprovado com sucesso!`);
  };
  
  const handleReject = (id: string) => {
    setPendingDonations(prev => prev.filter(donation => donation.id !== id));
    alert(`Pedido ${id} rejeitado.`);
  };
  
  return (
    <div className="py-6">
      <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-lg mb-6 text-center">
        <span className="font-semibold">Área Administrativa</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pedidos de Doação Pendentes</h1>
      
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
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Todos os pedidos nesta lista estão aguardando aprovação. Verifique as informações antes de aprovar ou rejeitar.
            </p>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl overflow-hidden">
        <DonationTable 
          donations={pendingDonations}
          isAdmin
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default PendingDonationsPage;