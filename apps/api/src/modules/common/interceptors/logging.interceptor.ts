import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP_TRAFFIC');

  intercept(context: ExecutionContext, next: CallHandler): any {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          this.logger.log(
            `[${method}] ${url} - SUCCESS - ${duration}ms`
          );

          if (duration > 2000) {
            this.logger.warn(`PERFORMANCE_ALERT: [${method}] ${url} took ${duration}ms`);
          }
        },
        error: (err) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            `[${method}] ${url} - FAILED - ${duration}ms - Error: ${err.message}`
          );
        },
      }),
    );
  }
}
