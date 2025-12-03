export type AlertType = 'traffic' | 'video' | 'accident';

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

// Payload para alertas de vídeo (formato IrisPlus)
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

// Payload para alertas de trânsito e acidente (com localização)
export interface LocationAlertPayload {
  alertType: AlertType;
  behaviorType: BehaviorType;
  notificationChannels: NotificationChannel[];
  timestamp: string;
  location: Location;
  severity: Severity;
  description: string;
  metadata?: Record<string, any>;
}

export type AlertPayload = VideoAlertPayload | LocationAlertPayload;

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

// Labels para exibição na UI
export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  video: 'Vídeo',
  traffic: 'Trânsito',
  accident: 'Acidente',
};

export const ALERT_TYPE_DESCRIPTIONS: Record<AlertType, string> = {
  video: 'Envie alertas baseados em análise de vídeo, detectando eventos e anomalias capturadas pelas câmeras de monitoramento. Ideal para identificação de situações que requerem atenção imediata.',
  traffic: 'Notifique sobre congestionamentos, bloqueios de via ou alterações no fluxo de tráfego em tempo real. O sistema processa e envia automaticamente os dados de trânsito para os serviços de monitoramento.',
  accident: 'Dispare notificações de emergência para acidentes de trânsito, acionando automaticamente os serviços de resposta apropriados. Inclui informações sobre localização, severidade e recursos necessários.',
};

export const ALERT_TYPE_AVAILABLE: Record<AlertType, boolean> = {
  video: true,
  traffic: false,
  accident: false,
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
