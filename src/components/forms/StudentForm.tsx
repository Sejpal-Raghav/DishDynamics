
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { BlurCard } from "@/components/ui/BlurCard";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    regNo: "",
    name: "",
    block: "",
    roomNumber: "",
    mess: "",
    messType: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ["regNo", "name", "block", "roomNumber", "mess", "messType"];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Registration successful! You can now select your meal preferences.");
      setFormData({
        regNo: "",
        name: "",
        block: "",
        roomNumber: "",
        mess: "",
        messType: ""
      });
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const messList = ["North Campus Mess", "South Campus Mess", "Main Block Mess", "Women's Hostel Mess"];

  return (
    <BlurCard variant="elevated" className="w-full max-w-2xl mx-auto p-8 bg-card/50">
      <div className="space-y-2 mb-6">
        <div className="chip">Registration Form</div>
        <h2 className="heading-2">Student Registration</h2>
        <p className="body-text">Register yourself for mess services with your details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="regNo">Registration Number</Label>
            <Input
              id="regNo"
              name="regNo"
              placeholder="e.g. 2023ABCD1234"
              value={formData.regNo}
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="block">Block</Label>
            <Input
              id="block"
              name="block"
              placeholder="e.g. A-Block"
              value={formData.block}
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input
              id="roomNumber"
              name="roomNumber"
              placeholder="e.g. A-101"
              value={formData.roomNumber}
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mess">Select Mess</Label>
            <Select 
              onValueChange={(value) => handleSelectChange("mess", value)}
              value={formData.mess}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a mess" />
              </SelectTrigger>
              <SelectContent>
                {messList.map((mess) => (
                  <SelectItem key={mess} value={mess}>
                    {mess}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Mess Type</Label>
            <RadioGroup 
              onValueChange={(value) => handleSelectChange("messType", value)}
              value={formData.messType}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Veg" id="veg" />
                <Label htmlFor="veg" className="cursor-pointer">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Non-Veg" id="non-veg" />
                <Label htmlFor="non-veg" className="cursor-pointer">Non-Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Special" id="special" />
                <Label htmlFor="special" className="cursor-pointer">Special</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Night mess" id="night" />
                <Label htmlFor="night" className="cursor-pointer">Night Mess</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 transition-all"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </BlurCard>
  );
};

export default StudentForm;
