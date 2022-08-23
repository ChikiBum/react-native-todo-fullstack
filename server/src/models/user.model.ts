import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.type";

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.isValidPassword = async function(password: string) {
    const user = this;

    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

export const UserModel = model<IUser>("User", userSchema);
