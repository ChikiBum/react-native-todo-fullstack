import Joi from "joi";

interface IJoiUser {
    email: string;
    password: string;
}

interface IJoiTodo {
    userId: string;
    title: string;
    description: string;
    year: number;
    completed: boolean;
    public: boolean;
}

export type IJoiTypes =
  | IJoiUser
  | IJoiTodo;

export const userSchema: Joi.ObjectSchema<IJoiUser> = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const todoSchema: Joi.ObjectSchema<IJoiTodo> = Joi.object({
    authorId: Joi.string(),
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(200).required(),
    year: Joi.number().integer().min(1920).max(2050).required(),
    completed: Joi.boolean(),
    public: Joi.boolean(),
});
