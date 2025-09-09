import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import {router as auth} from './routes/auth.js';
import {router as list} from './routes/list.js';
import connectDB from './connection/conn.js'
const port=process.env.port;
const databaseurl=process.env.databaseurl;
const app= express();

connectDB(databaseurl);
app.use(express.json());
app.use(cors());
app.use("/api/v1",auth);
app.use("/api/v2",list);


app.listen(port,()=>console.log("server up!"))