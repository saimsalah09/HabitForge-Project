const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: "Other"
  },
  streak: {
    type: Number,
    default: 0
  },
  lastCompleted: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Habit", HabitSchema);