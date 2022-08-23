import { Router } from "express";
import { requestChecker } from "./../../middlewares/request-checker.middleware";
import { isExistInDB, requestJoiValidation } from "./../../middlewares/validators.middleware";
import todoController from "../../controllers/todo.controller";
import { TodoModel } from "./../../models/todo.model";
import { todoSchema } from "./../../helpers/validations-scheme.helper";
import { checkJwt } from "./../../middlewares/auth.middleware";
import authController from "../../controllers/auth.controller";

const todosRouter: Router = Router();

todosRouter.get("",
    authController.checkJwt(),
    requestChecker(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get("/:id",
    isExistInDB(TodoModel),
    authController.checkJwt(),
    requestChecker(todoController.findOne.bind(todoController)),
);

todosRouter.post("/",
    requestJoiValidation(todoSchema),
    authController.checkJwt(),
    requestChecker(todoController.createNewTodo.bind(todoController)),
);

todosRouter.put("/:id",
    isExistInDB(TodoModel),
    authController.checkJwt(),
    requestChecker(todoController.updateOne.bind(todoController)),
);

todosRouter.delete("/:id",
    isExistInDB(TodoModel),
    authController.checkJwt(),
    requestChecker(todoController.deleteOne.bind(todoController)),
);

export default todosRouter;
