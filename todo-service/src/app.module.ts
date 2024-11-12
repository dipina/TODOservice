import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TodosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'], // Ensures that API routes are not affected by static file serving
    }),
  ],
})
export class AppModule {}
