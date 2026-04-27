# Integraciones AWS

## Propósito
Clientes robustos y trazables.

## Reglas
- SDK v3 modular; timeouts + retry exponencial.  
- Publicar eventos con `idempotencyKey`, `traceId`, `occurredAt` ISO.  
- No loguear payload completo en prod; solo metadatos.  
- Procesos I/O intensivos **fuera** del request-response (colas, jobs).