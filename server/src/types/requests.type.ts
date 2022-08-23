import { Request } from "express";
import { Query, ParamsDictionary } from "express-serve-static-core";
import { Document } from "mongoose";

export interface TypedRequestParams<P extends ParamsDictionary, Q extends Query, B>
extends Request {
  params: P;
  query: Q;
  body: B;
}

export interface IRequestUser extends Document {
  user: {
    _id: string;
    email: string;
    password: string;
    date: Date;
  }
}

interface IRequestTodos extends Document {
  title: string;
  description: string;
  year: number;
  completed: boolean;
  public: boolean;
 }

export type TRequerstsType = IRequestUser | IRequestTodo;


export interface IRequestTodo extends Request {
  body: IRequestTodos;
  user: IRequestUser;
}

export interface ISearchQuery {
  isCompleted: string;
  todoTitle: string;
  startIndex: number;
  endIndex: number;
}
