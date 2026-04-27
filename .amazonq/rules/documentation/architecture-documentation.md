# Reglas para Documentación de Arquitectura

## Architecture Decision Records (ADRs)
### Estructura Obligatoria
- **Título**: Decisión tomada en formato imperativo
- **Estado**: Propuesto, Aceptado, Deprecated, Superseded
- **Contexto**: Situación que motivó la decisión
- **Decisión**: Qué se decidió y por qué
- **Consecuencias**: Impactos positivos y negativos

### Template ADR
```markdown
# ADR-001: Usar PostgreSQL como base de datos principal

## Estado
Aceptado

## Contexto
Necesitamos una base de datos que soporte transacciones ACID y consultas complejas.

## Decisión
Usaremos PostgreSQL como base de datos principal por su robustez y extensibilidad.

## Consecuencias
### Positivas
- ACID compliance
- Extensiones avanzadas (JSON, full-text search)
- Comunidad activa

### Negativas
- Mayor complejidad operacional vs NoSQL
- Requiere más recursos que SQLite
```

## Diagramas de Arquitectura (C4 Model)
### Level 1: System Context
- Sistema como caja negra
- Usuarios y sistemas externos
- Máximo 9 elementos

### Level 2: Container Diagram
- Aplicaciones y servicios principales
- Tecnologías utilizadas
- Protocolos de comunicación

### Level 3: Component Diagram
- Componentes dentro de cada container
- Responsabilidades específicas
- Interfaces entre componentes

### Level 4: Code Diagram
- Clases y métodos principales
- Solo para componentes críticos
- UML o diagramas de secuencia

## Documentación de Patrones
### Patrones Arquitectónicos
- **Microservicios**: Comunicación, data consistency, deployment
- **Event-Driven**: Event sourcing, CQRS, saga patterns
- **Layered Architecture**: Separación de responsabilidades
- **Hexagonal Architecture**: Ports and adapters

### Patrones de Integración
- **API Gateway**: Routing, authentication, rate limiting
- **Circuit Breaker**: Fault tolerance, fallback strategies
- **Bulkhead**: Resource isolation
- **Retry Patterns**: Exponential backoff, jitter

## Documentación de Infraestructura
### Infrastructure as Code
- **Terraform/CDK**: Documentar recursos y dependencias
- **Kubernetes**: Manifests, operators, custom resources
- **Docker**: Dockerfiles, compose files, multi-stage builds
- **CI/CD**: Pipelines, deployment strategies, rollback procedures

### Observabilidad
- **Logging**: Structured logging, log levels, retention
- **Metrics**: Business metrics, technical metrics, SLIs/SLOs
- **Tracing**: Distributed tracing, correlation IDs
- **Alerting**: Alert rules, escalation procedures, runbooks

## Documentación de Seguridad
### Security Architecture
- **Authentication**: Métodos, tokens, session management
- **Authorization**: RBAC, ABAC, resource-level permissions
- **Data Protection**: Encryption at rest/transit, PII handling
- **Network Security**: Firewalls, VPNs, network segmentation

### Threat Model
- **Assets**: Qué proteger (datos, servicios, infraestructura)
- **Threats**: Posibles ataques y vulnerabilidades
- **Mitigations**: Controles de seguridad implementados
- **Risk Assessment**: Probabilidad e impacto de amenazas

## Documentación de Performance
### Capacity Planning
- **Load Testing**: Resultados, bottlenecks identificados
- **Scaling Strategies**: Horizontal vs vertical, auto-scaling
- **Resource Requirements**: CPU, memoria, storage, network
- **Performance Budgets**: Límites aceptables de latencia/throughput

### Optimization Strategies
- **Caching**: Estrategias, invalidation, cache hierarchy
- **Database**: Indexing, query optimization, connection pooling
- **CDN**: Content distribution, edge caching
- **Compression**: Gzip, Brotli, image optimization