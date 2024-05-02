import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, SchemaType } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>

@Schema()
export class Movie{

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    user: mongoose.Types.ObjectId

    @Prop()
    movie_title: string

    @Prop()
    movie_img: string

    @Prop()
    movie_published_year: number

    @Prop({ default: Date.now })
    createdAt: Date    
}

export const MovieSchema = SchemaFactory.createForClass(Movie);