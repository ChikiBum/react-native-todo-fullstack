import { Model } from "mongoose";
import { IUser } from "./../types/user.type";
import { ITodo } from "./../types/todos.type";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { IJoiTypes } from "../helpers/validations-scheme.helper";


export const isExistInDB: Function = (dataModel: Model<ITodo> | Model<IUser>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const findData = await dataModel.findById(id);

            if (!findData) throw Error(`isExistDBData error: data with ${id} not exist in DB`);

            return next();
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

export const requestJoiValidation: Function = (schema: Joi.ObjectSchema<IJoiTypes>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const { error } = await schema.validateAsync(req.body);

        if (error) return res.status(422).json( error );
        else next();
    };

