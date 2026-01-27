import handleError from "../lib/handleError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    const newUser = await User.create({
      fullName,
      email,
      password,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      userId: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    handleError(error, "auth.controllers.js", res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).message({
        success: false,
        message: "All fields are required",
      });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (error) {
    handleError(error, "login/controller", res);
  }
};

export const logout = (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token to remove",
      });
    }
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    handleError(error, "logout/controllers", res);
  }
};
