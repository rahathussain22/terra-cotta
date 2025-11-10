import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: (origin,callback)=>{
        callback(null,origin)
    },
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//Routes

import authRouter from "./src/route/auth.route.js";
app.use("/api/auth", authRouter);



export default app