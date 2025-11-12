import express from "express";
import { connectDB } from "./connect.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  await connectDB();

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    res.json({ message: "Login success", user: { name: user.name, nickname: user.nickname, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
});

export default app;
