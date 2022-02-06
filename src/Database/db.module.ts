import { Module } from '@nestjs/common';
import { DbRepository } from './db.repositery';

@Module({
  imports: [],
  providers: [DbRepository],
  exports: [DbRepository],
})
export class dbModule {}
