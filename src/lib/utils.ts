import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(date));
}

export function getDefaultEndpoint(): string {
  return import.meta.env.VITE_API_ENDPOINT || 'https://api.go.tasks-publisher.dev.4smartcloud.com/tasks';
}

export function getTestMode(): boolean {
  return localStorage.getItem('testMode') === 'true';
}

export function setTestMode(enabled: boolean): void {
  localStorage.setItem('testMode', enabled.toString());
}
