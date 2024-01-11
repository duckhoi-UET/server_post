import { AccountModel } from "../models/AccountModel.js";
import { TokenModel } from "../models/Token.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

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

export const logout = (req, res) => {
  try {
    // Xóa token khỏi cookie hoặc thực hiện các bước khác để hủy bỏ token
    res.clearCookie("token");

    // Phản hồi cho người dùng
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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

export const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const userId = req.userData.userId;
    const user = await AccountModel.findById(userId);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ message: "Change password failed. Invalid current password." });
    }
    const hashedNewPassword = bcrypt.hashSync(newPassword, 8);
    await AccountModel.findByIdAndUpdate(userId, {
      password: hashedNewPassword,
    });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AccountModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    await TokenModel.create({ userId: user._id, token });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "example.mail.node@gmail.com",
        pass: "fcdc ygqw txxx cnng",
      },
    });

    const URL = process.env.URL_FE || "http://localhost:3000";

    const resetLink = `${URL}/verify-path?token=${token}`;

    const mailOptions = {
      from: "example.mail.node@gmail.com",
      to: user.email,
      subject: "Reset Your Password",
      text: `Click on the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throw new Error("Token and newPassword are required");
    }

    const tokenDocument = await TokenModel.findOne({ token }).populate(
      "userId"
    );

    if (!tokenDocument) {
      return res.status(500).json({ message: "Invalid or expired token" });
    }

    // For demo purposes, store the new password in the user document
    tokenDocument.userId.password = bcrypt.hashSync(newPassword, 8);

    // In a real-world scenario, you would save the updated user to the database
    await tokenDocument.userId.save();

    // Delete the token after it has been used
    await TokenModel.deleteOne({ _id: tokenDocument._id });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkTokenExpire = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const tokenDocument = await TokenModel.findOne({ token });

    if (!tokenDocument) {
      return res.status(400).json({ message: "Invalid token" });
    }

    res.status(200).json({ message: "Token is still valid" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
