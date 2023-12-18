import dayjs from 'dayjs';

export function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return dayjs(dateStr).format('YYYY-MM-DD HH:mm:ss');
}
