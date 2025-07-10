import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita la validación global de datos
  app.useGlobalPipes(new ValidationPipe());

  // Habilita CORS para permitir peticiones desde otros dominios
  app.enableCors(); // <--- AÑADE ESTA LÍNEA

  await app.listen(3000);
}
bootstrap();