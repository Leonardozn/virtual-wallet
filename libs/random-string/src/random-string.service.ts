import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomStringService {
  buildString(size: number | null = null): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = size || characters.length;

    for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
