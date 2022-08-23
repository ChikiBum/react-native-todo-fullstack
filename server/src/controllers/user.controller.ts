import { IUser } from "./../types/user.type";
import UserService from "../services/user.service";
import TypedRequestParams from "./../types/requests.type";

export class UserController {
    constructor(private userService: UserService) {}

    async signIn(req: TypedRequestParams<{}, {}, IUser>) {
        const user = req.body;
        return await this.userService.signIn(user);
    }

    async signUp(req: TypedRequestParams<{}, {}, IUser>) {
        const user = req.body;
        return await this.userService.signUp(user);
    }
}

const userController = new UserController(new UserService());
export default userController;
