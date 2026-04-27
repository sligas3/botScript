# Reglas de Documentación para LLMs - Optimizadas

Este directorio contiene reglas organizadas para **minimizar tokens** y aplicar documentación **bajo demanda**.

## 🎯 Estructura Optimizada

### 🔧 [core/](./core/) - Siempre Activas (~3k tokens)
Reglas básicas que se aplican en todas las conversaciones:
- [coding-standards.md](./core/coding-standards.md) - Estándares básicos de documentación
- [git-workflow.md](./core/git-workflow.md) - Versionado de documentación

### 📚 [documentation/](./documentation/) - Todas las Rules
Todas las reglas de documentación organizadas:
- [service-documentation.md](./documentation/service-documentation.md) - Documentación completa
- [readme-structure.md](./documentation/readme-structure.md) - Estructura README
- [swagger-documentation.md](./documentation/swagger-documentation.md) - APIs Swagger
- [events-documentation.md](./documentation/events-documentation.md) - Eventos SNS/SQS
- [feature-flags-documentation.md](./documentation/feature-flags-documentation.md) - Feature flags
- [architecture-documentation.md](./documentation/architecture-documentation.md) - ADRs
- [error-handling-documentation.md](./documentation/error-handling-documentation.md) - Errores
- [evolutionary-documentation.md](./documentation/evolutionary-documentation.md) - Docs evolutivas
- [onboarding-documentation.md](./documentation/onboarding-documentation.md) - Onboarding

### 📚 Saved Prompts - Bajo Demanda (~12k tokens)
Documentación completa solo cuando la solicites:

#### Uso con @prompt:
```bash
# Documentación completa de servicios
@docs-complete "crear documentación para este servicio"

# APIs, eventos y elementos visuales
@api-docs "documentar estos endpoints y eventos SNS"
```

## 📋 Saved Prompts Disponibles

### 📖 `@docs-complete`
**Documentación completa de servicios**
- README.md estructurado (< 5 min setup)
- Documentación detallada en /docs/
- Diagramas C4 y flujos de datos
- Quick start ejecutable
- Enlaces y validaciones

### 🔌 `@api-docs` 
**APIs, eventos y elementos visuales**
- Swagger/OpenAPI completo
- Documentación de eventos SNS/SQS/EventBridge
- Feature flags (Unleash/DB/código/env)
- Diagramas visuales y mapas de endpoints
- Esquemas y ejemplos con iconografía estándar

## 💡 Beneficios de la Nueva Estructura

### ✅ **Ahorro de Tokens**
- **Conversaciones normales**: Solo ~3k tokens (core rules)
- **Documentación completa**: ~15k tokens (solo cuando la pidas)
- **Ahorro promedio**: ~80% en conversaciones de código

### ✅ **Flexibilidad**
- Documentación específica según necesidad
- Múltiples niveles de detalle
- Combinable (puedes usar varios prompts juntos)

### ✅ **Mantenimiento**
- Rules organizadas por propósito
- Fácil actualización independiente
- Menos complejidad en rules core

## 🚀 Cómo Usar

### Para Desarrollo Normal
```bash
"Ayúdame con este código"
# Solo aplica core rules (~3k tokens)
```

### Para Documentación Completa
```bash
"@docs-complete crear documentación para este microservicio"
# Aplica core + documentación completa (~15k tokens)
```

### Para APIs y Visuales
```bash
"@api-docs documentar estos endpoints REST y eventos SNS"
# Aplica core + reglas de APIs + visuales (~10k tokens)
```

## 📊 Comparación de Tokens

| Escenario | Antes | Después | Ahorro |
|-----------|-------|---------|--------|
| Código normal | ~15k | ~3k | 80% |
| Documentación completa | ~15k | ~15k | 0% |
| APIs + visuales | ~15k | ~10k | 33% |

## 🔄 Migración

Las rules anteriores están **preservadas** en los saved prompts. No se pierde funcionalidad, solo se optimiza el uso de tokens.

**Resultado**: Mismo nivel de calidad en documentación, pero **80% menos tokens** en conversaciones normales de desarrollo.