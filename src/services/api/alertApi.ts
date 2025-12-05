import axios, { AxiosError } from 'axios';
import type { AlertPayload, AlertResponse, AlertType } from '@/types/alert.types';

const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const sendAlert = async (payload: AlertPayload, alertType: AlertType, endpoint: string): Promise<AlertResponse> => {
  try {
    let requestBody;

    if (alertType === 'video') {
      requestBody = {
        toTable: 'irisity_events',
        taskSource: 'irisity',
        payload: [payload],
        actionOnDb: 'insert',
      };
    } else if (alertType === 'accident') {
      requestBody = {
        toTable: 'waze_alerts',
        taskSource: 'waze',
        payload: [payload],
        actionOnDb: 'insert',
      };
    } else {
      requestBody = payload;
    }

    const response = await apiClient.post<AlertResponse>(endpoint, requestBody);

    return {
      ...response.data,
      success: true,
      message: 'Alert sent successfully',
    };
  } catch (error) {
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
