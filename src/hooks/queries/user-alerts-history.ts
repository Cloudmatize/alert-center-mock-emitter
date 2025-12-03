import { useQuery } from '@tanstack/react-query';
import { getAlertHistory } from '@/services/api/alertApi';

export const useAlertHistory = (enabled = true) => {
  return useQuery({
    queryKey: ['alert-history'],
    queryFn: getAlertHistory,
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnMount: true,
  });
};
