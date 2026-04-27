# Errores y logging orientados a diagnóstico

## Propósito
Observabilidad con mínima fricción.

## Reglas
- Filtros de excepción mapean dominio → transporte (HTTP/RPC).  
- Estructura sugerida de error:

```json
{ "error": { "code": "DOMAIN_CODE", "message": "...", "traceId": "<uuid>" } }
```

- Agregar `traceId` vía middleware/interceptor.  
- **No** loguear PII ni secretos; logs con metadatos (ids, tamaños, tiempos).  
- Niveles: `debug|log|warn|error`; reducir `debug` en prod.