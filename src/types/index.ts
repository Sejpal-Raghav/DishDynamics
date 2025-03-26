
export type StudentInfo = {
  id?: string;
  regNo: string;
  name: string;
  block: string;
  roomNumber: string;
  mess: string;
  messType: "Veg" | "Non-Veg" | "Special" | "Night mess";
}

export type MenuSelection = {
  id?: string;
  studentId: string;
  mealType: "Breakfast" | "Lunch" | "Snacks" | "Dinner" | "Night mess";
  suggestion?: string;
  feasibleForMassProduction: boolean;
  date: Date;
}

export type Report = {
  type: "Student" | "Monthly" | "Weekly" | "Meal";
  format: "Excel" | "PDF";
}
