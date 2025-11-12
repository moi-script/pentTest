import mongoose from "mongoose";

const uri = "mongodb+srv://rizskplay:QOSRblZXd3IY96Fz@cluster0.z3ss9wr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      dbName: "penTest", // ✅ your DB name here
    });
    isConnected = true;
    console.log("✅ MongoDB Connected to penTest");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
}
