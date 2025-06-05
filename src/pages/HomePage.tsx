import { Calendar, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import DisasterCard from '../components/DisasterCard';
import MapPlaceholder from '../components/MapPlaceholder';

interface ApiDisaster {
  id: string;
  nome: string;
  descricao: string;
  localizacao: string;      
  dataDesastre: string;     
}

interface FrontendDisaster {
  id: string;
  title: string;
  location: string;
  date: string;        
  description: string;
  active: boolean;
}

const itemsPerPage = 4;

const HomePage = () => {
  const [disasters, setDisasters] = useState<FrontendDisaster[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedDisaster, setSelectedDisaster] = useState<FrontendDisaster | null>(null);

  const [nameFilter, setNameFilter] = useState<string>('');         
  const [locationFilter, setLocationFilter] = useState<string>(''); 
  const [startDate, setStartDate] = useState<string>('');           
  const [endDate, setEndDate] = useState<string>('');               

  const [currentPage, setCurrentPage] = useState<number>(1);

  const formatDateBR = (isoDate: string) => {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  };

  const fetchDisasters = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (nameFilter.trim()) {
        params.append('nome', nameFilter.trim());
      }
      if (locationFilter.trim()) {
        params.append('localizacao', locationFilter.trim());
      }
      if (startDate) {
        params.append('inicio', startDate);
      }
      if (endDate) {
        params.append('fim', endDate);
      }

      if (startDate && endDate && startDate > endDate) {
        throw new Error('Data Início não pode ser posterior à Data Fim.');
      }

      const queryString = params.toString();
      const url = queryString
        ? `http://localhost:8080/api/desastres?${queryString}`
        : 'http://localhost:8080/api/desastres';

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar desastres: ${response.status}`);
      }
      const data: ApiDisaster[] = await response.json();

      const mapped: FrontendDisaster[] = data.map((d) => ({
        id: d.id,
        title: d.nome,
        location: d.localizacao,
        date: formatDateBR(d.dataDesastre),
        description: d.descricao,
        active: true,
      }));

      setDisasters(mapped);
      setCurrentPage(1);
      setSelectedDisaster(mapped.length > 0 ? mapped[0] : null);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido.');
      setDisasters([]);
      setSelectedDisaster(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDisasters = disasters.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(disasters.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleDisasterClick = (disaster: FrontendDisaster) => {
    setSelectedDisaster(disaster);
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Mapa de Desastres e Áreas Afetadas
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-600" />
              Filtros
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="nameFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="nameFilter"
                  placeholder="Digite parte do nome"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="locationFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  id="locationFilter"
                  placeholder="Ex: PE, RJ, SP"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Data Início
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Data Fim
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <Button variant="primary" isFullWidth onClick={fetchDisasters}>
                Aplicar Filtros
              </Button>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <MapPlaceholder height="h-[400px]" />
        </div>

        <div className="lg:col-span-1">
          {selectedDisaster ? (
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
          ) : (
            <Card className="h-[400px] flex items-center justify-center">
              <span className="text-gray-600">Nenhum desastre selecionado</span>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-blue-600" />
          Desastres Recentes
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="text-lg font-medium text-gray-700">Carregando...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {currentDisasters.map((disaster) => (
                <div
                  key={disaster.id}
                  onClick={() => handleDisasterClick(disaster)}
                  className={`
                    rounded-lg cursor-pointer transition-shadow 
                    ${selectedDisaster?.id === disaster.id 
                      ? 'ring-2 ring-blue-600' 
                      : 'hover:shadow-lg'}
                  `}
                >
                  <DisasterCard
                    title={disaster.title}
                    location={disaster.location}
                    date={disaster.date}
                    description={disaster.description}
                    isActive={disaster.active}
                    horizontal
                  />
                </div>
              ))}
            </div>

            {disasters.length === 0 && !loading && (
              <p className="mt-4 text-center text-gray-600">
                Nenhum desastre encontrado para os filtros aplicados.
              </p>
            )}

            {disasters.length > itemsPerPage && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`
                      px-3 py-1 rounded 
                      ${currentPage === num 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                    `}
                  >
                    {num}
                  </button>
                ))}

                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próximo
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
