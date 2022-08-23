import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "../config/database";
import AppRouter from "./routes";
import passport from "passport";
// import {
//     jwtStrategy,
//     signUpStrategy,
//     signInStrategy,
// } from "./middlewares/auth.middleware";
import strategyController from "./controllers/strategy.controller";

const app = express();
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

app.use(cors());

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.use("jwt", strategyController.jwtStrategy);
passport.use("signup", strategyController.signUpStrategy);
passport.use("signin", strategyController.signInStrategy);

app.use(passport.initialize());

router.init();

const port = app.get("port");
const server = app.listen(port, () =>
// tslint:disable-next-line:no-console
    console.log(`Server started on port ${port}`),
);

export default server;
