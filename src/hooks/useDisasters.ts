import { useState, useEffect } from 'react';
import { Disaster, disasterService } from '../services/api';

export function useDisasters() {
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDisasters();
  }, []);

  async function loadDisasters() {
    try {
      setLoading(true);
      const response = await disasterService.getAll();
      setDisasters(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar desastres');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createDisaster(disaster: Omit<Disaster, 'id'>) {
    try {
      const response = await disasterService.create(disaster);
      setDisasters(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw new Error('Erro ao criar desastre');
    }
  }

  return { disasters, loading, error, loadDisasters, createDisaster };
}