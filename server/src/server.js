import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5001;


await connectDB();

const server = app.listen(PORT, () => {
  console.log(`Portfolio server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Failed to start server:", err.message);
  process.exitCode = 1;
});