import { CheckCircle2, XCircle, FlaskConical } from 'lucide-react';

interface AlertStatusMessageProps {
  darkMode: boolean;
  isSuccess: boolean;
  isError: boolean;
  testMode: boolean;
  errorMessage?: string;
}

export function AlertStatusMessage({
  darkMode,
  isSuccess,
  isError,
  testMode,
  errorMessage,
}: AlertStatusMessageProps) {
  if (!isSuccess && !isError) return null;

  if (isSuccess) {
    return (
      <div className={`mt-4 p-4 rounded-lg border ${darkMode ? 'bg-green-950/50 border-green-900 text-green-300' : 'bg-green-50 border-green-200'}`}>
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          <p className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
            Alerta enviado com sucesso!
          </p>
        </div>
        {testMode && (
          <div className="flex items-center gap-2 mt-2">
            <FlaskConical className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
              Modo teste: notificação em tempo real ativada
            </p>
          </div>
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`mt-4 p-4 rounded-lg border ${darkMode ? 'bg-red-950/50 border-red-900' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-center gap-2">
          <XCircle className={`h-5 w-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
          <p className={`font-medium ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
            Erro ao enviar alerta: {errorMessage}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
