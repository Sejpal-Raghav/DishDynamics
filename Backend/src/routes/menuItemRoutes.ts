
import express, { Request, Response } from "express";
import MenuItem, { IMenuItem } from "../models/MenuItem";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify admin role
const requireAdmin = (req: Request, res: Response, next: express.NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
    
    if (decoded.role !== "admin") {
      res.status(403).json({ message: "Admin access required" });
      return;
    }
    
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

// Create a new menu item (admin only)
router.post("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const newMenuItem: IMenuItem = new MenuItem(req.body);
    await newMenuItem.save();
    
    res.status(201).json({
      message: "Menu item created successfully",
      menuItem: newMenuItem,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a menu item (admin only)
router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    res.json({
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a menu item (admin only)
router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    res.json({
      message: "Menu item deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
