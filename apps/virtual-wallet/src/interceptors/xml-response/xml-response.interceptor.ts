import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as js2xmlparser from 'js2xmlparser';

@Injectable()
export class XmlResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.setHeader('Content-Type', 'application/xml');

    return next.handle().pipe(
      map((data) => {
        const sanitizedData = this.sanitizeKeys(data);
        return js2xmlparser.parse('response', sanitizedData);
      }),
    );
  }

  private sanitizeKeys(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeKeys(item));
    } else if (typeof data === 'object' && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
        acc[sanitizedKey] = this.sanitizeKeys(data[key]);
        return acc;
      }, {});
    }
    return data;
  }
}