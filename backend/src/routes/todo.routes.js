import express from "express";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getTodos);
router.post("/", authenticateToken, createTodo);
router.put("/:id", authenticateToken, updateTodo);
router.delete("/:id", authenticateToken, deleteTodo);

export default router;
