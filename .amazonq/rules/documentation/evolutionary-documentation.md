# Reglas para Documentación Evolutiva

## Principios de Documentación Viva
### Automatización de Actualizaciones
- **Sincronización con código**: Documentación se actualiza automáticamente con cambios
- **Detección de obsolescencia**: Identificar documentación desactualizada
- **Versionado de docs**: Mantener versiones de documentación alineadas con releases
- **Validación continua**: CI/CD valida que ejemplos funcionen

### Métricas de Salud de Documentación
- **Freshness**: Tiempo desde última actualización vs cambios en código
- **Coverage**: Porcentaje de APIs/features documentadas
- **Usage**: Qué documentación se consulta más
- **Feedback**: Sistema de rating y comentarios

## Estrategias de Mantenimiento
### Detección Automática de Cambios
- **API Changes**: Detectar nuevos endpoints, parámetros modificados
- **Schema Changes**: Cambios en modelos de datos
- **Breaking Changes**: Identificar incompatibilidades automáticamente
- **Dependency Updates**: Cambios en librerías que afecten documentación

### Alertas y Notificaciones
- **Stale Documentation**: Documentos no actualizados en X días
- **Missing Documentation**: Nuevas features sin documentar
- **Broken Examples**: Ejemplos que fallan en CI
- **Inconsistent Versions**: Documentación desalineada con código

## Templates Evolutivos
### Documentación Generativa
- **Auto-generated APIs**: Swagger desde anotaciones en código
- **Schema Documentation**: Documentación de BD desde migraciones
- **Event Schemas**: Documentación de eventos desde definiciones
- **Dependency Graphs**: Diagramas generados desde análisis de código

### Placeholders Inteligentes
- **Version Placeholders**: `{{CURRENT_VERSION}}` se reemplaza automáticamente
- **Example Data**: Datos de ejemplo actualizados desde tests
- **Configuration**: Variables de entorno documentadas desde código
- **Performance Metrics**: Métricas reales insertadas automáticamente

## Feedback Loop
### Métricas de Uso
- **Page Views**: Qué documentación se consulta más
- **Search Queries**: Qué buscan los usuarios y no encuentran
- **Time on Page**: Qué documentación es más útil
- **Exit Points**: Dónde abandonan la documentación

### Mejora Continua
- **A/B Testing**: Probar diferentes formatos de documentación
- **User Journey**: Mapear cómo navegan los usuarios
- **Gap Analysis**: Identificar documentación faltante
- **Quality Scoring**: Puntuar calidad basado en métricas

## Integración con Desarrollo
### Documentation-Driven Development
- **Docs First**: Escribir documentación antes que código
- **Living Specifications**: Documentación como especificación ejecutable
- **Contract Testing**: Validar que código cumple con documentación
- **Behavioral Documentation**: Documentar comportamiento esperado

### Automatización en CI/CD
- **Doc Generation**: Generar documentación en cada build
- **Link Validation**: Verificar que todos los enlaces funcionen
- **Example Testing**: Ejecutar ejemplos de documentación
- **Spell Check**: Validación ortográfica automática