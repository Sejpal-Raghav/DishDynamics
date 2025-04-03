import express, { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Register a new user
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      res.status(400).json({ 
        message: "User with this email or username already exists" 
      });
      return;
    }
    
    // Create new user
    const newUser: IUser = new User({
      username,
      email,
      password,
    });
    
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
    return;
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
    return;
  }
});

// Login user
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    
    // Check password
    if (!user.comparePassword) {
      throw new Error("comparePassword method is missing from User model");
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
    return;
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
    return;
  }
});

// Get current user
router.get("/me", async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
    return;
  } catch (error: any) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
});

export default router;
