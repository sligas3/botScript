# Contratos HTTP estables

## Propósito
APIs predecibles.

## Reglas
- **Swagger/OpenAPI** recomendado; ocultar campos sensibles.  
- Paginación estándar (`page`, `limit`) y `meta` en respuesta.  
- **Idempotency-Key** para POST críticos.  
- **Cache-Control** cuando aplique; **no** cachear PII.  
- Cambios breaking → nueva `vX`; evitar “flags” que cambien contrato.