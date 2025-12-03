import { Settings, FlaskConical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface EndpointConfigProps {
  darkMode: boolean;
  testMode: boolean;
  endpointUrl: string;
  onTestModeChange: (enabled: boolean) => void;
  onEndpointUrlChange: (url: string) => void;
}

export function EndpointConfig({
  darkMode,
  testMode,
  endpointUrl,
  onTestModeChange,
  onEndpointUrlChange,
}: EndpointConfigProps) {
  return (
    <div className={`border-b pb-6 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Settings className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Configuração do Endpoint
        </h2>
      </div>

      {/* Test Mode Switch */}
      <div className={`flex items-center justify-between p-4 rounded-lg mb-4 ${darkMode ? 'bg-blue-950/50 border border-blue-900' : 'bg-blue-50'}`}>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <FlaskConical className={`h-4 w-4 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`} />
            <Label htmlFor="test-mode" className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              Modo de Teste
            </Label>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
            Ativa para simular envios sem precisar de URL válida
          </p>
        </div>
        <Switch
          id="test-mode"
          checked={testMode}
          onCheckedChange={onTestModeChange}
        />
      </div>

      <div>
        <Label htmlFor="endpoint" className={darkMode ? 'text-gray-200' : ''}>
          URL da Central de Alertas
        </Label>
        <Input
          id="endpoint"
          type="url"
          value={endpointUrl}
          onChange={(e) => onEndpointUrlChange(e.target.value)}
          placeholder="https://api.go.tasks-publisher.dev.4smartcloud.com/tasks"
          className={`mt-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : ''}`}
          disabled={testMode}
        />
        {testMode && (
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            URL desabilitada em modo de teste
          </p>
        )}
      </div>
    </div>
  );
}
