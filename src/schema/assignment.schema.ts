import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema({
    timestamps: true
})
export class Assignment extends mongoose.Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
    course: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    dueDate: string;

    @Prop()
    submissions: [string
        // {
        //     student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        //     fileUrl: { type: String },
        //     submittedAt: { type: Date },
        //     grade: { type: String },
        //     feedback: { type: String },
        // },
    ]
}

export const assignmentSchema = SchemaFactory.createForClass(Assignment)