export function formatDate(date: Date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return date.getFullYear() + '-' + month + '-' + day;
}

export function useFetch<T>(url: string, options: any = {}): Promise<T> {
  return fetch(url, options).then((response) => response.json());
}

export function usePostFetch<T>(url: string, data: any, options: any = {}): Promise<T> {
  return useFetch(url, {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
