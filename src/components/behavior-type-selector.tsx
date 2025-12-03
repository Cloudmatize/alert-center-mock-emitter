import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BEHAVIOR_TYPE_LABELS, type BehaviorType } from '@/types/alert.types';

interface BehaviorTypeSelectorProps {
  darkMode: boolean;
  behaviorType: BehaviorType;
  onBehaviorTypeChange: (value: BehaviorType) => void;
}

export function BehaviorTypeSelector({
  darkMode,
  behaviorType,
  onBehaviorTypeChange,
}: BehaviorTypeSelectorProps) {
  return (
    <div>
      <Label htmlFor="behaviorType" className={darkMode ? 'text-gray-200' : ''}>
        Tipo de Comportamento
      </Label>
      <Select
        value={behaviorType}
        onValueChange={(value) => onBehaviorTypeChange(value as BehaviorType)}
      >
        <SelectTrigger
          id="behaviorType"
          className={`mt-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
        >
          <SelectValue placeholder="Selecione o comportamento" />
        </SelectTrigger>
        <SelectContent className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
          {Object.entries(BEHAVIOR_TYPE_LABELS).map(([key, label]) => (
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
