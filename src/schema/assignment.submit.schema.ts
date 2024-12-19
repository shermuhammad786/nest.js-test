import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema({
    timestamps: true
})
export class AssignmentSubmit extends mongoose.Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
    student: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' })
    assignment: string;

    @Prop()
    fileUrl: string;

    @Prop()
    grade: string;

    @Prop()
    feedback: string;
}

export const assignmentSubmitSchema = SchemaFactory.createForClass(AssignmentSubmit)