# Principios de Diseño (Clean, DDD, SOLID)

## Propósito
Alinear decisiones sin rigidez.

## Reglas
- **Preferir** separación de capas (presentation, application, domain, infrastructure).  
- **DDD**: el dominio expresa el lenguaje ubicuo; entidades y VOs sin dependencias de Nest.  
- **SOLID**: priorizar SRP y OCP; **no** forzar patrones si agregan fricción innecesaria.  
- **Trade-offs**: si una regla complica en exceso, **priorizar simplicidad, legibilidad y pruebas**.  
- **Cuando dudes**: deja comentarios breves explicando la elección.