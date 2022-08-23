import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.model";
import { Strategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";

const { ACCESS_TOKEN_SECRET } = process.env;

export class StrategyController {
    jwtStrategy = new Strategy(
        {
            secretOrKey: ACCESS_TOKEN_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                const userId = await UserModel.findById(token.id).select("id");
                return done(null, userId);
            } catch (error) {
                done(error);
            }
        },
    );

    signInStrategy = new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email: string, password: string, done: any) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "user not exist" });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: "invalid password" });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        },
    );

    signUpStrategy = new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email: string, password: string, done: any) => {
            try {
                const user = await UserModel.findOne({ email });

                if (user) {
                    return done(null, false, {
                        message: "user already exists",
                    });
                }

                const salt = bcrypt.genSaltSync(10);
                const newUser = await UserModel.create({
                    email,
                    password: bcrypt.hashSync(password, salt),
                });

                return done(null, newUser);
            } catch (error) {
                done(error);
            }
        },
    );
}

const strategyController = new StrategyController();

export default strategyController;
