import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;
// export type UserDocument = User & mongoose.Document

@Schema()
export class User{
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

/* export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    createAt: Date
}) */