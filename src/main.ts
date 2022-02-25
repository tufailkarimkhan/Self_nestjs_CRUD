import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { PersonModule } from './Person/person.module';
const port: number = 3001;

async function bootstrap() {
  const app = await NestFactory.create(PersonModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe(),
  ); /*here i defined global validation pipe with the help of this we are use dto very easily*/
  await app.listen(port, () => {
    console.log(`Server listen on ${port}`);
  });
}
bootstrap();
