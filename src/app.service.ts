import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AppService {

  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(){
  }
}
