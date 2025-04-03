
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import menuItemRoutes from "./routes/menuItemRoutes";
import menuSelectionRoutes from "./routes/menuSelectionRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/menu-items", menuItemRoutes);
app.use("/menu-selections", menuSelectionRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//