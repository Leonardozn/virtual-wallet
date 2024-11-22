import { Injectable } from '@nestjs/common';
import { parseString } from 'xml2js'; 
import { promisify } from 'util';
const parseStringAsync = promisify(parseString);

@Injectable()
export class XmlToJsonService {
  static async parse(data: any) {
    const result = await parseStringAsync(data, { explicitArray: false });
    return result;
  }
}
