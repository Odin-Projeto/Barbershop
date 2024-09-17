import { create } from 'zustand';
import { Service } from '../types';

type ServiceState = {
  services: Service[];
};

export const useServiceStore = create<ServiceState>(() => ({
  services: [
    { id: '1', name: 'Barba', description: 'serviço teste 1' },
    { id: '2', name: 'Cabelo', description: 'serviço teste 2' },
    { id: '3', name: 'Cabelo + barba', description: 'serviço teste 3' },
  ],
}));
