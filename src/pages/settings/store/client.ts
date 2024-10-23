import { create } from 'zustand';
import { Client, User } from '../types';

type UserState = {
  user?: User;
  addUser: (user: User) => void;
};

export const users: Client[] = [
  {
    id: '1',
    email: 'user@teste.com',
    name: 'João da Couves',
    password: '123',
    phoneNumber: '(42) 99999-2222',
  },
];

export const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  addUser: (user: User) => set(() => ({ user })),
}));
