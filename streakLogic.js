const HabitLog = require("../models/HabitLog");

async function calculateStreak(habitId) {
  // latest logs pehle lao
  const logs = await HabitLog.find({ habitId })
    .sort({ date: -1 });

  if (logs.length === 0) return 0;

  let streak = 1;

  for (let i = 1; i < logs.length; i++) {
    const prev = new Date(logs[i - 1].date);
    const curr = new Date(logs[i].date);

    prev.setHours(0, 0, 0, 0);
    curr.setHours(0, 0, 0, 0);

    const diff =
      (prev - curr) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

module.exports = calculateStreak;