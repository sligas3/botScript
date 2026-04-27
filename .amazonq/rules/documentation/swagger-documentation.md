# Reglas para Documentación de Endpoints en Swagger

## Estructura de Endpoints
- Cada endpoint DEBE tener un summary conciso y descriptivo
- Incluir description detallada explicando el propósito y comportamiento
- Usar tags para agrupar endpoints relacionados
- Definir operationId único y descriptivo

## Parámetros y Schemas
- Todos los parámetros DEBEN incluir description, type y example
- Usar schemas reutilizables para objetos complejos
- Definir required fields claramente
- Incluir format para tipos específicos (email, date, uuid)

## Respuestas HTTP
- Documentar TODOS los códigos de respuesta posibles (200, 400, 401, 404, 500)
- Incluir schema de respuesta para cada código
- Agregar examples realistas para responses exitosas y de error
- Usar description específica para cada código de error

## Seguridad
- Definir security schemes (Bearer, API Key, OAuth2)
- Aplicar security requirements a endpoints protegidos
- Documentar scopes necesarios para OAuth2

## Ejemplos y Validaciones
- Incluir examples en request body y responses
- Usar pattern para validaciones regex
- Definir minimum/maximum para números
- Especificar minLength/maxLength para strings

## Metadatos
- Incluir version del API
- Agregar contact information
- Definir servers para diferentes ambientes
- Usar externalDocs para documentación adicional