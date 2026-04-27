# Reglas para Documentación de Feature Flags

## Detección de Feature Flags
### Tipos de Implementación
- **Unleash**: Buscar configuraciones y uso de Unleash SDK
- **Base de datos**: Identificar tablas de feature flags
- **Código**: Detectar flags hardcodeados en configuración
- **Variables de entorno**: Flags definidos como env vars

### Patrones de Detección
- Buscar imports de librerías de feature flags
- Identificar condicionales con nombres de features
- Localizar archivos de configuración de flags
- Detectar llamadas a APIs de feature management

## Documentación de Feature Flags
### Información Obligatoria
- **Nombre y propósito**: Descripción clara del feature
- **Tipo de implementación**: Unleash/DB/código/env
- **Estrategias**: Rollout percentage, user segments, etc.
- **Dependencias**: Otros features o servicios afectados
- **Timeline**: Fecha de creación y plan de remoción

### Estados del Feature Flag
- **Desarrollo**: En construcción, no disponible
- **Testing**: Disponible para QA/staging
- **Rollout**: Desplegándose gradualmente
- **Activo**: Completamente desplegado
- **Deprecated**: Marcado para remoción
- **Removido**: Ya no existe en el código

## Gestión de Feature Flags
### Inventario y Lifecycle
- Listar flags activos vs deprecated
- Documentar proceso de cleanup de flags obsoletos
- Incluir métricas de uso cuando estén disponibles
- Mapear impacto en endpoints y funcionalidades

### Estrategias de Rollout
- **Percentage rollout**: Porcentaje de usuarios
- **User segments**: Grupos específicos de usuarios
- **Geographic**: Por región o país
- **A/B testing**: Variantes para experimentación
- **Kill switch**: Capacidad de desactivar rápidamente

## Integración con Documentación
### En APIs
- Agregar feature flags que afectan comportamiento de endpoints
- Documentar respuestas diferentes según flags activos
- Incluir headers o parámetros relacionados con features

### En README
- Crear sección dedicada para feature flags principales
- Listar flags que afectan funcionalidad core
- Incluir instrucciones para activar/desactivar en desarrollo

### Monitoreo
- Documentar métricas de adopción de features
- Incluir alertas para flags problemáticos
- Mapear impacto en performance y errores