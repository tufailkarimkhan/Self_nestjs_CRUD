import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbRepository } from 'src/Database/db.repositery';
import { Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dbRepository: DbRepository,
  ) {}
  /*Bcrypt hashing password*/
  async encryptPass(name, age, email, password) {
    let pass = await bcrypt.hash(password, 10);
    return this.dbRepository.addUser(name, age, email, pass);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.dbRepository.findUserByEmail(email);

    let hashPass = await bcrypt.compare(password, user.password);
    console.log(`hashPass show from auth service line 22 ${hashPass}`);
    if (hashPass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: any, res) {
    const payload = { email };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
    const token = this.jwtService.sign(payload) as string;
    res.cookie('jwtCookie', token, { maxAge: 1000 * 10 });
  }
}
