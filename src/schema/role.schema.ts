import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({
    timestamps: true
})
export class Role extends mongoose.Document {
    @Prop()
    name: string;
    
    @Prop()
    description: string;

    @Prop()
    permission: string;
}

export const roleSchema = SchemaFactory.createForClass(Role);