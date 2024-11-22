import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjService {
  parse(obj: any) {
    if (typeof obj === 'string') {
      if (Types.ObjectId.isValid(obj)) return new Types.ObjectId(obj);
    }
  
    if (Array.isArray(obj)) {
      return obj.map(item => this.parse(item));
    }
  
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj[key] = this.parse(obj[key]);
        }
      }
    }
  
    return obj;
  }
}
