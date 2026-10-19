import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();

const allowedOrigins = (
  process.env.FRONTEND_URL ||
  process.env.CLIENT_URL ||
  "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);

app.use(express.json({ limit: "1mb" }));


app.get("/", (_req, res) => {
  res.send("Portfolio server");
});

app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);


app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.use((err, _req, res, _next) => {
  if (res.headersSent) return;

  console.error(err);

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: status >= 500 ? "Internal server error" : err.message,
  });
});

export default app;