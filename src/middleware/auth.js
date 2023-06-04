import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const response = jwt.verify(token, "token");
    if (response) {
      next();
    }
  } catch (err) {
    res.status(401).json({ error: "Authorization missing" });
  }
};
