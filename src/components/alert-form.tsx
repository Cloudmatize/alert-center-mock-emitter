import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { AlertMap } from '@/components/alert-map';
import { AlertHeader } from '@/components/alert-header';
import { EndpointConfig } from '@/components/endpoint-config';
import { AlertTypeSelector } from '@/components/alert-type-selector';
import { BehaviorTypeSelector } from '@/components/behavior-type-selector';
import { AlertStatusMessage } from '@/components/alert-status-message';
import { PayloadDisplay } from '@/components/payload-display';
import type { Location } from '@/types/alert.types';
import { useAlertForm } from '@/hooks/user-alerts-form';
import { useSendAlert } from '@/hooks/mutations/use-send-alerts';
import { Button } from '@/components/ui/button';

export default function AlertForm() {
  const {
    alertType,
    setAlertType,
    behaviorType,
    setBehaviorType,
    endpointUrl,
    updateEndpointUrl,
    testMode,
    updateTestMode,
    generatePayload,
  } = useAlertForm();

  const { mutate: sendAlert, isPending, isSuccess, isError, error } = useSendAlert();
  const [showPayload, setShowPayload] = useState(false);
  const [lastPayload, setLastPayload] = useState<string>('');
  const [location, setLocation] = useState<Location | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [payloadKey, setPayloadKey] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = generatePayload();
    setLastPayload(JSON.stringify(payload, null, 2));
    setPayloadKey(prev => prev + 1);

    if ('location' in payload) {
      setLocation(payload.location);
    } else {
      setLocation(null);
    }

    setShowPayload(true);
    sendAlert({ payload, alertType });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-linear-to-br from-blue-50 to-indigo-100'}`}>
      <AlertHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className={`grid grid-cols-1 gap-6 transition-all duration-500 ease-in-out ${showPayload ? 'lg:grid-cols-2' : 'lg:grid-cols-1 place-items-center'}`}>
          <div className={`rounded-xl shadow-2xl p-8 border w-full transition-all duration-500 ease-in-out ${!showPayload ? 'max-w-2xl' : ''} ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <EndpointConfig
                darkMode={darkMode}
                testMode={testMode}
                endpointUrl={endpointUrl}
                onTestModeChange={updateTestMode}
                onEndpointUrlChange={updateEndpointUrl}
              />

              <AlertTypeSelector
                darkMode={darkMode}
                alertType={alertType}
                onAlertTypeChange={setAlertType}
              />

              <BehaviorTypeSelector
                darkMode={darkMode}
                behaviorType={behaviorType}
                onBehaviorTypeChange={setBehaviorType}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full"
                size="lg"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Alerta
                  </>
                )}
              </Button>
            </form>

            <AlertStatusMessage
              darkMode={darkMode}
              isSuccess={isSuccess}
              isError={isError}
              testMode={testMode}
              errorMessage={error?.message}
            />
          </div>

          <div className={`space-y-6 transition-all duration-500 ease-in-out ${showPayload
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8 pointer-events-none absolute'
            }`}>
            {location && alertType !== 'video' && (
              <AlertMap location={location} darkMode={darkMode} />
            )}

            {lastPayload && (
              <PayloadDisplay
                darkMode={darkMode}
                payload={lastPayload}
                payloadKey={payloadKey}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
