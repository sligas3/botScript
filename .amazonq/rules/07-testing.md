# Pruebas útiles primero

## Propósito
Confianza sin sobrecarga.

## Reglas
- **Unit** en application (use-cases) y en mappers/pipes críticos.  
- **Mocks** sobre puertos/repos; evitar mocks de DTOs triviales.  
- **E2E** en rutas críticas (auth/flows transaccionales).  
- Métrica orientativa (no rígida): ~70% por módulo prioritario.  
- Tests de contrato para clientes HTTP externos (p. ej. Zod/ajv).