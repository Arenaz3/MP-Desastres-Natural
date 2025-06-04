import { useState, useEffect } from 'react';
import { DonationRequest, donationService } from '../services/api';

export function useDonations() {
  const [donations, setDonations] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDonations();
  }, []);

  async function loadDonations() {
    try {
      setLoading(true);
      const response = await donationService.getAll();
      setDonations(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar doações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createDonation(donation: Omit<DonationRequest, 'id' | 'status' | 'createdAt'>) {
    try {
      const response = await donationService.create(donation);
      setDonations(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw new Error('Erro ao criar pedido de doação');
    }
  }

  async function approveDonation(id: number) {
    try {
      await donationService.approve(id);
      setDonations(prev => 
        prev.map(donation => 
          donation.id === id 
            ? { ...donation, status: 'APPROVED' as const }
            : donation
        )
      );
    } catch (err) {
      throw new Error('Erro ao aprovar doação');
    }
  }

  async function rejectDonation(id: number) {
    try {
      await donationService.reject(id);
      setDonations(prev => 
        prev.map(donation => 
          donation.id === id 
            ? { ...donation, status: 'REJECTED' as const }
            : donation
        )
      );
    } catch (err) {
      throw new Error('Erro ao rejeitar doação');
    }
  }

  return { 
    donations, 
    loading, 
    error, 
    loadDonations, 
    createDonation,
    approveDonation,
    rejectDonation
  };
}