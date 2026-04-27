# Estructura y módulos

## Propósito
Consistencia sin dogma.

## Reglas
- **Preferir** feature-first con capas internas:  

src/<feature>/
  presentation/ (controllers, dto view)
  application/  (use-cases, ports, services orquestadores)
  domain/       (entities, value-objects, domain services, events)
  infrastructure/ (adapters: repos, http, orm, mappers)


- `main.ts` delgado: bootstrap, pipes, seguridad, versionado.  
- Permitir “módulos utilitarios” (p. ej. `shared/`) con criterio: evitar acoplamientos circulares.