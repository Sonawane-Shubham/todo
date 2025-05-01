import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/auth.routes.js";
import todoRoutes from "../src/routes/todo.routes.js";


const app = express();

// Enable CORS for all routes
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // React frontend URL
//     credentials: true, // if you're using cookies/auth headers
//   })
// );

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);


export default app;
