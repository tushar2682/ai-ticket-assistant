import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {serve} from "inngest/express";
import user from "./user";
import userRoutes from"./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import { Inngest } from "./inngest/client.js";
import{onUserSignup}from "./inngest/functions/on-user-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/tickets",ticketRoutes);
app.use(
  "/api/inngest",
  serve({
    client:inngest,
    functions: [onUserSignup, onTicketCreated],
  })
)

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