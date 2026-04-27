# LogicalKeyThrottlerGuard

Ejemplo de guard para rate limit basado en clave lógica (usuario/email) en lugar de IP.

```typescript
import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request } from 'express';

@Injectable()
export class LogicalKeyThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Request): string {
    return (req.headers['x-user-id'] as string)
      || (req.body?.email as string)
      || this.getRequestIP(req);
  }
}
```