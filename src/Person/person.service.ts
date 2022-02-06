import { Injectable } from '@nestjs/common';
import { DbRepository } from 'src/Database/db.repositery';

@Injectable()
export class PersonService {
  constructor(private dbRepository: DbRepository) {}

  async register(name: string, age: number, email: string, password: string) {
    let userInfo = await this.dbRepository.addUser(name, age, email, password);
    return userInfo;
  }
  async genBill(userId, payId) {
    let billInfo = this.dbRepository.genrateBill(userId, payId);
  }
}
