import React from 'react';
import Button from './Button';

interface DonationRequest {
  id: string;
  requester: string;
  category: string;
  location: string;
  date: string;
}

interface DonationTableProps {
  donations: DonationRequest[];
  isAdmin?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDonate?: (id: string) => void;
}

const DonationTable: React.FC<DonationTableProps> = ({
  donations,
  isAdmin = false,
  onApprove,
  onReject,
  onDonate,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col\" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Solicitante
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Local
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data da solicitação
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donations.map((donation, index) => (
            <tr key={donation.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {donation.requester}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {donation.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {donation.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {donation.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {isAdmin ? (
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="success" 
                      size="sm" 
                      onClick={() => onApprove && onApprove(donation.id)}
                    >
                      Aprovar
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => onReject && onReject(donation.id)}
                    >
                      Rejeitar
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => onDonate && onDonate(donation.id)}
                  >
                    Doar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationTable;