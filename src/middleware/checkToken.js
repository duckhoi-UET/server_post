import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authorization missing" });
    }

    const decodedToken = jwt.verify(token, "token");

    req.userData = { userId: decodedToken.userId }; // Add user data to the request object
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid token" });
    } else {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
