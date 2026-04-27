# Reglas para Estructura de README.md

## Objetivo del README
- **Puerta de entrada**: Primera impresión del servicio
- **Tiempo límite**: Usuario debe entender y probar en < 5 minutos
- **Longitud máxima**: 2-3 pantallas de scroll
- **Audiencia**: Desarrolladores que ven el repo por primera vez

## Estructura Obligatoria

### 1. Título y Descripción (1-2 líneas)
```markdown
# Nombre del Servicio
Descripción ultra-concisa de qué hace el servicio en 1-2 líneas máximo.
```

### 2. Quick Start (< 5 minutos)
```markdown
## Quick Start
### Prerequisitos
- Node.js 18+
- Docker

### Instalación
\`\`\`bash
npm install && npm start
\`\`\`

### Primer uso
\`\`\`bash
curl http://localhost:3000/health
# Respuesta esperada: {"status": "ok"}
\`\`\`
```

### 3. Casos de Uso (3-5 máximo)
```markdown
## ¿Para qué sirve?
- **Caso 1**: Descripción en 1 línea
- **Caso 2**: Descripción en 1 línea  
- **Caso 3**: Descripción en 1 línea
```

### 4. Diagrama de Contexto
```markdown
## Arquitectura
\`\`\`mermaid
graph TD
    A[Usuario] --> B[Este Servicio]
    B --> C[Base de Datos]
    B --> D[Servicio Externo]
\`\`\`
```

### 5. Enlaces a Documentación
```markdown
## Documentación
- [API Documentation](./docs/api/) - Swagger completo
- [Architecture](./docs/architecture/) - Diagramas técnicos
- [Deployment](./docs/deployment/) - Instalación completa
- [Events](./docs/events/) - SNS/SQS/EventBridge
- [Troubleshooting](./docs/troubleshooting/) - Errores comunes
```

## Lo que NO va en README
- Documentación completa de API
- Diagramas técnicos detallados
- Configuración avanzada
- Lista completa de endpoints
- Detalles de implementación
- Logs y monitoreo detallado

## Validación
- Cada comando debe ser ejecutable sin modificaciones
- Ejemplos deben funcionar con datos incluidos
- Enlaces deben apuntar a documentación existente
- Diagrama debe renderizarse correctamente en GitHub