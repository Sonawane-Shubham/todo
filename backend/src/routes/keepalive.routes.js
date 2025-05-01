
import express from "express";

const router = express.Router();

// A simple route to keep the service alive
router.get("/keepalive", (req, res) => {
  res.send("Service is alive");
});

export default router;
