import express from "express";
import messageroutes from "./routes/message.route.js";
import authroutes from "./routes/auth.route.js";
import dotenv from "dotenv"

dotenv.config();


const app =express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authroutes); 
app.use("/api/message", messageroutes);

 

app.listen(PORT, () => console.log(`server is running on port ${PORT}`)); 