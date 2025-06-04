import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import FormField from '../components/FormField';
import Select from '../components/Select';

const requesterOptions = [
  { value: 'person', label: 'Pessoa física' },
  { value: 'ong', label: 'ONG' },
  { value: 'institution', label: 'Instituição' }
];

const categoryOptions = [
  { value: 'food', label: 'Alimento' },
  { value: 'clothing', label: 'Roupa' },
  { value: 'hygiene', label: 'Higiene' },
  { value: 'other', label: 'Outros' }
];

interface FormData {
  requesterType: string;
  category: string;
  location: string;
  description: string;
}

interface FormErrors {
  requesterType?: string;
  category?: string;
  location?: string;
  description?: string;
}

const RegisterDonationPage = () => {
  const [formData, setFormData] = useState<FormData>({
    requesterType: '',
    category: '',
    location: '',
    description: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.requesterType) {
      newErrors.requesterType = 'Por favor, selecione quem está solicitando';
    }
    
    if (!formData.category) {
      newErrors.category = 'Por favor, selecione uma categoria';
    }
    
    if (!formData.location) {
      newErrors.location = 'Por favor, informe o local de recebimento';
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
            requesterType: '',
            category: '',
            location: '',
            description: ''
          });
          setIsSuccess(false);
        }, 3000);
      }, 1000);
    }
  };
  
  return (
    <div className="py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Registrar Pedido de Doação</h1>
      
      <Card>
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Pedido registrado com sucesso!</h3>
            <p className="mt-2 text-sm text-gray-500">
              Seu pedido de doação foi registrado e está em análise.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormField 
              label="Quem está solicitando?" 
              id="requesterType"
              error={errors.requesterType}
              required
            >
              <Select
                id="requesterType"
                name="requesterType"
                options={requesterOptions}
                value={formData.requesterType}
                onChange={handleChange}
                hasError={!!errors.requesterType}
                className="mt-1"
              />
            </FormField>
            
            <FormField 
              label="Categoria do item" 
              id="category"
              error={errors.category}
              required
            >
              <Select
                id="category"
                name="category"
                options={categoryOptions}
                value={formData.category}
                onChange={handleChange}
                hasError={!!errors.category}
                className="mt-1"
              />
            </FormField>
            
            <FormField 
              label="Local do recebimento" 
              id="location"
              error={errors.location}
              required
            >
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
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
              />
            </FormField>
            
            <div className="mt-6">
              <Button 
                type="submit" 
                variant="primary" 
                isFullWidth
                isLoading={isSubmitting}
              >
                Salvar Pedido
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default RegisterDonationPage;