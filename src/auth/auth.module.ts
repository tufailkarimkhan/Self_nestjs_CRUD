import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PersonModule } from 'src/Person/person.module';

import {} from './guards/jwt.auth.guard';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from './guards/local-auth';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   imports:[PersonModule],
    //   inject:[PersonService],
    //   useFactory:async(personService:PersonService)=>({
    //     secret:
    //   })
    // })
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '60s' },
    }),
    PersonModule,
  ],
  providers: [AuthService, LocalAuthGuard, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
