
import mongoose, { Document, Schema } from "mongoose";

export interface IMenuSelection extends Document {
  userId: mongoose.Types.ObjectId;
  mealType: "breakfast" | "lunch" | "snacks" | "dinner";
  date: Date;
  selectedItems: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
}

const MenuSelectionSchema = new Schema<IMenuSelection>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mealType: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "snacks", "dinner"],
  },
  date: {
    type: Date,
    required: true,
  },
  selectedItems: [{
    type: Schema.Types.ObjectId,
    ref: "MenuItem",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  }
});

const MenuSelection = mongoose.model<IMenuSelection>("MenuSelection", MenuSelectionSchema);

export default MenuSelection;
