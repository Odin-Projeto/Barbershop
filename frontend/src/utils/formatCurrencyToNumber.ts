export function formatCurrencyToNumber(currency: string | number): number {
  if (!currency) return 0;
  return Number(
    currency
      .toString()
      .replace(/[^0-9,]/g, '')
      .replace(',', '.')
  );
}
