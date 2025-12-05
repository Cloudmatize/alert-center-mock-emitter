# Regra: Acidentes
([waze_alerts_accident_to_queue()])

**ID:** `7834245d-19a1-4e55-9a23-c16e4bfa25f1`
**Status:** [Ativo]
**Proprietário:** @Waze

## 1. Objetivo

O objetivo desta regra é identificar alertas de congestionamento acidentes de grande ou pequena proporção ocorridos no município.

## 2. Gatilho (Trigger)

* **Evento:** `INSERT`
* **Tabela:** `public.waze_alerts`
* **Função:** `waze_alerts_accident_to_queue()`

## 3. Parâmetros de Entrada

* `NEW.type`: O tipo de alerta Waze.
* `NEW.reliability`: Confiança no alerta com base no usuário que está enviando.
* `NEW.reportRating`: Rank do usuário que está alertando.
* `NEW.confidence`: Confiança no que foi alertado com base na reação dos outros usuários.
* `NEW.pubMillis`: O timestamp (em milissegundos) de quando o Waze publicou o alerta.

## 4. Lógica de Negócio (Condições)

Para um alerta ser processado, TODAS as condições abaixo devem ser verdadeiras:

1.  **É um Acidente:** `NEW.type = 'ACCIDENT'`
2.  **É de ordem Grave OU leve:** `NEW.subtype = ['ACCIDENT_MAJOR', 'ACCIDENT_MINOR']`
3.  **É de um usuário confiável:** `NEW.reliability >=6`
4.  **É de um usuário bem ranqueado:** `NEW.reportRating >=5`
5.  **É um alerta bem avaliado por outro motoristas:** `NEW.confidence >=5`
7.  **É recente:** `NEW."pubMillis" >= (AGORA - 5 minutos)`
8.  **Está Ativo na Configuração:** `na.is_active = true`
9.  **Cidade Bate:** `NEW.city = na.municipality`

## 5. Ação Resultante

* **Se a lógica passar:**
    * Um `INSERT` é feito na tabela `public.alerts_to_send`.
    * Se o alerta já foi enviado antes (baseado no `NEW.uuid`), um `UPDATE` incrementa o `alert_repetition`.
* **Se a lógica falhar:**
    * O `INSERT` em `waze_alerts` é **revertido** (`DELETE FROM public.waze_alerts`).

## 6. Histórico de Mudanças

* **[28/07/2025]:** Regra criada.
* **[14/11/2025]:** Adicionado condicionais para aumentar a confiabilidade do alerta, visando diminuir o número de falsos positivos na plataforma.