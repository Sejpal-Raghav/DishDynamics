
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import menuItemRoutes from "./routes/menuItemRoutes";
import menuSelectionRoutes from "./routes/menuSelectionRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/menu-items", menuItemRoutes);
app.use("/menu-selections", menuSelectionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
