import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Admin {
    @Prop({ unique: true })

    username: string;
    @Prop({ unique: true })

    email: string;

    @Prop()
    password: string;

    @Prop()
    roleId: string;

    @Prop({ type: Boolean, default: false })
    activeStatus: boolean;
}


export const adminSchema = SchemaFactory.createForClass(Admin);