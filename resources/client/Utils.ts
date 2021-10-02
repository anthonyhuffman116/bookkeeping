export function formatDate(date: Date) {
  let month = date.getMonth().toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return date.getFullYear() + '-' + month + '-' + day;
}
