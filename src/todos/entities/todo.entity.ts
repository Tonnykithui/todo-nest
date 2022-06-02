import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { complete } from "../dto/create-todo.dto";
import { Document } from "mongoose";

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop()
    Title:string;

    @Prop()
    Description:string;

    @Prop()
    Completed:complete
}

export const TodoSchema = SchemaFactory.createForClass(Todo);