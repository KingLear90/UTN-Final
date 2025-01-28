import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export function verifyToken(token) {        // Toma el token y verifica si es válido.
    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
}