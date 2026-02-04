const express = require("express");
const router = express.Router();

const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");
const User = require("../models/User");

const calculateStreak = require("../utils/streakLogic");
const { calculateXP, calculateLevel } = require("../utils/gamification");
const checkBadges = require("../utils/badgeLogic");

/*
==============================
CREATE HABIT
POST /api/habits
==============================
*/
router.post("/", async (req, res) => {
  try {
    const { title, category, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: "Title and userId required" });
    }

    const habit = new Habit({
      title,
      category: category || "Other",
      userId
    });

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
==============================
GET USER HABITS
GET /api/habits/:userId
==============================
*/
router.get("/:userId", async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.params.userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
==============================
CHECK-IN HABIT
POST /api/habits/:id/checkin
==============================
*/
router.post("/:id/checkin", async (req, res) => {
  try {
    const habitId = req.params.id;

    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const user = await User.findById(habit.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // today (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ❌ Duplicate same-day check
    const alreadyDone = await HabitLog.findOne({
      habitId,
      date: { $gte: today }
    });

    if (alreadyDone) {
      return res.status(400).json({
        message: "Habit already completed today"
      });
    }

    // ✅ Save log
    await HabitLog.create({
      habitId,
      date: new Date(),
      completed: true
    });

    // ✅ Calculate streak
    const streak = await calculateStreak(habitId);
    habit.streak = streak;
    habit.lastCompleted = new Date();
    await habit.save();

    // ✅ Badges
    const newBadges = checkBadges(user, streak);
    newBadges.forEach(badge => {
      if (!user.badges.includes(badge)) {
        user.badges.push(badge);
      }
    });

    // ✅ XP & Level
    user.xp = calculateXP(user.xp);
    user.level = calculateLevel(user.xp);

    user.xpHistory.push({
      date: new Date().toDateString(),
      xp: user.xp
    });

    await user.save();

    res.json({
      message: "Habit checked in successfully",
      streak,
      xp: user.xp,
      level: user.level
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
==============================
DELETE HABIT
==============================
*/
router.delete("/:habitId", async (req, res) => {
  try {
    const habitId = req.params.habitId;

    await Habit.findByIdAndDelete(habitId);
    await HabitLog.deleteMany({ habitId }); // cleanup logs

    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
==============================
UPDATE HABIT
==============================
*/
router.put("/:habitId", async (req, res) => {
  try {
    const { title, category } = req.body;

    const habit = await Habit.findByIdAndUpdate(
      req.params.habitId,
      { title, category },
      { new: true }
    );

    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;