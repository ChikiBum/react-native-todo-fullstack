import { Router } from "express";
import { requestJoiValidation } from "./../../middlewares/validators.middleware";
import { userSchema } from "./../../helpers/validations-scheme.helper";
// import {
//     authSignUp, authsignIn,
// } from "../../middlewares/auth.middleware";
import authController from "./../../controllers/auth.controller";

const userRouter: Router = Router();

userRouter.post("/signup",
    requestJoiValidation(userSchema),
    authController.authSignUp,
);

userRouter.post("/signin",
    requestJoiValidation(userSchema),
    authController.authsignIn,
);

export default userRouter;
