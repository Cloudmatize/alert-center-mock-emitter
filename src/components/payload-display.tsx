import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PayloadDisplayProps {
  darkMode: boolean;
  payload: string;
  payloadKey: number;
}

export function PayloadDisplay({ darkMode, payload, payloadKey }: PayloadDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl shadow-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Payload Enviado
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className={darkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : ''}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </>
          )}
        </Button>
      </div>
      <pre
        key={payloadKey}
        className={`text-sm text-wrap p-4 rounded-lg transition-all duration-300 ease-in-out animate-pulse-once ${darkMode ? 'bg-gray-950 text-green-400' : 'bg-gray-50 text-gray-800'}`}
        style={{
          animation: 'fadeInScale 0.3s ease-in-out'
        }}
      >
        {payload}
      </pre>
    </div>
  );
}
