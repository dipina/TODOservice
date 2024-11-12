import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Serve static files from the public folder
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  // Enable CORS for localhost:3000
  /*
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow requests only from localhost:3000
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Include credentials like cookies in requests
  });*/

  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();


