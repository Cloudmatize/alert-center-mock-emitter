import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ALERT_TYPE_LABELS,
  ALERT_TYPE_DESCRIPTIONS,
  ALERT_TYPE_AVAILABLE,
  type AlertType,
} from '@/types/alert.types';

interface AlertTypeSelectorProps {
  darkMode: boolean;
  alertType: AlertType;
  onAlertTypeChange: (value: AlertType) => void;
}

export function AlertTypeSelector({
  darkMode,
  alertType,
  onAlertTypeChange,
}: AlertTypeSelectorProps) {
  return (
    <div>
      <Label htmlFor="alertType" className={darkMode ? 'text-gray-200' : ''}>
        Tipo de Alerta
      </Label>
      <Select
        value={alertType}
        onValueChange={(value) => onAlertTypeChange(value as AlertType)}
      >
        <SelectTrigger
          id="alertType"
          className={`mt-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
        >
          <SelectValue placeholder="Selecione o tipo de alerta" />
        </SelectTrigger>
        <SelectContent className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
          {Object.entries(ALERT_TYPE_LABELS).map(([key, label]) => (
            <SelectItem
              key={key}
              value={key}
              disabled={!ALERT_TYPE_AVAILABLE[key as AlertType]}
              className={darkMode ? 'text-white focus:bg-gray-700 focus:text-white' : ''}
            >
              {label} {!ALERT_TYPE_AVAILABLE[key as AlertType] && '(Em breve)'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className={`text-xs mt-2 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {ALERT_TYPE_DESCRIPTIONS[alertType]}
      </p>
    </div>
  );
}
