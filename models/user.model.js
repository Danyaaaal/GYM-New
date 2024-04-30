import { Schema, model } from "mongoose";

// username and password

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin",],
    default: "user",
  },
});

const User = model("user", userSchema);

export default User;