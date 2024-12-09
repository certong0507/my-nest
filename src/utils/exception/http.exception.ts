import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const arg = host.getArgByIndex(0);

    // if (arg instanceof Socket) {
    //   arg.send(exception.message);
    // } else {
    //   this.catchHttp(exception, host);
    // }

    this.catchHttp(exception, host);
  }

  private catchHttp(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    const exceptionDetail = {
      ...this.extractMessage(message),
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    console.log(' --- [exception]', exception);
    this.logger.error(exception);

    response.status(status).send(exceptionDetail);
  }

  private extractMessage(message: string | any): object {
    if (typeof message === 'string') {
      return { message };
    }
    return { message: message?.message || 'Unknown' };
  }
}
