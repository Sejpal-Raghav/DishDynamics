import express, { Request, Response, NextFunction } from "express";
import MenuItem, { IMenuItem } from "../models/MenuItem";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Extend Request to include user details
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// Middleware to verify admin role
const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

    if (!decoded || decoded.role !== "admin") {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    req.user = decoded; // Attach user details to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get all menu items
router.get("/", async (req: Request, res: Response) => {
  try {
    const { mealType } = req.query;
    const query = mealType ? { mealType } : {};

    const menuItems = await MenuItem.find(query);
    res.json(menuItems);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
