import { Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('ERROR_CATCH');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException 
      ? exception.getResponse() 
      : (exception as any).message || 'The Neural Link has faded into the void.';

    this.logger.error(`[AURA_FAULT] ${request.method} ${request.url} STATUS:${status}`);

    response.status(status).json({
      statusCode: status,
      auraCode: this.getAuraCode(status),
      message: typeof message === 'object' ? (message as any).message : message,
      timestamp: new Date().toISOString(),
      path: request.url,
      suggestedAuraAction: 'Attempting to restabilize neural frequencies...'
    });
  }

  private getAuraCode(status: number): string {
    if (status === 404) return 'NEURAL_VOID_NOT_FOUND';
    if (status === 403) return 'FORBIDDEN_GATE_LOCKED';
    if (status === 401) return 'UNAUTHORIZED_ESSENCE';
    if (status >= 500) return 'CORE_STABILITY_FAILURE';
    return 'UNKNOWN_DISTURBANCE';
  }
}
