# Estilo TypeScript pragmático

## Propósito
Tipado claro sin exceso.

## Reglas
- **Preferir** tipos explícitos en API públicas; interno puede inferirse.  
- Evitar `any`; si no hay opción, **documentar** la razón y reducir la superficie.  
- **Naming**:
  - Clases/Enums: `PascalCase`; métodos/props: `camelCase`; archivos: `kebab-case`.  
  - DTOs sufijo `Dto`; Enums valores `UPPER_SNAKE_CASE`.  
- Organizar imports (node → terceros → internos) y favorecer `paths` de `tsconfig`.  
- Activar `strict` cuando sea viable; si no, **justificar** exclusiones locales con comentarios.