export type Client = {
  id?: string | null;
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export type Service = {
  id?: string | null;
  name: string;
  description: string;
};

export type ProfessionalService = {
  id?: string | null;
  serviceId: string;
  professionalId: string;
  value: number;
  commission: number;
  duration: number;
};

export type Professional = {
  id?: string | null;
  name: string;
  services: ProfessionalService[];
};

type UserProfile = 'professional' | 'client';

export type User = {
  id?: string | null;
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  admin: boolean;
  profile: UserProfile;
};
