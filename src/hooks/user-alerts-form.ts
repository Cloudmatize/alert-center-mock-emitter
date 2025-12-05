import { useState } from 'react';
import { getDefaultEndpoint, getTestMode, setTestMode } from '@/lib/utils';
import type { AlertType, AlertPolicy } from '@/types/alert.types';
import { generateMockAlert } from '@/services/mock-data-generator';

export const useAlertForm = () => {
  const [alertType, setAlertType] = useState<AlertType>('accident');
  const [alertPolicy, setAlertPolicy] = useState<AlertPolicy>('major_and_minor_accidents');
  const [endpointUrl, setEndpointUrl] = useState(getDefaultEndpoint());
  const [testMode, setTestModeState] = useState(getTestMode());
  const [canEditEndpoint, setCanEditEndpoint] = useState(false);

  const updateAlertType = (type: AlertType) => {
    setAlertType(type);
    setAlertPolicy(type === 'traffic' ? 'counterflow_traffic' : 'major_and_minor_accidents');
  };

  const updateEndpointUrl = (url: string) => {
    setEndpointUrl(url);
  };

  const updateTestMode = (enabled: boolean) => {
    setTestModeState(enabled);
    setTestMode(enabled);
  };

  const updateCanEditEndpoint = (enabled: boolean) => {
    setCanEditEndpoint(enabled);
    if (!enabled) {
      setEndpointUrl(getDefaultEndpoint());
    }
  };

  const generatePayload = () => {
    return generateMockAlert(alertType, alertPolicy);
  };

  return {
    alertType,
    setAlertType: updateAlertType,
    alertPolicy,
    setAlertPolicy,
    endpointUrl,
    updateEndpointUrl,
    testMode,
    updateTestMode,
    canEditEndpoint,
    updateCanEditEndpoint,
    generatePayload,
  };
};
