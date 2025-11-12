import express from "express";
import { connectDB } from "./connect.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/api/signup", async (req, res) => {
  await connectDB();

  const { nickname, name, email, password } = req.body;
  if (!nickname || !name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ nickname, name, email, password: hashed });
    await user.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating account", error: err });
  }
});

export default app;
