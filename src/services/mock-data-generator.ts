import { faker } from '@faker-js/faker';
import type {
  AlertPayload,
  VideoAlertPayload,
  WazeAccidentPayload,
  AlertType,
  BehaviorType,
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

const BEHAVIOR_TYPE_TO_STRING: Record<BehaviorType, string> = {
  counterflow_traffic: 'Counterflow Traffic',
  crossing_a_line: 'Crossing a Line',
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

const generateWazeAccident = (): WazeAccidentPayload => {
  const location = generateLocation();
  const now = Date.now();
  const pubMillis = now - 180000; // 3 minutos atrás

  const street = faker.helpers.arrayElement(SAO_CAETANO_STREETS);
  
  // Gera aleatoriamente entre grave e leve
  const randomSubtype = faker.helpers.arrayElement(['ACCIDENT_MAJOR', 'ACCIDENT_MINOR']);

  return {
    city: 'São Caetano do Sul',
    confidence: faker.number.int({ min: 6, max: 10 }), 
    nThumbsUp: faker.number.int({ min: 0, max: 15 }),
    street,
    uuid: faker.string.uuid(),
    country: 'BR',
    type: 'ACCIDENT',
    subtype: randomSubtype,
    roadType: faker.number.int({ min: 1, max: 7 }),
    reliability: faker.number.int({ min: 6, max: 10 }), 
    magvar: faker.number.int({ min: 0, max: 360 }),
    reportRating: faker.number.int({ min: 5, max: 10 }), 
    reportByMunicipalityUser: faker.datatype.boolean(),
    pubMillis,
    ts: pubMillis,
    reportDescription: randomSubtype === 'ACCIDENT_MAJOR'
      ? faker.helpers.arrayElement([
        'Acidente grave com vítimas',
        'Colisão com múltiplos veículos',
        'Acidente com bloqueio total da via'
      ])
      : faker.helpers.arrayElement([
        'Pequena colisão',
        'Acidente sem vítimas',
        'Veículos com danos leves'
      ]),
    geo: `POINT(${location.longitude} ${location.latitude})`,
    blockingAlertUuid: randomSubtype === 'ACCIDENT_MAJOR' ? faker.string.uuid() : null,
    tsInsert: new Date(pubMillis).toISOString(),
  };
};

export const generateMockAlert = (
  alertType: AlertType,
  behaviorType: BehaviorType
): AlertPayload => {
  if (alertType === 'traffic') {
    return generateVideoAlert(behaviorType);
  }

  return generateWazeAccident();
};
