import passport from "passport";
import { NextFunction, Response, Request } from "express";
import { generateToken } from "../helpers/generateToken";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { ACCESS_TOKEN_SECRET } = process.env;

export class AuthController {
    async authSignUp(req: Request, res: Response, next: NextFunction) {
        try {
            await passport.authenticate(
                "signup",
                { session: true },
                async (err, user) => {
                    if (err) throw err;
                    if (!user) {
                        return res.status(401).send({ message: "User was exist" });
                    }
                    res.json({
                        token: `Bearer ${generateToken(user)}`, user,
                    });
                },
            )(req, res, next);
        } catch (err: any) {
            return res.status(500).json({ error: "server_error", err });
        }
    }

    async authsignIn(req: Request, res: Response, next: NextFunction) {
        try {
            await passport.authenticate("signin", async (err, user) => {
                if (err) throw err;
                if (!user) {
                    return res.status(401).send({ message: "User or password incorrect" });
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) return next(error);
                    return res.json({
                        token: `Bearer ${generateToken(user)}`, user,
                    });
                });
            })(req, res, next);
        } catch (err: any) {
            return res.status(500).json({ error: "server_error", err });
        }
    }

    checkJwt() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.headers?.authorization?.split(" ")[1];

                if (!token) {
                    return res.status(400).json({ error: "Incorrect token" });
                }

                const data = jwt.verify(token, ACCESS_TOKEN_SECRET);
                req.user = data;
                console.log("req.user: ", req.user);
                return next();
            } catch (error: any) {
                return res.status(500).json({ error: "Incorrect token" });
            }
        };
    }
}

const authController = new AuthController();

export default authController;
