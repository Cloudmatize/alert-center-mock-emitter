export type AlertType = 'traffic' | 'accident';

export type AccidentSubtype = 'MAJOR_AND_MINOR_ACCIDENTS';

export type BehaviorType =
  | 'counterflow_traffic'
  | 'crossing_a_line';

export type NotificationChannel = 'platform' | 'whatsapp' | 'email';

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
  state?: string;
}

export interface WazeAccidentPayload {
  city: string;
  confidence: number;
  nThumbsUp: number;
  street: string;
  uuid: string;
  country: string;
  type: 'ACCIDENT';
  subtype: 'ACCIDENT_MAJOR' | 'ACCIDENT_MINOR';
  roadType: number;
  reliability: number;
  magvar: number;
  reportRating: number;
  reportByMunicipalityUser: boolean;
  pubMillis: number;
  ts: number;
  reportDescription: string;
  geo: string; // Format: POINT(longitude latitude)
  blockingAlertUuid: string | null;
  tsInsert: string; // ISO 8601 format
}

export interface VideoAlertPayload {
  id: string;
  accountId: string;
  sensorId: string;
  externalSensorId: string;
  ruleId: string;
  externalRuleId: string;
  eventTime: string;
  description: string;
  objectType: string;
  behaviorType: string;
  status: string;
  severity: string;
  clip: string;
  image: string;
}

export type AlertPayload = VideoAlertPayload | WazeAccidentPayload;

export interface AlertResponse {
  success: boolean;
  message: string;
  alertId?: string;
  timestamp?: string;
  data?: any;
}

export interface AlertHistoryItem {
  id: string;
  sentAt: string;
  payload: AlertPayload;
  response?: AlertResponse;
  status: 'success' | 'error' | 'pending';
}

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  accident: 'Acidente',
  traffic: 'Trânsito',
};

export const ALERT_TYPE_DESCRIPTIONS: Record<AlertType, string> = {
  traffic: 'Envie alertas baseados em análise de vídeo, detectando eventos e anomalias capturadas pelas câmeras de monitoramento. Ideal para identificação de situações que requerem atenção imediata.',
  accident: 'Dispare notificações de emergência para acidentes de trânsito, acionando automaticamente os serviços de resposta apropriados. Inclui informações sobre localização, severidade e recursos necessários.',
};

export const ALERT_TYPE_AVAILABLE: Record<AlertType, boolean> = {
  traffic: true,
  accident: true,
};

export const TRAFFIC_POLICY_LABELS: Record<BehaviorType, string> = {
  counterflow_traffic: 'Veículo em contrafluxo',
  crossing_a_line: 'Veículo em excesso de velocidade',
};

export const ACCIDENT_SUBTYPE_LABELS: Record<AccidentSubtype, string> = {
  MAJOR_AND_MINOR_ACCIDENTS: 'Acidentes reportados dos tipos: grave e leve',
};

export const NOTIFICATION_CHANNEL_LABELS: Record<NotificationChannel, string> = {
  platform: 'Plataforma',
  whatsapp: 'WhatsApp',
  email: 'Email',
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  critical: 'Crítica',
};
