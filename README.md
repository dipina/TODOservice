# Instructions on how to deploy in Render this app

## Steps for deployment 

You may clone the service from [https://github.com/dipina/TODOservice](TODO Service's GitHub repository) 

* Log in to Render.com using your GitHub account.
* Click on "New > Web Service."
* Connect the GitHub repository you've just created to your Render account.
* On the following screen, give your project a name, accept all defaults and the free tier, and click "Deploy."

Now, sit back and wait for the deployment to complete, which may take some time. Once it's done, you can find the URL in the upper left-hand corner.

## Run back-end:
Steps to run manually the server side:

```bash
cd todo-service
npm install
npm run start
```  
Go to: /todos


## Run the front-end:
Steps to run manually the client side:

```bash
cd client
npm install reactstrap bootstrap
npm start
```
Go to:   http://localhost:3000

## Steps to Integrate React Client with NestJS Back-End

### Build the React Client:
Go to the client directory and build the React application:
```bash
cd client
npm install        # Install dependencies
npm run build      # Build the client
```

This will create a build directory inside client with the production-ready static files.
Move the React Build into the NestJS Directory:

### Copy or move the contents of client/build into a new public folder within todo-service.
You can do this with a command:

```bash
cp -r build/* ../todo-service/public/ (Linux)
xcopy build\* ..\todo-service\public\ /E /I (Windows)
```

### Configure NestJS to Serve Static Files:
In the todo-service NestJS application, install the serve-static package if not already present:

```bash
cd ../todo-service
npm install @nestjs/serve-static
```

Open src/main.ts and add the following configuration to serve the static files:

```typescript
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
```

### Set Up a Fallback Route for the React App:
In todo-service/src/app.module.ts, import the ServeStaticModule and configure it to serve the React app:

```typescript
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
```

### Run the Combined Application:

Start the NestJS server:

```bash
npm run start
```

Now, visiting the server’s URL (e.g., http://localhost:3000) will serve the React application, while API routes (like http://localhost:3000/api) will remain accessible for backend functions.
By following these steps, your React client will be served from the todo-service NestJS application, creating a unified deployment with the front-end and back-end under the same directory. ​


### Commands to remove node_modules
```bash
FOR /d /r %G IN (node_modules) DO @rmdir /s /q "%G" (Windows)
find . -type d -name "node_modules" -exec rm -rf {} + (Linux)
```
