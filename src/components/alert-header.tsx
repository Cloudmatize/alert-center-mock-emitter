import { Bell, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlertHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function AlertHeader({ darkMode, onToggleDarkMode }: AlertHeaderProps) {
  return (
    <div className={`sticky top-0 backdrop-blur-xl border-b ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`} style={{ zIndex: 1000 }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4 Smart | Simulador de eventos
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Simula eventos no serviço de Alerta
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleDarkMode}
            className={darkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : ''}
          >
            {darkMode ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                Light
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
