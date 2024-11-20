import { Injectable } from '@nestjs/common';
import { LibTestService } from '@app/lib-test';

@Injectable()
export class ClientsService {
  constructor(private libTestService: LibTestService) {}

  create(body: any) {
    this.libTestService = new LibTestService();
    return this.libTestService.healt();
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, body: any) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
