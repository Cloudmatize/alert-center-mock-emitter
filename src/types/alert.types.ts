export type AlertType = 'traffic' | 'video' | 'accident';

export type AccidentSubtype = 'ACCIDENT_MAJOR' | 'ACCIDENT_MINOR';

export type BehaviorType =
  | 'anomaly'
  | 'asset_protection'
  | 'counterflow_traffic'
  | 'crossing_a_line'
  | 'crowd_density'
  | 'grouping'
  | 'moving_in_area'
  | 'slip_and_fall'
  | 'smoke_and_fire'
  | 'stopped_vehicle'
  | 'unattended_object';

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
  subtype: AccidentSubtype;
  roadType: number;
  reliability: number;
  magvar: number;
  reportRating: number;
  reportByMunicipalityUser: boolean;
  pubMillis: number;
  ts: number;
  reportDescription: string;
  geo: string;
  blockingAlertUuid: string | null;
  tsInsert: number;
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
  traffic: 'Trânsito',
  video: 'Vídeo',
  accident: 'Acidente',
};

export const ALERT_TYPE_DESCRIPTIONS: Record<AlertType, string> = {
  video: 'Envie alertas baseados em análise de vídeo, detectando eventos e anomalias capturadas pelas câmeras de monitoramento. Ideal para identificação de situações que requerem atenção imediata.',
  traffic: 'Notifique sobre congestionamentos, bloqueios de via ou alterações no fluxo de tráfego em tempo real. O sistema processa e envia automaticamente os dados de trânsito para os serviços de monitoramento.',
  accident: 'Dispare notificações de emergência para acidentes de trânsito, acionando automaticamente os serviços de resposta apropriados. Inclui informações sobre localização, severidade e recursos necessários.',
};

export const ALERT_TYPE_AVAILABLE: Record<AlertType, boolean> = {
  traffic: false,
  video: true,
  accident: true,
};

export const BEHAVIOR_TYPE_LABELS: Record<BehaviorType, string> = {
  anomaly: 'Anomalia',
  asset_protection: 'Proteção de ativo',
  counterflow_traffic: 'Tráfego em contramão',
  crossing_a_line: 'Cruzamento de linha',
  crowd_density: 'Densidade de pessoas',
  grouping: 'Agrupamento',
  moving_in_area: 'Movimento em área',
  slip_and_fall: 'Queda de pessoa',
  smoke_and_fire: 'Fumaça detectada',
  stopped_vehicle: 'Veículo parado',
  unattended_object: 'Objeto abandonado',
};

export const ACCIDENT_SUBTYPE_LABELS: Record<AccidentSubtype, string> = {
  ACCIDENT_MAJOR: 'Acidente Grave',
  ACCIDENT_MINOR: 'Acidente Leve',
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
