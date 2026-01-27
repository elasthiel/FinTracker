import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin:
      process.env.MODE === "production"
        ? "https://fintracker-production-4a96.up.railway.app"
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Your server is running now!!");
});

connectDB();
app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
});
