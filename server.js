import express from "express";
import cors from "cors";
import colors from "colors"
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/user.route.js";

const { PORT } = process.env;

await connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// POST /signup
app.use("/", userRoutes);


app.listen(PORT, () => {
    console.log(
      `server is running on`,
      `http://localhost:${PORT}`.underline.green
    );
  });