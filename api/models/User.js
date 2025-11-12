import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nickname: String,
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "test", // ✅ use your "test" collection
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
