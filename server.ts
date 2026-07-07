import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "scores.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize JSON Database
let scores = [];
if (fs.existsSync(DB_PATH)) {
  try {
    scores = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch (err) {
    console.error("Error reading database:", err.message);
  }
} else {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

function saveScores() {
  fs.writeFileSync(DB_PATH, JSON.stringify(scores, null, 2));
}

function filterDailyScores() {
  const todayStr = new Date().toDateString();
  const originalLength = scores.length;
  scores = scores.filter(entry => {
    if (!entry.timestamp) return false;
    return new Date(entry.timestamp).toDateString() === todayStr;
  });
  if (scores.length !== originalLength) {
    saveScores();
    console.log(`Daily reset: Cleared ${originalLength - scores.length} scores from previous days.`);
  }
}

// Clean old scores on startup
filterDailyScores();

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/scores", (req, res) => {
    filterDailyScores();
    const sortedScores = [...scores].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (a.duration || 0) - (b.duration || 0);
    }).slice(0, 50);
    res.json({ scores: sortedScores });
  });

  app.post("/api/scores", (req, res) => {
    filterDailyScores();
    const { name, className, score, duration, playMode } = req.body;
    
    if (!name || !className || typeof score !== "number") {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const newScore = {
      id: Date.now(),
      name,
      className,
      score,
      duration: typeof duration === "number" ? duration : 0,
      playMode: playMode === "group" ? "group" : "single",
      timestamp: new Date().toISOString()
    };

    scores.push(newScore);
    saveScores();
    
    res.json({ success: true, id: newScore.id });
  });

  app.post("/api/scores/reset", (req, res) => {
    const { password } = req.body;
    if (password === "R3setSc0r3") {
      scores = [];
      saveScores();
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Password salah!" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
