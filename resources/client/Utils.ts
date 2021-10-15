export function formatDate(date: Date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return date.getFullYear() + '-' + month + '-' + day;
}

export function removeTimeFromDate(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
}

export function beginOfMonth(date: Date): Date {
  return removeTimeFromDate(new Date(date.getFullYear(), date.getMonth(), 1));
}

export function endOfMonth(date: Date): Date {
  return removeTimeFromDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
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

export function setLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage<T>(key: string, or: () => T): T {
  const value = localStorage.getItem(key);

  if (value === null) {
    return or();
  }

  return JSON.parse(value) as T;
}
