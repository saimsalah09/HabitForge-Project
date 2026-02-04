const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://habitforge-backend.onrender.com/api";

// Dashboard
export async function getDashboard(userId) {
  const res = await fetch(`${BASE_URL}/dashboard/${userId}`);
  return res.json();
}

// Habits
export async function getHabits(userId) {
  const res = await fetch(`${BASE_URL}/habits/${userId}`);
  return res.json();
}

// Check-in
export async function checkInHabit(habitId) {
  const res = await fetch(`${BASE_URL}/habits/${habitId}/checkin`, {
    method: "POST",
  });
  return res.json();
}

// Add habit
export async function addHabit(habitData) {
  const res = await fetch(`${BASE_URL}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habitData),
  });
  return res.json();
}

// Delete habit
export async function deleteHabit(habitId) {
  const res = await fetch(`${BASE_URL}/habits/${habitId}`, {
    method: "DELETE",
  });
  return res.json();
}

// Update habit
export async function updateHabit(habitId, title) {
  const res = await fetch(`${BASE_URL}/habits/${habitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

// Heatmap
export async function getHeatmap(userId) {
  const res = await fetch(`${BASE_URL}/dashboard/heatmap/${userId}`);
  return res.json();
}

// Consistency
export async function getConsistency(userId) {
  const res = await fetch(`${BASE_URL}/dashboard/consistency/${userId}`);
  return res.json();
}