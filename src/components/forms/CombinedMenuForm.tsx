
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { BlurCard } from "@/components/ui/BlurCard";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CombinedMenuForm = () => {
  const [formData, setFormData] = useState({
    mealType: "",
    suggestion: "",
    feasibleForMassProduction: false,
    date: new Date(),
    priority: "medium",
    allergies: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, feasibleForMassProduction: checked }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.mealType) {
      toast.error("Please select a meal type");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Menu preferences submitted successfully!");
      setFormData({
        mealType: "",
        suggestion: "",
        feasibleForMassProduction: false,
        date: new Date(),
        priority: "medium",
        allergies: false,
      });
    } catch (error) {
      toast.error("Failed to submit menu preferences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner", "Night mess"];

  return (
    <BlurCard variant="elevated" className="w-full max-w-2xl mx-auto p-8 bg-card/50">
      <div className="space-y-2 mb-6">
        <div className="chip">Menu Preferences</div>
        <h2 className="heading-2">Meal Selection & Suggestions</h2>
        <p className="body-text">Select your meal preferences and suggest food items for the mess menu</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mealType">Meal Type</Label>
            <Select 
              onValueChange={(value) => handleSelectChange("mealType", value)}
              value={formData.mealType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateChange}
                  initialFocus
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suggestion">Food Item Suggestion</Label>
            <Textarea
              id="suggestion"
              name="suggestion"
              placeholder="Describe your food suggestion in detail"
              value={formData.suggestion}
              onChange={handleTextareaChange}
              className="min-h-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Priority Level</Label>
            <RadioGroup 
              onValueChange={(value) => handleSelectChange("priority", value)}
              value={formData.priority}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="cursor-pointer">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="cursor-pointer">High</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="feasibleForMassProduction"
              checked={formData.feasibleForMassProduction}
              onCheckedChange={handleCheckboxChange}
            />
            <div className="space-y-1">
              <Label 
                htmlFor="feasibleForMassProduction" 
                className="cursor-pointer"
              >
                Feasible for Mass Production
              </Label>
              <p className="text-sm text-muted-foreground">
                Check if your suggestion can be easily prepared for a large number of students
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="space-y-0">
              <Label htmlFor="allergies" className="cursor-pointer">
                Contains Common Allergens
              </Label>
              <p className="text-sm text-muted-foreground">
                Does your suggestion contain nuts, dairy, gluten, etc?
              </p>
            </div>
            <Switch
              id="allergies"
              checked={formData.allergies}
              onCheckedChange={(checked) => handleSwitchChange("allergies", checked)}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 transition-all"
        >
          {loading ? "Submitting..." : "Submit Preferences"}
        </Button>
      </form>
    </BlurCard>
  );
};

export default CombinedMenuForm;
