import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ACCIDENT_SUBTYPE_LABELS, type AccidentSubtype } from '@/types/alert.types';

interface AccidentSubtypeSelectorProps {
  darkMode: boolean;
  accidentSubtype: AccidentSubtype;
  onAccidentSubtypeChange: (value: AccidentSubtype) => void;
}

export function AccidentSubtypeSelector({
  darkMode,
  accidentSubtype,
  onAccidentSubtypeChange,
}: AccidentSubtypeSelectorProps) {
  return (
    <div>
      <Label htmlFor="accidentSubtype" className={darkMode ? 'text-gray-200' : ''}>
        Política do Alerta
      </Label>
      <Select
        value={accidentSubtype}
        onValueChange={(value) => onAccidentSubtypeChange(value as AccidentSubtype)}
      >
        <SelectTrigger
          id="accidentSubtype"
          className={`mt-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
        >
          <SelectValue placeholder="Selecione o tipo de acidente" />
        </SelectTrigger>
        <SelectContent className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
          {Object.entries(ACCIDENT_SUBTYPE_LABELS).map(([key, label]) => (
            <SelectItem
              key={key}
              value={key}
              className={darkMode ? 'text-white focus:bg-gray-700 focus:text-white' : ''}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
