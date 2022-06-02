import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({summary:'Create a new Todo'})
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        Title:{
          type:'string',
          example:'Clean',
          description:'Title to hightlight the Todo objective'
        },
        Description:{
          type:'string',
          example:'Washing dishes and clothes thatt are dirty',
          description:'Provide an overview of the activity to perfom'
        },
        Completed:{
          type:'string',
          example:'done',
          description:'shows the Todo status'
        }
      }
    }
  })
  @ApiResponse({
    status:200,
    description:'Todo succesfully created'
  })
  @ApiResponse({
    status:403,
    description:'Request Forbidden'
  })
  @ApiResponse({
    status:401,
    description:'Unauthorized'
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({summary:'Get all Todo logged in the system'})
  @ApiResponse({
    status:200,
    description:'List of Todos...',
    schema:{
      type:'array',
      items:{
        type:'object',
        properties:{
          id:{
            type:'string',
            description:'Unique id for todo',
            example:'dewiwfjb29434r'
          },
          Title:{
            type:'string',
            description:'The set title for the Todo',
            example:'Clean'
          },
          Description:{
            type:'string',
            description:'Overview of the set Todo',
            example:'Washing of dishes  and clothes'
          },
          Complete:{
            type:'string',
            description:'Show status of the todo',
            example:'Waiting'
          }
        }
      }
    }
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Get single Todo'})
  @ApiParam({
    name:'id',
    type:'string',
    description:'Unique id for the Todo to get',
    required:true
  })
  @ApiResponse({
    status:200,
    description:'Todo item'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Post(':id')
  @ApiOperation({summary:'Update Todo item'})
  @ApiParam({
    name:'id',
    type:'string',
    description:'Unique todo id'
  })
  @ApiBody({
    schema:{
      type:'object',
      properties:{
          Title:{
            type:'string',
            example:'Clean',
            description:'Title to hightlight the Todo objective'
          },
          Description:{
            type:'string',
            example:'Washing dishes and clothes thatt are dirty',
            description:'Provide an overview of the activity to perfom'
          },
          Completed:{
            type:'string',
            example:'done',
            description:'shows the Todo status'
          }
      }
    }
  })
  @ApiResponse({
    status:204,
    description:'Updated Todo Succesfully...'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'Delete Todo'})
  @ApiParam({
    name:'id',
    type:'string',
    description:'Unique id of Todo'
  })
  @ApiResponse({
    status:200,
    description:'Todo record deleted...'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
