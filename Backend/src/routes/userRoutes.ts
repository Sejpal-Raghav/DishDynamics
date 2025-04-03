
import express, { Request, Response } from "express";
import User, { IUser } from "../models/User";

const router = express.Router();

// Create a User
router.post("/add", async (req: Request, res: Response) => {
  try {
    const newUser: IUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User added", user: newUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
