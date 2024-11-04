export function normalizePhoneNumber(phoneNumber?: string): string {
  if (!phoneNumber) return '';
  let value = phoneNumber;

  if (value.length > 15) {
    value = value.slice(0, 15);
  }
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');

  return value;
}
