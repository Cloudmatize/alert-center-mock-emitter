import { useState } from 'react';
import { getStoredEndpoint, setStoredEndpoint, getTestMode, setTestMode } from '@/lib/utils';
import type { AlertType, BehaviorType, NotificationChannel, AccidentSubtype } from '@/types/alert.types';
import { generateMockAlert } from '@/services/mock-data-generator';

export const useAlertForm = () => {
  const [alertType, setAlertType] = useState<AlertType>('accident');
  const [behaviorType, setBehaviorType] = useState<BehaviorType>('anomaly');
  const [accidentSubtype, setAccidentSubtype] = useState<AccidentSubtype>('ACCIDENT_MINOR');
  const [channels, setChannels] = useState<NotificationChannel[]>(['platform']);
  const [endpointUrl, setEndpointUrl] = useState(getStoredEndpoint());
  const [testMode, setTestModeState] = useState(getTestMode());

  const updateEndpointUrl = (url: string) => {
    setEndpointUrl(url);
    setStoredEndpoint(url);
  };

  const updateTestMode = (enabled: boolean) => {
    setTestModeState(enabled);
    setTestMode(enabled);
  };

  const toggleChannel = (channel: NotificationChannel) => {
    setChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const generatePayload = () => {
    return generateMockAlert(alertType, behaviorType, accidentSubtype);
  };

  return {
    alertType,
    setAlertType,
    behaviorType,
    setBehaviorType,
    accidentSubtype,
    setAccidentSubtype,
    channels,
    setChannels,
    toggleChannel,
    endpointUrl,
    updateEndpointUrl,
    testMode,
    updateTestMode,
    generatePayload,
  };
};
