# Puertos y Adaptadores

## Propósito
Aislar dominio y facilitar tests.

## Reglas
- **Puertos** (interfaces) viven en `application` o `domain`; **adaptadores** en `infrastructure`.  
- **No** importar `infrastructure` desde `domain`/`application`.  
- **Mappers** explícitos entre entidades ↔ persistencia/HTTP.  
- **Domain Services** para reglas de negocio que no caben en entidades/VOs.  
- Aceptar excepciones puntuales si simplifican mucho un caso; **anotar** el motivo.