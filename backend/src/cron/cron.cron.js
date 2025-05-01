// src/jobs/cron.js
import cron from "node-cron";
import axios from "axios";

// Schedule task to run every 14 minutes
cron.schedule("*/14 * * * *", async () => {
  try {
   
    await axios.get("https://todo-backend-q2g6.onrender.com/api/keepalive"); 
  } catch (error) {
    console.error("Error: Unable to keep service alive", error.message);
  }
});
