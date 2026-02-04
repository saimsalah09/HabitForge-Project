function checkBadges(user, streak) {
  const unlockedBadges = [];

  // Badge 1: First Step
  if (user.badges.length === 0) {
    unlockedBadges.push("First Step");
  }

  // Badge 2: Consistency King
  if (streak === 7 && !user.badges.includes("Consistency King")) {
    unlockedBadges.push("Consistency King");
  }

  return unlockedBadges;
}

module.exports = checkBadges;