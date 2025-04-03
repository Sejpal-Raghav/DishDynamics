
import express, { Request, Response } from "express";
import MenuSelection, { IMenuSelection } from "../models/MenuSelection";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Add the userId and userRole to the request body
interface AuthenticatedRequest extends Request {
  body: {
    userId?: string;
    userRole?: string;
    [key: string]: any;
  };
}

// Middleware to verify user authentication
const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: express.NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
    req.body.userId = decoded.id;
    req.body.userRole = decoded.role;
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to verify admin role
const requireAdmin = async (req: AuthenticatedRequest, res: Response, next: express.NextFunction) => {
  try {
    if (req.body.userRole !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get user's menu selections
router.get("/my-selections", authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { mealType, date } = req.query;
    const query: any = { userId: req.body.userId };
    
    if (mealType) {
      query.mealType = mealType;
    }
    
    if (date) {
      const queryDate = new Date(date as string);
      query.date = {
        $gte: new Date(queryDate.setHours(0, 0, 0, 0)),
        $lt: new Date(queryDate.setHours(23, 59, 59, 999))
      };
    }
    
    const selections = await MenuSelection.find(query)
      .populate("selectedItems")
      .sort({ date: -1 });
    
    res.json(selections);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Submit a menu selection
router.post("/submit", authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { mealType, date, selectedItems } = req.body;
    
    // Check if the selection deadline has passed
    const currentDate = new Date();
    const selectionDate = new Date(date);
    const deadline = new Date(selectionDate);
    
    // Set deadline to 8 PM the day before for breakfast
    // Set deadline to 10 AM same day for lunch
    // Set deadline to 2 PM same day for snacks
    // Set deadline to 4 PM same day for dinner
    if (mealType === "breakfast") {
      deadline.setDate(deadline.getDate() - 1);
      deadline.setHours(20, 0, 0, 0);
    } else if (mealType === "lunch") {
      deadline.setHours(10, 0, 0, 0);
    } else if (mealType === "snacks") {
      deadline.setHours(14, 0, 0, 0);
    } else if (mealType === "dinner") {
      deadline.setHours(16, 0, 0, 0);
    }
    
    if (currentDate > deadline) {
      return res.status(400).json({ 
        message: "Selection deadline has passed" 
      });
    }
    
    // Check if user already has a selection for this meal and date
    const existingSelection = await MenuSelection.findOne({
      userId: req.body.userId,
      mealType,
      date: {
        $gte: new Date(selectionDate.setHours(0, 0, 0, 0)),
        $lt: new Date(selectionDate.setHours(23, 59, 59, 999))
      }
    });
    
    if (existingSelection) {
      // Update existing selection
      existingSelection.selectedItems = selectedItems;
      existingSelection.updatedAt = new Date();
      await existingSelection.save();
      
      return res.json({
        message: "Menu selection updated successfully",
        selection: existingSelection,
      });
    }
    
    // Create new selection
    const newSelection: IMenuSelection = new MenuSelection({
      userId: req.body.userId,
      mealType,
      date: selectionDate,
      selectedItems,
      deadline,
    });
    
    await newSelection.save();
    
    res.status(201).json({
      message: "Menu selection submitted successfully",
      selection: newSelection,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all menu selections (admin only)
router.get("/all", authenticateUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { mealType, date } = req.query;
    const query: any = {};
    
    if (mealType) {
      query.mealType = mealType;
    }
    
    if (date) {
      const queryDate = new Date(date as string);
      query.date = {
        $gte: new Date(queryDate.setHours(0, 0, 0, 0)),
        $lt: new Date(queryDate.setHours(23, 59, 59, 999))
      };
    }
    
    const selections = await MenuSelection.find(query)
      .populate("userId", "username email")
      .populate("selectedItems")
      .sort({ date: -1 });
    
    res.json(selections);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
