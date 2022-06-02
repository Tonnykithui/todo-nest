import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { complete, CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel:Model<TodoDocument>){}

  async create(createTodoDto: CreateTodoDto) {
    if(!createTodoDto.Description || !createTodoDto.Title) throw new HttpException("Please fill in all missing values", HttpStatus.BAD_REQUEST);
    if(!createTodoDto.Completed) createTodoDto.Completed = complete.waiting;
    const newTodo = await new this.todoModel(createTodoDto);
    return newTodo.save();
  }

  async findAll() {
    const tickets = await this.todoModel.find();
    const allTodos = tickets.length;

    const [completedTodos, inprogressTodos, waitingTodos] = await Promise.all([
      tickets.filter((ticket) => ticket.Completed === complete.done),
      tickets.filter((ticket) => ticket.Completed === complete.inprogress),
      tickets.filter((ticket) => ticket.Completed === complete.waiting)
    ])

    const completedNum = completedTodos.length;
    const inprogressNum = inprogressTodos.length;
    const waitingNum = waitingTodos.length;

    return {
      all:allTodos,
      done:completedNum,
      inProgress:inprogressNum,
      notDone:waitingNum,
      completed:completedTodos,
      inprogress:inprogressTodos,
      waiting:waitingTodos
    };
  }

  async findOne(id: string) {
    const todoExists = await this.todoModel.findById({_id:id});
    if(todoExists){
      return todoExists;
    } else {
      throw new NotFoundException("Todo not found")
    }
  }

  async update(id: string, updateTodoDto: Partial<UpdateTodoDto>) {
    const todoExists = await this.findOne(id);
    if(todoExists){
      await this.todoModel.findByIdAndUpdate(id, updateTodoDto);
      return HttpStatus.NO_CONTENT;
    } else {
      throw Error; 
    }
  }

  async remove(id: string) {
    return await this.todoModel.findByIdAndRemove(id);
  }
}
