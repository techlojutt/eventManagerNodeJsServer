const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                data: [],
                message: "Authorization header is required",
                success: false,
            });
        }

        // Check if Authorization header starts with 'Bearer'
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                data: [],
                message: "Authorization header must be in the format: Bearer <token>",
                success: false,
            });
        }

        // Extract the token after 'Bearer'
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user data to the request object
        req.user = decoded;

        // Proceed to the next middleware or route
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);

        // Send error response for invalid or expired tokens
        res.status(401).json({
            data: [],
            message: "Invalid or expired token",
            success: false,
            error: error.message,
        });
    }
};

module.exports = {
    authMiddleware,
};
