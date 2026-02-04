function calculateXP(currentXP) {
  return currentXP + 10;
}

function calculateLevel(xp) {
  return Math.floor(Math.sqrt(xp));
}

module.exports = {
  calculateXP,
  calculateLevel
};