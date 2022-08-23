import { UserModel } from "../models/user.model";
import { IUser } from "../types/user.type";

export default class UserService {
    async signIn(user: IUser) {
        const userData = await UserModel.findById(user);
        return userData;
    }

    async signUp(user: IUser) {
        const userData = await UserModel.create(user);
        return userData;
    }
}
