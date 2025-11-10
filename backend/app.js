import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json())
app.use(cookieParser())

//Routes

import authRouter from "./src/route/auth.route.js";
app.use("/api/auth", authRouter);



export default app