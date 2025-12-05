# Alert Center Mock Emitter

Simulador de eventos para injetar alertas mock na Central de Alertas da 4Smart. Permite testar fluxos de processamento e validação de payloads de diferentes tipos de alertas.

## 🚀 Stack

- React 19 + TypeScript + Vite
- TanStack Query + Axios
- Tailwind CSS + Radix UI
- Faker.js para geração de dados mock

## 🛠️ Instalação

```bash
npm install
npm run dev
```


## 🎯 Uso

1. **Configure o endpoint** da API diretamente na interface
2. **Selecione a categoria de alerta**:
   - **Trânsito**: Alertas de análise de vídeo
   - **Acidente**: Alertas de acidentes de trânsito
3. **Escolha a política do alerta**:
   - **Trânsito**: Veículo em contrafluxo ou Excesso de velocidade
   - **Acidente**: Acidentes grave/leve (gerados aleatoriamente)
4. **Envie o alerta** - payload é gerado automaticamente com dados realistas

### Configuração do Endpoint

O endpoint da API possui as seguintes características:
- **Valor padrão**: Obtido da variável de ambiente `VITE_API_ENDPOINT` (obrigatório)
- **Edição via interface**: Ative o switch ao lado do campo para editar manualmente

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz para configurar o endpoint da API e notificações Novu:

```env
# Endpoint da API (Obrigatório - valor padrão)
VITE_API_ENDPOINT=https://api.example.com/tasks

# Notificações Novu (Opcional - apenas para desenvolvimento)
VITE_NOVU_APP_ID=seu-application-identifier
VITE_NOVU_AUTH_TOKEN=seu-jwt-token
```

### 🔔 Notificações em Tempo Real (Desenvolvimento)

O projeto inclui suporte para notificações via **Novu** (disponível apenas em modo desenvolvimento).

**Como usar:**
1. Configure as variáveis no `.env`
2. Reinicie o servidor: `npm run dev`
3. Ative "Escutar Notificações Novu" no formulário
4. Pop-ups de notificação aparecerão automaticamente

**Nota:** Em produção (build), o modo de escuta Novu não estará disponível.

## 📡 Tipos de Alerta

### 1. Alertas de Trânsito (Análise de Vídeo)

Baseados em detecção por câmeras de monitoramento:

**Políticas disponíveis:**
- Veículo em contrafluxo (`counterflow_traffic`)
- Veículo em excesso de velocidade (`crossing_a_line`)

**Formato do Payload:**
```json
{
  "toTable": "irisity_events",
  "taskSource": "irisity",
  "payload": [
    {
      "id": "uuid",
      "accountId": "1000000",
      "sensorId": "1234567890123456789",
      "externalSensorId": "",
      "ruleId": "9876543210987654321",
      "externalRuleId": "",
      "eventTime": "1733259600000",
      "description": "",
      "objectType": "Car",
      "behaviorType": "Counterflow Traffic",
      "status": "1",
      "severity": "3",
      "clip": "https://storage.googleapis.com/.../video.mp4",
      "image": "https://storage.googleapis.com/.../image.png"
    }
  ],
  "actionOnDb": "insert"
}
```

### 2. Alertas de Acidente (Waze)

Alertas de acidentes de trânsito reportados:

**Política:**
- Acidentes reportados dos tipos: grave e leve
- Subtipos gerados aleatoriamente: `ACCIDENT_MAJOR` ou `ACCIDENT_MINOR`

**Formato do Payload:**
```json
{
  "toTable": "waze_alerts",
  "taskSource": "waze",
  "payload": [
    {
      "city": "São Caetano do Sul",
      "confidence": 8,
      "nThumbsUp": 5,
      "street": "Avenida Goiás",
      "uuid": "uuid",
      "country": "BR",
      "type": "ACCIDENT",
      "subtype": "ACCIDENT_MAJOR",
      "roadType": 3,
      "reliability": 9,
      "magvar": 180,
      "reportRating": 8,
      "reportByMunicipalityUser": false,
      "pubMillis": 1733259420000,
      "ts": 1733259420000,
      "reportDescription": "Acidente grave com vítimas",
      "geo": "POINT(-46.5547 -23.6227)",
      "blockingAlertUuid": "uuid",
      "tsInsert": "2024-12-03T20:37:00.000Z"
    }
  ],
  "actionOnDb": "insert"
}
```

## 🗺️ Dados Mock

Os dados gerados são baseados em **São Caetano do Sul, SP**:
- Coordenadas reais do centro da cidade
- Ruas e bairros reais da região
- Horários recentes (últimos 3 minutos para acidentes)

## 📝 Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build de produção
npm run lint     # Lint do código
```

## 🏗️ Arquitetura

- **Estado**: React hooks + TanStack Query para cache
- **Formulário**: Estado local com hook customizado
- **API**: Axios com interceptors
- **Tipos**: TypeScript strict mode
- **Geração de Dados**: Faker.js com dados customizados

## 🔄 Fluxo de Envio

1. Usuário seleciona categoria e política
2. `generateMockAlert()` cria payload realista
3. `useSendAlert()` mutation envia para API
4. TanStack Query gerencia loading/error/success states
5. Feedback visual é exibido ao usuário
