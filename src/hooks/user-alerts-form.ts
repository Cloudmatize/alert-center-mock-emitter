import { useState } from 'react';
import { getStoredEndpoint, setStoredEndpoint, getTestMode, setTestMode } from '@/lib/utils';
import type { AlertType, BehaviorType, NotificationChannel } from '@/types/alert.types';
import { generateMockAlert } from '@/services/mock-data-generator';

export const useAlertForm = () => {
  const [alertType, setAlertType] = useState<AlertType>('video');
  const [behaviorType, setBehaviorType] = useState<BehaviorType>('anomaly');
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
    return generateMockAlert(alertType, behaviorType, channels);
  };

  return {
    alertType,
    setAlertType,
    behaviorType,
    setBehaviorType,
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
