import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow requests only from localhost:3000
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Include credentials like cookies in requests
  });

  await app.listen(4000); // Assuming your NestJS app runs on a different port
}
bootstrap();
