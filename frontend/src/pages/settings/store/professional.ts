import { create } from 'zustand';
import { Professional } from '../types';

type ProfessionalState = {
  professionals: Professional[];
};

export const useProfessionalStore = create<ProfessionalState>(() => ({
  professionals: [
    {
      name: 'José da Silva',
      id: '1',
      services: [
        {
          id: '1',
          serviceId: '1',
          value: 12.0,
          commission: 5,
          duration: 30,
          professionalId: '1',
        },
        {
          id: '2',
          serviceId: '2',
          value: 30.0,
          commission: 5,
          duration: 30,
          professionalId: '1',
        },
        {
          id: '3',
          serviceId: '3',
          value: 60.0,
          commission: 10,
          duration: 30,
          professionalId: '1',
        },
      ],
    },
  ],
}));
