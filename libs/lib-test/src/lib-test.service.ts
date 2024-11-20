import { Injectable } from '@nestjs/common';

@Injectable()
export class LibTestService {
  healt() {
    return { message: 'Lib test working successfully', status: 'Ok' }
  }
}