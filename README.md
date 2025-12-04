# Alert Center Mock Emitter

Simulador de eventos para injetar alertas mock na Central de Alertas da 4Smart. Permite testar fluxos de processamento e validação de payloads.

## 🚀 Stack

- React 19 + TypeScript + Vite
- TanStack Query + Axios
- Tailwind CSS + Radix UI
- Faker.js para dados mock

## 🛠️ Instalação

```bash
npm install
npm run dev
```

## 📦 Estrutura

```
src/
├── components/
│   ├── alert-form.tsx
│   ├── alert-header.tsx
│   ├── alert-type-selector.tsx
│   ├── behavior-type-selector.tsx
│   ├── endpoint-config.tsx
│   ├── alert-status-message.tsx
│   ├── payload-display.tsx
│   └── ui/
├── hooks/
│   ├── mutations/
│   │   └── use-send-alerts.ts
│   └── user-alerts-form.ts
├── services/
│   ├── api/
│   │   └── alertApi.ts
│   └── mock-data-generator.ts
└── types/
    └── alert.types.ts
```

## 🎯 Uso

1. **Configure o endpoint** da API (padrão via `.env`)
2. **Selecione o tipo de alerta** (Vídeo, Trânsito ou Acidente)
3. **Escolha o comportamento** detectado
4. **Envie o alerta** - payload é gerado automaticamente

## 🔧 Configuração

### Variável de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_ENDPOINT=https://api.go.tasks-publisher.dev.4smartcloud.com/tasks

# Notificações Novu (Opcional)
# VITE_NOVU_APP_ID=your-app-id
# VITE_NOVU_AUTH_TOKEN=your-token
# VITE_NOVU_DEVELOPMENT=true
```

O endpoint pode ser alterado na interface e será salvo no localStorage.

### Modo de Teste

Ative o "Modo de Teste" para simular envios sem fazer requisições HTTP reais.

### 🔔 Notificações em Tempo Real (Opcional)

O projeto inclui suporte para notificações via **Novu**. 

**Como usar:**
1. Configure as variáveis no `.env`:
   ```env
   VITE_NOVU_APP_ID=seu-application-identifier
   VITE_NOVU_AUTH_TOKEN=seu-jwt-token
   VITE_NOVU_DEVELOPMENT=true
   ```
2. Reinicie o servidor: `npm run dev`
3. Pop-ups de notificação aparecerão automaticamente no canto superior direito

**Como funciona:**
```tsx
// O hook conecta automaticamente ao Novu via WebSocket
useNovuPopupListener({
  applicationIdentifier: 'SEU_APP_ID',
  authToken: 'SEU_TOKEN',
  enabled: true  // Ativa/desativa listener
});

// Quando uma notificação chega:
// 1. SDK Novu recebe via WebSocket
// 2. Hook processa o payload
// 3. toast.info() exibe pop-up automaticamente
```

## 📡 Formato do Payload (Alertas de Vídeo)

```json
{
  "toTable": "irisity_events",
  "taskSource": "irisity",
  "payload": [
    {
      "id": "uuid",
      "accountId": "1000000",
      "sensorId": "1234567890",
      "ruleId": "9876543210",
      "eventTime": "1733259600000",
      "description": "",
      "objectType": "Person",
      "behaviorType": "Anomaly",
      "status": "1",
      "severity": "2",
      "clip": "https://storage.googleapis.com/.../video.mp4",
      "image": "https://storage.googleapis.com/.../image.png"
    }
  ],
  "actionOnDb": "insert"
}
```

## 📝 Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```
