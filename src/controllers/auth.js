import { AccountModel } from "../models/AccountModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AccountModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Login failed. Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, "token", { expiresIn: "5h" });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const getInfoUser = async (req, res) => {
  try {
    const id = req.userData.userId;
    const data = await AccountModel.findOne({ _id: id });
    res.status(200).json({
      message: "Success",
      user: {
        username: data.username,
        fullName: data.fullName,
        avatar: data.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const register = async (req, res) => {
  try {
    const account = new AccountModel({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      fullName: req.body.fullName,
    });

    await account.save();

    res.status(201).json({ message: "Account successfully created" });
  } catch (err) {
    console.error(err); // Log the complete error details for debugging (remove in production)
    res.status(500).json({ error: "Internal server error" });
  }
};
