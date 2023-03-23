import express from "express";
import { router } from "./routes/router";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(router);
app.use(cors());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return res.status(400).json({ error: "Invalid JSON data" });
  }

  next(err);
});

export { app };
