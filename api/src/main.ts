import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  console.log('SPROUT API listening on port 3000');
}
bootstrap();
