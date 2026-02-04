const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");

/*
GET /api/dashboard/:userId
*/
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    const totalHabits = await Habit.countDocuments({ userId });
    const totalCompletions = await HabitLog.countDocuments({});

    res.json({
      name: user.name,
      xp: user.xp,
      level: user.level,
      badges: user.badges,
      totalHabits,
      totalCompletions
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ==============================
// 🔥 HEATMAP DATA
// GET /api/dashboard/heatmap/:userId
// ==============================
router.get("/heatmap/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const logs = await HabitLog.find()
      .populate({
        path: "habitId",
        match: { userId }
      });

    const heatmap = {};

    logs.forEach(log => {
      if (!log.habitId) return;

      const date = log.date.toISOString().split("T")[0];
      heatmap[date] = (heatmap[date] || 0) + 1;
    });

    res.json(heatmap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;

// ==============================
// 📈 CONSISTENCY (LAST 30 DAYS)
// GET /api/dashboard/consistency/:userId
// ==============================
router.get("/consistency/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    startDate.setHours(0, 0, 0, 0);

    const logs = await HabitLog.find({
      date: { $gte: startDate }
    }).populate({
      path: "habitId",
      match: { userId }
    });

    const dailyCount = {};

    logs.forEach(log => {
      if (!log.habitId) return;

      const date = log.date.toISOString().split("T")[0];
      dailyCount[date] = (dailyCount[date] || 0) + 1;
    });

    // Last 30 days format
    const result = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);

      const key = d.toISOString().split("T")[0];
      result.push({
        date: key,
        count: dailyCount[key] || 0
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});