import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome! Do Product related functions in /product portal and Category releated functions in /category';
  }
}
