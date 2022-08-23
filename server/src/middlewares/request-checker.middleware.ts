import { Request, Response, NextFunction } from "express";

export const requestChecker = (func: Function) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await func(req, res);
            return res.json(data);
        } catch (error: any) {
            next(error);
        }
    };
