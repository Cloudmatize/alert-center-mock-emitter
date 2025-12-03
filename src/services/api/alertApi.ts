import axios, { AxiosError } from 'axios';
import type { AlertPayload, AlertResponse, AlertType } from '@/types/alert.types';
import { getTestMode } from '@/lib/utils';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const sendAlert = async (payload: AlertPayload, alertType: AlertType): Promise<AlertResponse> => {
  const isTestMode = getTestMode();

  try {
    let requestBody;

    if (alertType === 'video') {
      requestBody = {
        toTable: 'irisity_events',
        taskSource: 'irisity',
        payload: [payload],
        actionOnDb: 'insert',
      };
    } else {
      requestBody = payload;
    }

    const response = await apiClient.post<AlertResponse>(API_ENDPOINT, requestBody);

    return {
      ...response.data,
      success: true,
      message: 'Alert sent successfully',
    };
  } catch (error) {

    if (isTestMode) {
      console.log('[Alert API] Test mode active - simulating success');
      return {
        success: true,
        message: 'Alert sent successfully (test mode)',
        data: payload,
      };
    }

    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Error sending alert'
      );
    }
    throw error;
  }
};
