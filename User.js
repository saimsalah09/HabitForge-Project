const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [String],
  xpHistory: [
  {
    date: String,
    xp: Number
  }
],
  isPremium: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);
