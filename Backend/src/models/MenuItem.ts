
import mongoose, { Document, Schema } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  category: string;
  mealType: "breakfast" | "lunch" | "snacks" | "dinner";
  dietaryType: "veg" | "non-veg";
  description?: string;
  available: boolean;
  createdAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>({
  name: {
    type: String,
    required: [true, "Food item name is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  mealType: {
    type: String,
    required: [true, "Meal type is required"],
    enum: ["breakfast", "lunch", "snacks", "dinner"],
  },
  dietaryType: {
    type: String,
    required: [true, "Dietary type is required"],
    enum: ["veg", "non-veg"],
  },
  description: {
    type: String,
    trim: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MenuItem = mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);

export default MenuItem;
