import { useEffect, useState } from "react";
import {
  getDashboard,
  getHabits,
  checkInHabit,
  addHabit,
  deleteHabit,
  updateHabit,
  getHeatmap,
  getConsistency,
} from "./api";

import XPChart from "./components/XPChart";
import Heatmap from "./components/Heatmap";
import ConsistencyChart from "./components/ConsistencyChart";

const USER_ID = "697fa753f1da90ec245e0963"; // MongoDB user _id

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState("");

  const [newHabit, setNewHabit] = useState("");
  const [category, setCategory] = useState("Other");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const [heatmapData, setHeatmapData] = useState({});
  const [consistencyData, setConsistencyData] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    await loadData();
    await loadHeatmap();
    await loadConsistency();
  }

  async function loadData() {
    const dash = await getDashboard(USER_ID);
    const habitsData = await getHabits(USER_ID);

    // Safety: remove duplicate titles
    const uniqueHabits = habitsData.filter(
      (v, i, a) => a.findIndex(t => t.title === v.title) === i
    );

    setDashboard(dash);
    setHabits(uniqueHabits);
  }

  async function loadHeatmap() {
    const data = await getHeatmap(USER_ID);
    setHeatmapData(data);
  }

  async function loadConsistency() {
    const data = await getConsistency(USER_ID);
    setConsistencyData(data);
  }

  async function handleCheckIn(habitId) {
    setLoadingId(habitId);
    setMessage("");

    const res = await checkInHabit(habitId);
    setMessage(res.message || "Habit checked in!");

    setLoadingId(null);
    loadAll();
  }

  async function handleAddHabit() {
    if (!newHabit.trim()) return;

    await addHabit({
      title: newHabit,
      category,
      userId: USER_ID,
    });

    setNewHabit("");
    setCategory("Other");
    loadAll();
  }

  async function handleDelete(id) {
    await deleteHabit(id);
    loadAll();
  }

  async function handleUpdate(id) {
    await updateHabit(id, editTitle);
    setEditingId(null);
    loadAll();
  }

  if (!dashboard) return <h2>Loading...</h2>;

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      {/* HEADER */}
      <div className="card header">
        <h1>HabitForge</h1>

        <div className="header-right">
          <div>
            <strong>Level:</strong> {dashboard.level} &nbsp; | &nbsp;
            <strong>XP:</strong> {dashboard.xp}
          </div>

          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* STATUS MESSAGE */}
      {message && <p className="status success">{message}</p>}

      {/* BADGES */}
      <div className="card">
        <h3>Badges</h3>
        {dashboard.badges.length === 0 && <p>No badges yet</p>}
        {dashboard.badges.map((b, i) => (
          <span className="badge" key={i}>
            {b}
          </span>
        ))}
      </div>

      {/* XP PROGRESS */}
      <div className="card">
        <h3>XP Progress</h3>
        <XPChart xpHistory={dashboard.xpHistory} />
      </div>

      {/* HEATMAP */}
      <div className="card">
        <h2>Activity Heatmap</h2>
        <Heatmap data={heatmapData} />
      </div>

      {/* CONSISTENCY LINE CHART */}
      <div className="card">
        <h3>Last 30 Days Consistency</h3>
        <ConsistencyChart data={consistencyData} />
      </div>

      {/* HABITS */}
      <div className="card">
        <h3>Habits</h3>

        {/* ADD HABIT */}
        <div className="add-habit">
          <input
            type="text"
            placeholder="Add new habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Health">Health</option>
            <option value="Study">Study</option>
            <option value="Fitness">Fitness</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>

          <button onClick={handleAddHabit}>Add</button>
        </div>

        {/* HABIT LIST */}
        {habits.map((h) => (
          <div className="habit" key={h._id}>
            {editingId === h._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(h._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="habit-info">
                  <span className="habit-title">{h.title}</span>
                  <span className="habit-category">{h.category}</span>
                  <span className="streak">
                    🔥 {h.streak} day streak
                  </span>
                </div>

                <div className="habit-actions">
                  <button
                    disabled={loadingId === h._id}
                    onClick={() => handleCheckIn(h._id)}
                  >
                    {loadingId === h._id ? "Checking..." : "Check-in"}
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(h._id);
                      setEditTitle(h.title);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => handleDelete(h._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;