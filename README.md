Run back-end:
  
  cd todo-service
  
  npm install
  
  npm run start
  
  Go to: /todos

Run the front-end:
  
  cd client
  
  npm install reactstrap bootstrap
  
  npm start
  
  Go to:   http://localhost:3000

Steps to Integrate React Client with NestJS Back-End
====================================================

Build the React Client:
-----------------------
Go to the client directory and build the React application:

cd client
npm install        # Install dependencies
npm run build      # Build the client
This will create a build directory inside client with the production-ready static files.
Move the React Build into the NestJS Directory:

Copy or move the contents of client/build into a new public folder within todo-service.
--------------------------------------------------------------------------------------
You can do this with a command:

cp -r build/* ../todo-service/public/ (Linux)
xcopy build\* ..\todo-service\public\ /E /I (Windows)

Configure NestJS to Serve Static Files:
---------------------------------------
In the todo-service NestJS application, install the serve-static package if not already present:

cd ../todo-service
npm install @nestjs/serve-static

Open src/main.ts and add the following configuration to serve the static files:
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the public folder
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();


Set Up a Fallback Route for the React App:
------------------------------------------
In todo-service/src/app.module.ts, import the ServeStaticModule and configure it to serve the React app:

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'], // Exclude API routes from serving static files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

Run the Combined Application:

Start the NestJS server:
-----------------------
npm run start
Now, visiting the server’s URL (e.g., http://localhost:3000) will serve the React application, while API routes (like http://localhost:3000/api) will remain accessible for backend functions.
By following these steps, your React client will be served from the todo-service NestJS application, creating a unified deployment with the front-end and back-end under the same directory. ​


Commands to remove node_modules
-------------------------------
FOR /d /r %G IN (node_modules) DO @rmdir /s /q "%G" (Windows)

find . -type d -name "node_modules" -exec rm -rf {} + (Linux)
