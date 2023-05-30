import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const response = jwt.verify(token, "token");
    if (response) {
      req.data = response;
      next();
    }
  } catch (err) {
    res.status(401).json({ error: "Authorization missing" });
  }
};
