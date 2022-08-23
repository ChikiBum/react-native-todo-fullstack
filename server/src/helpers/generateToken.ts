import jwt from "jsonwebtoken";
import "dotenv/config";

const { ACCESS_TOKEN_SECRET } = process.env;

export const generateToken = (id: string) => {
    return jwt.sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
};
