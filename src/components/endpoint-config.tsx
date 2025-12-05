import { FlaskConical, Globe, Lock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { getDefaultEndpoint } from '@/lib/utils';

interface TestModeConfigProps {
  darkMode: boolean;
  testMode: boolean;
  onTestModeChange: (enabled: boolean) => void;
  endpointUrl: string;
  onEndpointChange: (url: string) => void;
  canEditEndpoint: boolean;
  onCanEditEndpointChange: (enabled: boolean) => void;
}

export function TestModeConfig({
  darkMode,
  testMode,
  onTestModeChange,
  endpointUrl,
  onEndpointChange,
  canEditEndpoint,
  onCanEditEndpointChange,
}: TestModeConfigProps) {
  const isNovuConfigured = import.meta.env.DEV && !!import.meta.env.VITE_NOVU_APP_ID && !!import.meta.env.VITE_NOVU_AUTH_TOKEN;

  const handleEditToggle = (enabled: boolean) => {
    onCanEditEndpointChange(enabled);
    if (!enabled) {
      onEndpointChange(getDefaultEndpoint());
    }
  };

  return (
    <div className={`border-b pb-6 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className={isNovuConfigured ? 'mb-4' : ''}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Globe className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <Label htmlFor="endpoint-url" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Endpoint da API
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Lock className={`h-3 w-3 ${canEditEndpoint ? 'text-green-500' : darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <Switch
              checked={canEditEndpoint}
              onCheckedChange={handleEditToggle}
              className="scale-75"
            />
          </div>
        </div>
        <Input
          id="endpoint-url"
          type="url"
          value={endpointUrl}
          onChange={(e) => onEndpointChange(e.target.value)}
          disabled={!canEditEndpoint}
          placeholder="https://api.example.com/tasks"
          className={`${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300'} ${!canEditEndpoint ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          {canEditEndpoint ? 'Defina o endpoint para onde os alertas serão enviados' : 'Usando endpoint padrão da variável de ambiente'}
        </p>
      </div>

      {isNovuConfigured && (
        <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-blue-950/50 border border-blue-900' : 'bg-blue-50'}`}>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <FlaskConical className={`h-4 w-4 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`} />
              <Label htmlFor="test-mode" className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                Escutar Notificações Novu
              </Label>
            </div>
            <p className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              Ativa o listener para receber notificações em tempo real nesta plataforma
            </p>
          </div>
          <Switch
            id="test-mode"
            checked={testMode}
            onCheckedChange={onTestModeChange}
          />
        </div>
      )}
    </div>
  );
}
