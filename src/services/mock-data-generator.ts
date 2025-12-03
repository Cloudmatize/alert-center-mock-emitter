import { faker } from '@faker-js/faker';
import type { 
  AlertPayload,
  VideoAlertPayload,
  LocationAlertPayload,
  AlertType, 
  BehaviorType, 
  NotificationChannel,
  Severity,
  Location 
} from '@/types/alert.types';

// URLs padrão para mídia de alertas
const DEFAULT_ALERT_IMAGE_URL = 'https://storage.googleapis.com/global-4smart-godata-dev-go-alerts-dev/simulator_tests/simulation-test.png';
const DEFAULT_ALERT_VIDEO_URL = 'https://storage.googleapis.com/global-4smart-godata-dev-go-alerts-dev/simulator_tests/video-alert-simulation.mp4';

const SAO_CAETANO_CENTER = {
  lat: -23.6227,
  lng: -46.5547,
};

const SAO_CAETANO_NEIGHBORHOODS = [
  'Centro', 'Barcelona', 'Cerâmica', 'Santa Paula', 'Oswaldo Cruz',
  'Fundação', 'Boa Vista', 'Santo Antonio', 'Nova Gerty', 'Mauá'
];

const SAO_CAETANO_STREETS = [
  'Avenida Goiás', 'Rua São Paulo', 'Rua Amazonas', 'Rua Piauí',
  'Avenida Presidente Kennedy', 'Rua Visconde de Inhaúma', 'Rua Manoel Coelho',
  'Avenida Fernando Simonsen', 'Rua Alegre', 'Rua Santo Antonio'
];

const generateLocation = (): Location => {
  const latOffset = (Math.random() - 0.5) * 0.02;
  const lngOffset = (Math.random() - 0.5) * 0.02;
  
  const rua = faker.helpers.arrayElement(SAO_CAETANO_STREETS);
  const numero = faker.number.int({ min: 1, max: 999 });
  const bairro = faker.helpers.arrayElement(SAO_CAETANO_NEIGHBORHOODS);
  
  return {
    latitude: SAO_CAETANO_CENTER.lat + latOffset,
    longitude: SAO_CAETANO_CENTER.lng + lngOffset,
    address: `${rua}, ${numero} - ${bairro}`,
    city: 'São Caetano do Sul',
    state: 'São Paulo',
  };
};

const generateSeverity = (alertType: AlertType): Severity => {
  const severityMap: Record<AlertType, Severity[]> = {
    accident: ['high', 'critical'],
    traffic: ['low', 'medium', 'high'],
    video: ['medium', 'high', 'critical'],
  };
  
  const options = severityMap[alertType];
  return faker.helpers.arrayElement(options);
};

const generateDescription = (alertType: AlertType, behaviorType: BehaviorType): string => {
  const descriptions: Record<AlertType, Record<string, string[]>> = {
    traffic: {
      crossing_a_line: [
        'Veículo cruzou linha contínua na via principal',
        'Pedestre atravessou fora da faixa de segurança',
        'Motocicleta ultrapassou em local proibido',
      ],
      stopped_vehicle: [
        'Veículo parado em local não permitido',
        'Carro estacionado em fila dupla',
        'Veículo quebrado na pista',
      ],
      counterflow_traffic: [
        'Veículo trafegando na contramão',
        'Motocicleta em sentido contrário ao fluxo',
      ],
      default: [
        'Congestionamento detectado na via',
        'Fluxo de tráfego irregular',
      ],
    },
    video: {
      anomaly: [
        'Comportamento anômalo detectado nas câmeras',
        'Padrão de movimento incomum identificado',
      ],
      crowd_density: [
        'Alta densidade de pessoas detectada',
        'Aglomeração acima do limite permitido',
      ],
      unattended_object: [
        'Objeto abandonado detectado',
        'Mala suspeita identificada',
      ],
      smoke_and_fire: [
        'Fumaça detectada pelas câmeras',
        'Possível princípio de incêndio',
      ],
      default: [
        'Evento detectado pelo sistema de vídeo',
      ],
    },
    accident: {
      slip_and_fall: [
        'Queda de pessoa detectada',
        'Acidente com pedestre',
      ],
      default: [
        'Acidente de trânsito reportado',
        'Colisão entre veículos',
        'Acidente com vítimas',
      ],
    },
  };

  const typeDescriptions = descriptions[alertType];
  const behaviorDescriptions = typeDescriptions[behaviorType] || typeDescriptions.default;
  
  return faker.helpers.arrayElement(behaviorDescriptions);
};

const generateMetadata = (alertType: AlertType, _behaviorType: BehaviorType) => {
  const baseMetadata = {
    cameraId: faker.string.alphanumeric(8).toUpperCase(),
    confidence: faker.number.float({ min: 0.7, max: 0.99, fractionDigits: 2 }),
    detectionTime: faker.number.int({ min: 100, max: 5000 }), // ms
  };

  if (alertType === 'video') {
    return {
      ...baseMetadata,
      frameNumber: faker.number.int({ min: 1000, max: 99999 }),
      videoSource: faker.helpers.arrayElement(['camera-01', 'camera-02', 'camera-03']),
    };
  }

  if (alertType === 'traffic') {
    return {
      ...baseMetadata,
      vehicleType: faker.helpers.arrayElement(['car', 'motorcycle', 'truck', 'bus']),
      licensePlate: faker.vehicle.vrm(),
      speed: faker.number.int({ min: 20, max: 120 }),
    };
  }

  return baseMetadata;
};

const BEHAVIOR_TYPE_TO_STRING: Record<BehaviorType, string> = {
  anomaly: 'Anomaly',
  asset_protection: 'Asset Protection',
  counterflow_traffic: 'Counterflow Traffic',
  crossing_a_line: 'Crossing a Line',
  crowd_density: 'Crowd Density',
  grouping: 'Grouping',
  moving_in_area: 'Moving in Area',
  slip_and_fall: 'Slip and Fall',
  smoke_and_fire: 'Smoke and Fire',
  stopped_vehicle: 'Stopped Vehicle',
  unattended_object: 'Unattended Object',
};

const generateVideoAlert = (behaviorType: BehaviorType): VideoAlertPayload => {
  const eventTime = Date.now().toString();
  
  return {
    id: faker.string.uuid(),
    accountId: '1000000',
    sensorId: faker.string.numeric(19),
    externalSensorId: '',
    ruleId: faker.string.numeric(19),
    externalRuleId: '',
    eventTime,
    description: '',
    objectType: faker.helpers.arrayElement(['Person', 'Car', 'Truck', 'Motorcycle', 'Bus']),
    behaviorType: BEHAVIOR_TYPE_TO_STRING[behaviorType],
    status: '1',
    severity: faker.helpers.arrayElement(['1', '2', '3', '4']),
    clip: DEFAULT_ALERT_VIDEO_URL,
    image: DEFAULT_ALERT_IMAGE_URL,
  };
};

const generateLocationAlert = (
  alertType: AlertType,
  behaviorType: BehaviorType,
  notificationChannels: NotificationChannel[]
): LocationAlertPayload => {
  return {
    alertType,
    behaviorType,
    notificationChannels,
    timestamp: new Date().toISOString(),
    location: generateLocation(),
    severity: generateSeverity(alertType),
    description: generateDescription(alertType, behaviorType),
    metadata: generateMetadata(alertType, behaviorType),
  };
};

export const generateMockAlert = (
  alertType: AlertType,
  behaviorType: BehaviorType,
  notificationChannels: NotificationChannel[]
): AlertPayload => {
  if (alertType === 'video') {
    return generateVideoAlert(behaviorType);
  }
  
  return generateLocationAlert(alertType, behaviorType, notificationChannels);
};
