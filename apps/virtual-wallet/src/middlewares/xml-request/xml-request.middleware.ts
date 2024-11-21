import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { parseString } from 'xml2js';

@Injectable()
export class XmlRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.is('xml')) {
      let xml = '';
      req.on('data', (chunk) => {
        xml += chunk;
      });

      req.on('end', () => {
        parseString(xml, { explicitArray: false }, (err, result) => {
          if (err) return res.status(400).send('Invalid XML format');
          req.body = result;
          next();
        });
      });
    } else {
      next();
    }
  }
}
