import { AccountModel } from "../models/AccountModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const account = req.body;
    const response = await AccountModel.findOne({
      username: account.username,
      password: account.password,
    });
    if (response) {
      const token = jwt.sign({ response }, "token");
      res.status(200).json({ message: "Success", token: token });
    } else {
      res.status(500).json({ message: "Login Failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getInfoUser = async (req, res) => {
  try {
    const id = req.data.response._id;
    const data = await AccountModel.findOne({ _id: id });
    res.status(200).json({ message: "Success", user: data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
