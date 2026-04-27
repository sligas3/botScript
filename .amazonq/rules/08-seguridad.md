# Seguridad pragmática

## Propósito
Reducir superficie de riesgo.

## Reglas
- `helmet`, CORS limitado por env, deshabilitar `x-powered-by`.  
- Config centralizada (`@nestjs/config`); evitar `process.env` directo en código de negocio.  
- Secretos vía vault/SSM/Secrets Manager.  
- Sanitizar entrada/salida; validar siempre datos externos.  
- Preferir **JWT RS256**/Cognito; refresco rotativo si aplica.