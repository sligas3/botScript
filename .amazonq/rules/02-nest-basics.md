# Patrones Nest preferidos

## Propósito
Controladores delgados, casos de uso claros.

## Reglas
- **Controladores**: validación, mapeo y orquestación mínima; negocio en application/domain.  
- **Inyección** por constructor con `readonly`; evitar `new` directos.  
- **DTO entrada** con `class-validator` / `class-transformer`; **DTO salida** o ViewModel (no entidades).  
- **Pipes globales** sugeridos:  
  `ValidationPipe({ whitelist:true, forbidNonWhitelisted:true, transform:true })`  
- **Versionado** por URI (`v1`) y **prefix** `/api`.  
- Si se necesita respuesta cruda de Express/Fastify, comentar el porqué.