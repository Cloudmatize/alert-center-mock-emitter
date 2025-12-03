import { useMutation } from '@tanstack/react-query';
import { sendAlert } from '@/services/api/alertApi';
import type { AlertPayload, AlertType } from '@/types/alert.types';

export const useSendAlert = () => {
  return useMutation({
    mutationFn: ({ payload, alertType }: { payload: AlertPayload; alertType: AlertType }) => 
      sendAlert(payload, alertType),
    onSuccess: async (response) => {
      console.log('[Alert] Successfully sent:', response);
    },
    onError: (error) => {
      console.error('[Alert] Error sending:', error);
    },
  });
};
