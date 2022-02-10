import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { dbModule } from 'src/Database/db.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  /*Here you have to write module name inside the imports:[] for import*/
  imports: [
    dbModule,
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: 1000 * 15 },
    }),
  ],
  /* Here you have ot write service name which service you have to need*/
  providers: [PersonService],
  /* which service of this module can be exported */
  // exports: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
