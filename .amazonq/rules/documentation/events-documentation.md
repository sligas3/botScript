# Reglas para Documentación de Eventos

## Eventos y Mensajería
### Identificación Automática
- Buscar y documentar todos los eventos SNS, SQS y EventBridge
- Identificar publishers y consumers de cada evento
- Mapear flujo de eventos entre servicios
- Documentar dead letter queues y retry policies

### Documentación de Eventos
- **Nombre del evento**: Usar convención clara y consistente
- **Schema del payload**: Estructura completa con tipos y ejemplos
- **Trigger conditions**: Cuándo y por qué se dispara el evento
- **Consumers**: Qué servicios procesan el evento
- **Error handling**: Manejo de fallos y reintentos

### Diagramas de Eventos
- Crear diagramas de flujo de eventos con Mermaid
- Mostrar secuencia temporal de eventos
- Incluir puntos de fallo y recuperación
- Documentar patrones de mensajería (pub/sub, request/reply)

## Tipos de Eventos AWS
### SNS (Simple Notification Service)
- Documentar topics y subscriptions
- Incluir políticas de acceso
- Mapear filtros de mensajes
- Documentar delivery policies

### SQS (Simple Queue Service)
- Documentar colas estándar vs FIFO
- Incluir configuración de visibility timeout
- Documentar dead letter queues
- Mapear message retention policies

### EventBridge
- Documentar event buses y rules
- Incluir event patterns y targets
- Mapear transformaciones de eventos
- Documentar archive y replay policies

## Integración con Documentación
- Incluir eventos en documentación de endpoints relacionados
- Crear sección dedicada en README para eventos principales
- Mantener inventario actualizado en cada release
- Documentar dependencias entre eventos y servicios