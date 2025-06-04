import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import FormField from '../components/FormField';
import Select from '../components/Select';
import MapPlaceholder from '../components/MapPlaceholder';

const disasterTypes = [
  { value: 'enchente', label: 'Enchente' },
  { value: 'incendio', label: 'Incêndio' },
  { value: 'deslizamento', label: 'Deslizamento' },
  { value: 'outro', label: 'Outro' }
];

const states = [
  { value: 'rs', label: 'Rio Grande do Sul' },
  { value: 'sc', label: 'Santa Catarina' },
  { value: 'pr', label: 'Paraná' },
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'es', label: 'Espírito Santo' },
  { value: 'ms', label: 'Mato Grosso do Sul' },
  { value: 'mt', label: 'Mato Grosso' },
  { value: 'go', label: 'Goiás' },
  { value: 'df', label: 'Distrito Federal' },
  { value: 'ba', label: 'Bahia' },
  { value: 'se', label: 'Sergipe' },
  { value: 'al', label: 'Alagoas' },
  { value: 'pe', label: 'Pernambuco' },
  { value: 'pb', label: 'Paraíba' },
  { value: 'rn', label: 'Rio Grande do Norte' },
  { value: 'ce', label: 'Ceará' },
  { value: 'pi', label: 'Piauí' },
  { value: 'ma', label: 'Maranhão' },
  { value: 'to', label: 'Tocantins' },
  { value: 'pa', label: 'Pará' },
  { value: 'ap', label: 'Amapá' },
  { value: 'am', label: 'Amazonas' },
  { value: 'rr', label: 'Roraima' },
  { value: 'ac', label: 'Acre' },
  { value: 'ro', label: 'Rondônia' }
];

interface FormData {
  name: string;
  location: string;
  type: string;
  description: string;
}

interface FormErrors {
  name?: string;
  location?: string;
  type?: string;
  description?: string;
}

const RegisterDisasterPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    type: '',
    description: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Por favor, informe o nome do desastre';
    }
    
    if (!formData.location) {
      newErrors.location = 'Por favor, selecione a localização';
    }
    
    if (!formData.type) {
      newErrors.type = 'Por favor, selecione o tipo de desastre';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is filled
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset form after showing success message
        setTimeout(() => {
          setFormData({
            name: '',
            location: '',
            type: '',
            description: ''
          });
          setIsSuccess(false);
        }, 3000);
      }, 1000);
    }
  };
  
  return (
    <div className="py-6 max-w-3xl mx-auto">
      <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-lg mb-6 text-center">
        <span className="font-semibold">Área Administrativa</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cadastro de Desastre</h1>
      
      <Card>
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Desastre cadastrado com sucesso!</h3>
            <p className="mt-2 text-sm text-gray-500">
              O desastre foi registrado no sistema e já está disponível no mapa.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormField 
              label="Nome do desastre" 
              id="name"
              error={errors.name}
              required
            >
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
            
            <FormField 
              label="Localização" 
              id="location"
              error={errors.location}
              required
            >
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
            
            <FormField 
              label="Tipo de desastre" 
              id="type"
              error={errors.type}
              required
            >
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
            
            <FormField 
              label="Descrição adicional" 
              id="description"
              error={errors.description}
            >
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
              <p className="text-sm font-medium text-gray-700 mb-1">
                Mapa ilustrativo
              </p>
              <MapPlaceholder height="h-64" />
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit" 
                variant="primary" 
                isFullWidth
                isLoading={isSubmitting}
              >
                Cadastrar Desastre
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default RegisterDisasterPage;