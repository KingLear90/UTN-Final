import { verifyToken } from "../utils/verifyToken.js";

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        // Verifica si el token está en el header de autorización de la petición.
        const authHeader = req.headers.authorization?.split(" ")[1];
        
        if (!authHeader) {
            return res.status(401).json({ message: "Token not found. Authorization denied." });
        }

        const token = authHeader;
        
        const decoded = verifyToken(token); // Decodifica el token.
        req.user = decoded;
        next();     // Si sale bien, sigue el flujo de la app.
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized token", error: error.message });
    }
}