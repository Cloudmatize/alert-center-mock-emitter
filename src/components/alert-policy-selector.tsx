import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ALERT_POLICIES, type AlertType, type AlertPolicy } from '@/types/alert.types';

interface AlertPolicySelectorProps {
  darkMode: boolean;
  alertType: AlertType;
  alertPolicy: AlertPolicy;
  onAlertPolicyChange: (value: AlertPolicy) => void;
}

export function AlertPolicySelector({
  darkMode,
  alertType,
  alertPolicy,
  onAlertPolicyChange,
}: AlertPolicySelectorProps) {
  const policies = ALERT_POLICIES[alertType];
  
  useEffect(() => {
    const validPolicies = Object.keys(policies);
    if (!validPolicies.includes(alertPolicy)) {
      onAlertPolicyChange(validPolicies[0] as AlertPolicy);
    }
  }, [alertType, alertPolicy, policies, onAlertPolicyChange]);

  return (
    <div>
      <Label htmlFor="alertPolicy" className={darkMode ? 'text-gray-200' : ''}>
        Política do Alerta
      </Label>
      <Select
        value={alertPolicy}
        onValueChange={(value) => onAlertPolicyChange(value as AlertPolicy)}
      >
        <SelectTrigger
          id="alertPolicy"
          className={`mt-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
        >
          <SelectValue placeholder="Selecione a política" />
        </SelectTrigger>
        <SelectContent className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
          {Object.entries(policies).map(([key, label]) => (
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
