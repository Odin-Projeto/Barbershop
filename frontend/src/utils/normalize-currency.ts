export const normalizeCurrency = (value?: string) => {
  const cleanedValue = value?.replace(/\D/g, '');
  const numberValue = Number(cleanedValue) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue);
};
