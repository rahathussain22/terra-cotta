import { connectdb, sequelize } from "./src/db/connectDb.js";
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})

async function startDB(){
   await connectdb()
   await sequelize.sync()
   console.log("Database created successfully")
}

startDB()

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port", process.env.PORT)
})