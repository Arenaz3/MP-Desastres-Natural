import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import Card from '../components/Card';
import FormField from '../components/FormField';
import MapPlaceholder from '../components/MapPlaceholder';
import Select from '../components/Select';

interface FormData {
  name: string;
  location: string;
  type: string;
  date: string;        
  description: string;
}

interface FormErrors {
  name?: string;
  location?: string;
  type?: string;
  date?: string;
  description?: string;
}

const disasterTypes = [
  { value: 'enchente', label: 'Enchente' },
  { value: 'incendio', label: 'Incêndio' },
  { value: 'deslizamento', label: 'Deslizamento' },
  { value: 'outro', label: 'Outro' }
];

const states = [
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'PR', label: 'Paraná' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'GO', label: 'Goiás' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'BA', label: 'Bahia' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'CE', label: 'Ceará' },
  { value: 'PI', label: 'Piauí' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'TO', label: 'Tocantins' },
  { value: 'PA', label: 'Pará' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'RR', label: 'Roraima' },
  { value: 'AC', label: 'Acre' },
  { value: 'RO', label: 'Rondônia' }
];

const RegisterDisasterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    type: '',
    date: '',
    description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, informe o nome do desastre';
    }
    if (!formData.location) {
      newErrors.location = 'Por favor, selecione a localização';
    }
    if (!formData.type) {
      newErrors.type = 'Por favor, selecione o tipo de desastre';
    }
    if (!formData.date) {
      newErrors.date = 'Por favor, informe a data do desastre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        nome: formData.name.trim(),
        descricao: formData.description.trim(),
        localizacao: formData.location,
        dataDesastre: formData.date
      };

      const response = await fetch('http://localhost:8080/api/desastres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Status ${response.status}`);
      }

      toast.success('Desastre cadastrado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { zIndex: 1000 }
      });

      setFormData({ name: '', location: '', type: '', date: '', description: '' });
    } catch (err: any) {
      toast.error(`Erro ao cadastrar: ${err.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { zIndex: 1000 }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative py-6 max-w-3xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        style={{ zIndex: 1000 }}
      />

      <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-lg mb-6 text-center">
        <span className="font-semibold">Área Administrativa</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cadastro de Desastre</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <FormField label="Nome do desastre" id="name" error={errors.name} required>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: Enchente no Vale do Taquari"
            />
          </FormField>

          <FormField label="Localização" id="location" error={errors.location} required>
            <Select
              id="location"
              name="location"
              options={states}
              value={formData.location}
              onChange={handleChange}
              hasError={!!errors.location}
              className="mt-1"
            />
          </FormField>

          <FormField label="Tipo de desastre" id="type" error={errors.type} required>
            <Select
              id="type"
              name="type"
              options={disasterTypes}
              value={formData.type}
              onChange={handleChange}
              hasError={!!errors.type}
              className="mt-1"
            />
          </FormField>

          <FormField label="Data do desastre" id="date" error={errors.date} required>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </FormField>

          <FormField label="Descrição adicional" id="description" error={errors.description}>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Descreva detalhes sobre o desastre, como área afetada, número de pessoas atingidas, etc."
            />
          </FormField>

          <div className="mt-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-1">Mapa ilustrativo</p>
            <MapPlaceholder height="h-64" />
          </div>

          <div className="mt-6">
            <Button type="submit" variant="primary" isFullWidth isLoading={isSubmitting}>
              Cadastrar Desastre
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegisterDisasterPage;
