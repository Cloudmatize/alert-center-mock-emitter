import { Novu } from '@novu/js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const getApiBaseUrl = (isDevelopment = false) =>
  isDevelopment
    ? 'https://notifications.dev.4smartcloud.com'
    : 'https://notifications.prd.4smartcloud.com';

const getOrCreateSubscriberId = async (authToken: string, isDevelopment: boolean): Promise<string | null> => {
  const API_BASE_URL = getApiBaseUrl(isDevelopment);

  const checkIfSubscriberExists = async (): Promise<string | null> => {
    const response = await fetch(`${API_BASE_URL}/notifications/me/subscriber`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const responseData = await response.json();
    return response.ok && responseData?.data?.[0] ? responseData.data[0].subscriberId : null;
  };

  const createNewSubscriber = async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/notifications/me/subscriber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData.subscriberId) {
      return responseData.subscriberId;
    }
    throw new Error(`Failed to create subscriber: ${response.statusText}`);
  };

  try {
    let subscriberId = await checkIfSubscriberExists();
    if (subscriberId) {
      return subscriberId;
    }
    subscriberId = await createNewSubscriber();
    return subscriberId;
  } catch (error) {
    console.error('[Novu] Subscriber process failed:', error);
    return null;
  }
};

interface UseNovuPopupListenerOptions {
  applicationIdentifier?: string;
  authToken?: string;
  isDevelopment?: boolean;
  enabled?: boolean;
}

export const useNovuPopupListener = ({
  applicationIdentifier,
  authToken,
  isDevelopment = false,
  enabled = true,
}: UseNovuPopupListenerOptions = {}) => {
  const [isNovuInitialized, setIsNovuInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !applicationIdentifier || !authToken) {
      return;
    }

    let novuInstance: Novu | null = null;
    let isMounted = true;

    const initializeNovu = async () => {
      try {
        const subscriberId = await getOrCreateSubscriberId(authToken, isDevelopment);
        console.log('subscriberId:', subscriberId)
        if (!subscriberId || !isMounted) {
          return;
        }

        novuInstance = new Novu({
          applicationIdentifier,
          subscriberId,
        });

        novuInstance.on('notifications.notification_received', (data: any) => {
        console.log('data:', data)
          if (!isMounted) return;
          
          const notification = data?.result;
          if (notification) {
            try {
              const payload = JSON.parse(
                notification?.data?.payload?.replace(/'/g, '"') || '{}'
              );
              const message = payload.message || 'Nova notificação recebida';

              toast.info(message, {
                onClick: () => {
                  if (notification.redirect?.url) {
                    window.open(
                      notification.redirect.url,
                      notification.redirect.target || '_self'
                    );
                  }
                },
              });
            } catch (e) {
              console.error('[Novu] Failed to process notification payload:', e);
              toast.info('Nova notificação recebida');
            }
          }
        });

        setIsNovuInitialized(true);
        console.log('[Novu] SDK initialized and listening');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize Novu');
        console.error('[Novu] Initialization error:', error);
        setError(error);
      }
    };

    initializeNovu();

    return () => {
      isMounted = false;
      setIsNovuInitialized(false);
    };
  }, [applicationIdentifier, authToken, isDevelopment, enabled]);

  return { isNovuInitialized, error };
};
