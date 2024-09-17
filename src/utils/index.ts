export const LANGUAGES = [
  { label: 'Spanish', code: 'es' },
  { label: 'English', code: 'en' },
  { label: 'Italian', code: 'it' },
  { label: 'French', code: 'fr' },
  { label: 'Arabic', code: 'ar' },
];

export const truncateText = (text: string) => {
  if (text.length > 20) {
    return text.substring(0, 20) + '...';
  }
  return text;
};
