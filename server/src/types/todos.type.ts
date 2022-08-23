import { Document, Types } from "mongoose";

export interface ITodo extends Document {
    authorId: Types.ObjectId;
    title: string;
    description: string;
    year: number;
    completed: boolean;
    public: boolean;
   }

