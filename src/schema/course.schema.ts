import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
    timestamps: true // Adds createdAt and updatedAt fields
})
export class Course extends Document {
    @Prop({ required: true }) // Ensure title is required
    title: string;

    @Prop() // Optional field for course description
    description: string;

    @Prop({ type: Boolean, default: true }) // Default value for activeStatus
    activeStatus: boolean;

    @Prop({ type: [mongoose.Types.ObjectId], ref: 'Student' })
    students: mongoose.Types.ObjectId[]; // Use correct type for ObjectId arrays

    @Prop({ type: [mongoose.Types.ObjectId], ref: 'Teacher' })
    teachers: mongoose.Types.ObjectId[];
}

// Generate the schema for Mongoose
export const courseSchema = SchemaFactory.createForClass(Course);
