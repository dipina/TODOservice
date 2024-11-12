import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, title: 'Sample Task', completed: false },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  create(title: string): Todo {
    const newTodo = { id: Date.now(), title, completed: false };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updatedTodo: Partial<Todo>): Todo | undefined {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      Object.assign(todo, updatedTodo);
    }
    return todo;
  }

  remove(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}
