import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema({
    timestamps: true
})
export class Student extends mongoose.Document {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    roleId: string;

    @Prop()
    username: string;

    @Prop({ default: '' })
    number: string;

    @Prop({ default: '' })
    city: string;

    @Prop({ default: '' })
    dateOfBirth: string;

    @Prop({ default: '' })
    gender: string;

    @Prop({ default: '' })
    qualification: string;

    @Prop({ default: '' })
    laptop: string;

    @Prop({ default: '' })
    course: string;

    @Prop({ type: Boolean, default: false })
    activeStatus: boolean;

    @Prop({ type: Boolean, default: false })
    verifyOtp: boolean;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }])
    enrolledCourses: [string];
}

export const studentSignUpSchema = SchemaFactory.createForClass(Student)