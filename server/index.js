import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const app = express();

app.use(express.json());

app.use('/server/user', userRouter);
app.use('/server/auth', authRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});