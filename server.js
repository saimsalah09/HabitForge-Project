const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/habitforge_db")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes 
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// test route (optional)
app.get("/", (req, res) => {
  res.send("HabitForge Backend Running");
});

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});