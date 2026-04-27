# 🔄 Migración a Rules Optimizadas

## ✅ Cambios Realizados

### **Antes**: Rules siempre activas (~15k tokens)
```
.amazonq/rules/
├── documentation/          # Siempre cargadas
├── api-docs/              # Siempre cargadas  
├── project-management/    # Siempre cargadas
├── visual/               # Siempre cargadas
├── business/             # Siempre cargadas
└── best-practices/       # Siempre cargadas
```

### **Después**: Rules bajo demanda (~3k tokens base)
```
.amazonq/rules/
├── core/                 # Siempre activas (3k tokens)
│   ├── coding-standards.md
│   └── git-workflow.md
├── documentation/        # Todas las rules de docs
└── README.md            # Guía de uso

~/.aws/amazonq/prompts/   # Bajo demanda (12k tokens)
├── docs-complete.md     # @docs-complete
└── api-docs.md         # @api-docs (incluye visual)
```

## 🎯 Cómo Usar Ahora

### **Desarrollo Normal** (80% menos tokens)
```bash
"Ayúdame con este código TypeScript"
"Revisa esta función"
"Optimiza esta consulta SQL"
```
→ Solo aplica **core rules** (~3k tokens)

### **Documentación Completa** (mismo nivel de calidad)
```bash
"@docs-complete crear documentación para este microservicio"
```
→ Aplica **todas las rules de documentación** (~15k tokens)

### **APIs y Eventos**
```bash
"@api-docs documentar estos endpoints y eventos SNS"
```
→ Aplica **rules específicas de APIs** (~10k tokens)

## 📊 Impacto en Tokens

| Tipo de Conversación | Frecuencia | Tokens Antes | Tokens Después | Ahorro |
|----------------------|------------|--------------|----------------|--------|
| Código/debugging | 80% | 15k | 3k | **80%** |
| Documentación | 15% | 15k | 15k | 0% |
| APIs + visuales | 5% | 15k | 10k | 33% |

**Ahorro promedio**: ~70% en tokens totales

## 🔍 Qué No Cambió

- ✅ **Calidad**: Misma calidad de documentación
- ✅ **Funcionalidad**: Todas las rules están disponibles
- ✅ **Estándares**: Mismos estándares y mejores prácticas
- ✅ **Automatización**: Mismo nivel de automatización

## 🚀 Beneficios

1. **Performance**: Respuestas más rápidas en desarrollo normal
2. **Costo**: 80% menos tokens en conversaciones frecuentes  
3. **Flexibilidad**: Documentación específica según necesidad
4. **Organización**: Rules mejor organizadas por propósito

## 🔄 Rollback

Si necesitas volver al sistema anterior, simplemente:
1. Mueve el contenido de `~/.aws/amazonq/prompts/` de vuelta a `.amazonq/rules/`
2. Restaura la estructura de carpetas original

Los archivos originales están preservados en los saved prompts.