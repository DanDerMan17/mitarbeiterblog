import express from "express";
import path from "path";
import authRouter from "./routes/authRouter";
import cors from "cors";
import {config} from "./config";
import entriesRouter from "./routes/entriesRouter";

// import usersRouter from "./routes/users"; // optional
// import indexRouter from "./routes"; // optional

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//TODO CORS:
app.use(cors({
    origin: config.corsOrigin,
    credentials: true
}));

// 🧩 Static files (optional, falls du ein public-Verzeichnis hast)
app.use(express.static(path.join(__dirname, "../public")));

// --- Routes ---
app.use("/api/auth", authRouter);
app.use("/api", entriesRouter);

// Optional weitere Routen:
// app.use("/", indexRouter);
// app.use("/api/users", usersRouter);

// 🧩 404 Fallback
app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
});

export default app;
