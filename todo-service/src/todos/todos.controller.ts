import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todos.service';  // Import the Todo type

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {  // Specify return type as Todo[]
    return this.todosService.findAll();
  }

  @Post()
  create(@Body('title') title: string): Todo {  // Specify return type as Todo
    return this.todosService.create(title);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; completed?: boolean }
  ): Todo | undefined {  // Specify return type as Todo or undefined
    return this.todosService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.todosService.remove(Number(id));
  }
}
