import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { Transaction } from 'mongodb';
import { PersonService } from './person.service';
@Controller()
export class PersonController {
  constructor(public personService: PersonService) {}
  @Post('/register')
  async register(@Body() { name, age, email, password }) {
    return await this.personService.register(name, age, email, password);
  }

  @Post('/payment')
  async generateBill(@Body() email: string) {
    user = await this.personService.findUser({ email: email });
    transaction;
    if (user) {
      this.personService.genBill(user._id, transaction._id);
    }
  }
}
