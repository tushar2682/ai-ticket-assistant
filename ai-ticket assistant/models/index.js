import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import user from "./user";
import userRoutes from"./routes/user.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth/auth",userRoutes)

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });