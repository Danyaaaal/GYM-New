import User from "../models/user.model.js";
import asyncHandler from "../config/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

// add a new user to the db
const signup = asyncHandler(async (req, res) => {
  // handle the req.body with username and password
  const { username, password } = req.body;
  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // create/save the user via the model
  await User.create({ username, password: hashedPassword });
  // send the response
  res.status(201).json({ message: "user created successfully." });
});

const login = asyncHandler(async (req, res) => {
  // handle the req.body username and password
  const { username, password } = req.body;
  // check if the user document exists
  const user = await User.findOne({ username });
  // check/verify that the password provided is correct, by comparing it with the hashed one
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (user && isPasswordValid) {
    // create jwt signature
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      JWT_SECRET
    );
    // send a response with jwt and message "login successful"
    res.status(200).json({ message: "login successful.", accessToken });
  } else {
    // res.status(401).json({message: "login failed"})
    res.status(401);
    throw new Error("login failed");
  }
});

const getProtected = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  // search for a user with the userId
  const user = await User.findById(userId);
  // send response (200) with the user info
  res.status(200).json({ data: user });
});

const getAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Hey admin" });
});

export { signup, login, getProtected, getAdmin };
