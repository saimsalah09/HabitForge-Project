const mongoose = require("mongoose");

const HabitLogSchema = new mongoose.Schema({
  habitId: mongoose.Schema.Types.ObjectId,
  date: Date,
  completed: Boolean
});

module.exports = mongoose.model("HabitLog", HabitLogSchema);
