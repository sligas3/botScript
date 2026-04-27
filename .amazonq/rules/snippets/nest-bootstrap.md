# Bootstrap NestJS

**Instrucciones para Q (reutilizar al crear `main.ts`):**
- Habilitar `helmet`, CORS desde `ALLOWED_ORIGINS`.
- `app.setGlobalPrefix('api')` y versionado por URI.
- `ValidationPipe({ whitelist:true, forbidNonWhitelisted:true, transform:true })`.
- Swagger en `/docs` si `NODE_ENV !== 'production'`.