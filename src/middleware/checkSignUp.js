import { AccountModel } from "../models/AccountModel.js";

export const checkSignUp = async (req, res, next) => {
  try {
    const usernameExists = await AccountModel.exists({
      username: req.body.username,
    });

    if (usernameExists) {
      return res
        .status(400)
        .send({ message: "Failed! Username is already in use!" });
    }

    const emailExists = await AccountModel.exists({ email: req.body.email });

    if (emailExists) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
