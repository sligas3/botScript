# Reglas para Documentación Completa de Servicios

## Estructura de Documentación
### README.md (Punto de Entrada)
- **Quick Start**: Instalación y primer uso en < 5 minutos
- **Contexto de Negocio**: Propósito, casos de uso, audiencia
- **Diagramas Básicos**: Contexto (C4 L1) y flujo principal
- **Enlaces**: Referencias a documentación detallada
- **Límite**: Máximo 2-3 pantallas de scroll

### Documentación Detallada (/docs/)
- `/docs/api/` - Swagger completo y ejemplos avanzados
- `/docs/architecture/` - Diagramas técnicos y decisiones
- `/docs/deployment/` - Instalación, configuración, CI/CD
- `/docs/events/` - Inventario completo de eventos
- `/docs/troubleshooting/` - Errores y soluciones

## Contenido Obligatorio
### En README.md
- **¿Qué hace?**: 1-2 líneas explicando el propósito
- **Quick Start**: Instalación express y ejemplo funcional
- **Casos de Uso**: 3-5 casos principales en 1-2 líneas cada uno
- **Prerequisitos**: Lista mínima de dependencias
- **Diagrama de Contexto**: C4 Level 1 con Mermaid
- **Enlaces**: Referencias a documentación detallada

### En /docs/api/
- **Swagger completo**: Todos los endpoints documentados
- **Ejemplos avanzados**: Requests/responses complejos
- **Autenticación**: Guías detalladas de seguridad
- **Rate limiting**: Políticas y límites

### En /docs/architecture/
- **Diagramas técnicos**: Componentes, secuencia, base de datos
- **Decisiones de diseño**: ADRs y patrones utilizados
- **Flujo de datos**: Diagramas detallados entre componentes

### En /docs/events/
- **Inventario completo**: SNS/SQS/EventBridge
- **Schemas**: Estructura completa de payloads
- **Diagramas de flujo**: Secuencia de eventos
- **Dead letter queues**: Políticas de retry

### En /docs/deployment/
- **Instalación completa**: Guía paso a paso
- **Configuración**: Variables de entorno y secretos
- **CI/CD**: Scripts de deployment y rollback
- **Monitoreo**: Métricas y alertas

## Diagramas Requeridos
- Arquitectura del sistema (C4 Model nivel 1-2)
- Flujo de datos (Data Flow Diagrams)
- Secuencia para procesos críticos
- Diagrama de base de datos (ERD)
- Diagrama de red/infraestructura
- Flujo de eventos y mensajería
- Mapa de feature flags y su impacto

## Mantenimiento
- Actualizar documentación con cada release
- Validar ejemplos de código funcionan
- Revisar diagramas reflejen estado actual
- Mantener enlaces externos actualizados

## Herramientas Recomendadas
- Mermaid para diagramas en markdown
- OpenAPI/Swagger para documentación de API
- ADR (Architecture Decision Records) para decisiones técnicas
- Docusaurus o GitBook para sitios de documentación