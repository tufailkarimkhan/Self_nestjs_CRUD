import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from 'src/Person/person.service';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private personService: PersonService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.personService.findByUserId(username);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
