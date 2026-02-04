# 🧠 HabitForge – Gamified Habit Tracker

HabitForge is a **full-stack gamified habit tracking web application**
designed to help users build good habits through **XP, levels, streaks, badges,
and visual progress tracking**.

Unlike traditional checklist apps, HabitForge focuses on **motivation and consistency**
by making habit-building feel like a game.

---

## 📌 Project Overview

- Users create daily habits (e.g. Drink Water, Reading, Exercise)
- Each completed habit rewards XP
- Continuous completion builds streaks
- XP increases user level
- Achievements unlock badges
- Charts & heatmaps visually show progress

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Chart.js (Graphs)
- Custom CSS (Glass UI + Dark Mode)

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Tools
- VS Code
- npm

---

## ✨ Core Features

- User registration & login
- Habit CRUD (Create, Update, Delete)
- Daily habit check-in system
- Automatic streak calculation
- XP & level progression system
- Badge / achievement system
- XP progress line chart
- Yearly activity heatmap (GitHub-style)
- Habit categories
- Dark mode
- Responsive UI

---

## 🔁 Application Flow (How It Works)

1. User interacts with the React frontend
2. Frontend sends API requests to Express backend
3. Backend processes logic (streaks, XP, badges)
4. Data is stored in MongoDB
5. Updated progress is returned and shown on dashboard

---

## 🔥 Streak Logic (Important)

- Streak logic is handled **only on backend**
- Server-side date is used (not client date)
- If habit completed **yesterday** → `streak + 1`
- If a day is **missed** → `streak reset`
- Same-day duplicate check-in is **blocked**

This ensures accuracy and prevents cheating.

---

## 🎮 Gamification System

### XP System
- Each habit completion = **+10 XP**

### Level System

### Badges
- **First Step** → First habit completion
- **Consistency King** → 7-day streak
- (Easily extendable for more achievements)

---

## 📊 Data Visualization

### XP Progress Chart
- Line graph showing XP growth over time

### Activity Heatmap
- Yearly calendar-style heatmap
- Each box represents one date (1–31)
- Color intensity shows habit activity
- Inspired by GitHub contribution graph

---

## 🌐 API Endpoints

### Habit Routes
- `POST /api/habits` – Create habit
- `GET /api/habits/:userId` – Get user habits
- `PUT /api/habits/:habitId` – Update habit
- `DELETE /api/habits/:habitId` – Delete habit
- `POST /api/habits/:id/checkin` – Daily check-in

### Dashboard Routes
- `GET /api/dashboard/:userId`
- `GET /api/dashboard/heatmap/:userId`
- `GET /api/dashboard/consistency/:userId`

---

## 🚀 How to Run the Project

### Backend Setup
```bash
cd backend
npm install
npm start