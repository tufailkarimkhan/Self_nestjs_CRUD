import { NestFactory } from '@nestjs/core';
import { PersonModule } from './Person/person.module';
const port: number = 3001;

async function bootstrap() {
  const app = await NestFactory.create(PersonModule);
  await app.listen(port, () => {
    console.log(`Server lestion on ${port}`);
  });
}
bootstrap();
