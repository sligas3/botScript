# Reglas para Documentación de Manejo de Errores

## Catálogo de Errores
### Estructura Obligatoria
- **Código de error**: HTTP status + código interno
- **Mensaje**: Descripción clara para desarrolladores
- **Causa**: Por qué ocurre el error
- **Solución**: Pasos específicos para resolverlo
- **Ejemplo**: Request que reproduce el error

### Categorización
- **4xx Client Errors**: Errores del usuario/cliente
- **5xx Server Errors**: Errores internos del servicio
- **Business Logic Errors**: Errores de reglas de negocio
- **Integration Errors**: Fallos con servicios externos

## Documentación de Respuestas de Error
### Formato Estándar
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Los datos enviados no son válidos",
    "details": ["El email es requerido", "La edad debe ser mayor a 0"],
    "timestamp": "2024-01-15T10:30:00Z",
    "traceId": "abc123"
  }
}
```

### Información Requerida
- Estructura consistente de respuestas de error
- Códigos de error únicos y descriptivos
- Mensajes orientados al desarrollador
- Detalles específicos cuando sea posible
- Trace ID para debugging

## Troubleshooting
### Problemas Comunes
- Listar los 5 errores más frecuentes
- Incluir síntomas y diagnóstico
- Proporcionar soluciones paso a paso
- Agregar comandos de verificación

### Logs y Monitoreo
- Qué logs revisar para cada tipo de error
- Métricas clave para monitorear
- Alertas recomendadas
- Dashboards sugeridos