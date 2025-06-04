import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export interface Disaster {
  id: number;
  name: string;
  location: string;
  type: string;
  description: string;
  date: string;
  active: boolean;
}

export interface DonationRequest {
  id: number;
  requesterType: string;
  category: string;
  location: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export const disasterService = {
  getAll: () => api.get<Disaster[]>('/desastres'),
  create: (disaster: Omit<Disaster, 'id'>) => api.post<Disaster>('/desastres', disaster)
};

export const donationService = {
  getAll: () => api.get<DonationRequest[]>('/pedidos'),
  create: (donation: Omit<DonationRequest, 'id' | 'status' | 'createdAt'>) => 
    api.post<DonationRequest>('/pedidos', donation),
  approve: (id: number) => api.put(`/pedidos/${id}/aprovar`),
  reject: (id: number) => api.put(`/pedidos/${id}/rejeitar`)
};

export default api;