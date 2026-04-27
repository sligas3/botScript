# Rate limiting por contexto lógico

## Propósito
Proteger flujos sensibles.

## Reglas
- Usar `@nestjs/throttler`; **no** reinventar guard si no aporta valor.  
- **Clave lógica** (usuario/email/header) sobre IP cuando sea posible.  
- Mensajes neutros en OTP/verify/resend; evitar filtrar información.  
- Límite orientativo para OTP: `limit: 5` en `ttl: 60` (ajustable por env).