import { AlertTriangle, ClipboardList, Database } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const AdminPortalPage: React.FC = () => {
  const [disastersCount, setDisastersCount] = useState<number>(0);
  const [donationsCount, setDonationsCount] = useState<number>(0);
  const [beneficiariesCount, setBeneficiariesCount] = useState<number>(0);

  useEffect(() => {
    // Busca total de desastres
    fetch('http://localhost:8080/api/desastres')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: any[]) => {
        setDisastersCount(Array.isArray(data) ? data.length : 0);
      })
      .catch(() => {
        setDisastersCount(0);
      });

    // Busca total de doações
    fetch('http://localhost:8080/api/doacoes')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: any[]) => {
        setDonationsCount(Array.isArray(data) ? data.length : 0);
      })
      .catch(() => {
        setDonationsCount(0);
      });

    // Busca total de beneficiários
    fetch('http://localhost:8080/api/beneficiarios')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: any[]) => {
        setBeneficiariesCount(Array.isArray(data) ? data.length : 0);
      })
      .catch(() => {
        setBeneficiariesCount(0);
      });
  }, []);

  return (
    <div className="py-6 max-w-4xl mx-auto">
      <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-lg mb-6 text-center">
        <span className="font-semibold">Área Administrativa</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Portal do Administrador</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/register-disaster" className="block">
          <Card className="h-full transition-transform hover:scale-105 flex flex-col items-center justify-center py-10 text-center">
            <AlertTriangle className="h-16 w-16 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Cadastrar Desastre</h2>
            <p className="text-gray-600">Registre um novo desastre natural no sistema</p>
          </Card>
        </Link>

        <Link to="/pending-donations" className="block">
          <Card className="h-full transition-transform hover:scale-105 flex flex-col items-center justify-center py-10 text-center">
            <ClipboardList className="h-16 w-16 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Pedidos Pendentes</h2>
            <p className="text-gray-600">Gerencie pedidos de doação que aguardam aprovação</p>
          </Card>
        </Link>

        <Link to="/donation-list" className="block">
          <Card className="h-full transition-transform hover:scale-105 flex flex-col items-center justify-center py-10 text-center">
            <Database className="h-16 w-16 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Todos os Pedidos</h2>
            <p className="text-gray-600">Visualize todos os pedidos de doação do sistema</p>
          </Card>
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Estatísticas do Sistema</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50">
            <div className="text-center">
              <p className="text-sm text-gray-600">Desastres Ativos</p>
              <p className="text-3xl font-bold text-blue-700">{disastersCount}</p>
            </div>
          </Card>

          <Card className="bg-green-50">
            <div className="text-center">
              <p className="text-sm text-gray-600">Doações No Sistema</p>
              <p className="text-3xl font-bold text-green-700">{donationsCount}</p>
            </div>
          </Card>

          <Card className="bg-purple-50">
            <div className="text-center">
              <p className="text-sm text-gray-600">Beneficiários Cadastrados</p>
              <p className="text-3xl font-bold text-purple-700">{beneficiariesCount}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPortalPage;
