import { ApiProperty } from "@nestjs/swagger";

export enum complete {
    done = "done",
    inprogress = "inprogress",
    waiting = "waiting"
}

export class CreateTodoDto {
    Title:string;
    Description:string;
    Completed:complete;
}
