import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema({
    timestamps: true
})
export class Teacher extends mongoose.Document {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    roleId: string;

    @Prop({ unique: true })
    username: string;

    @Prop({ default: '' })
    phone: string;

    @Prop({ default: '' })
    city: string;

    @Prop({ type: Boolean, default: false })
    activeStatus: boolean;
}

export const teacherSchema = SchemaFactory.createForClass(Teacher)