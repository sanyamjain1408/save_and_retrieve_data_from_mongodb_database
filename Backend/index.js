const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String
});

const User = mongoose.model("User", userSchema);

// ✅ Save user API
app.post("/api/users", async (req, res) => {
  const { name, email, mobile, address } = req.body;

  if (!name || !email || !mobile || !address) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = new User({ name, email, mobile, address });
  await user.save();
  res.json({ message: "User saved successfully" });
});

// ✅ Search user API
app.get("/api/users/:name", async (req, res) => {
  const name = req.params.name;
  const user = await User.findOne({ name });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// ✅ Start Server
app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
