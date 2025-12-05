import { FlaskConical } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface TestModeConfigProps {
  darkMode: boolean;
  testMode: boolean;
  onTestModeChange: (enabled: boolean) => void;
}

export function TestModeConfig({
  darkMode,
  testMode,
  onTestModeChange,
}: TestModeConfigProps) {
  return (
    <div className={`border-b pb-6 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>

      {/* Test Mode Switch */}
      <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-blue-950/50 border border-blue-900' : 'bg-blue-50'}`}>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <FlaskConical className={`h-4 w-4 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`} />
            <Label htmlFor="test-mode" className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              Modo de Teste
            </Label>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
            Ativa o listener para receber e exibir notificações Novu na plataforma
          </p>
        </div>
        <Switch
          id="test-mode"
          checked={testMode}
          onCheckedChange={onTestModeChange}
        />
      </div>
    </div>
  );
}
