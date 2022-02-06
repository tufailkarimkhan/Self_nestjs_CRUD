import { Module } from '@nestjs/common';
import { dbModule } from 'src/Database/db.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  /*Here you have to write module name inside the imports:[] for import*/
  imports: [dbModule],
  /* Here you have ot write service name which service you have to need*/
  providers: [PersonService],
  /* which service of this module can be exported */
  // exports: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
