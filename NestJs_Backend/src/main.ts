import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation for request payloads
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strip unknown properties
      forbidNonWhitelisted: true, // Throw an error if unknown properties are present
      transform: true, // Automatically transform payloads to match DTO types
    }),
  );

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Enable CORS for cross-origin requests
  app.enableCors();

  const port = 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
