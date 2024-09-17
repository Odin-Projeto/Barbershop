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
