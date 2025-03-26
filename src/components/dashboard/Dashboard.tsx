
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurCard } from "@/components/ui/BlurCard";
import { toast } from "sonner";

const Dashboard = () => {
  const [reportType, setReportType] = useState("student");
  const [reportFormat, setReportFormat] = useState("excel");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [mealType, setMealType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const studentData = [
    { id: "1", regNo: "2023CS001", name: "John Doe", block: "A", room: "101", mess: "North Campus", type: "Non-Veg" },
    { id: "2", regNo: "2023CS002", name: "Jane Smith", block: "B", room: "203", mess: "South Campus", type: "Veg" },
    { id: "3", regNo: "2023CS003", name: "Robert Johnson", block: "C", room: "304", mess: "Main Block", type: "Special" },
    { id: "4", regNo: "2023CS004", name: "Emily Williams", block: "A", room: "105", mess: "North Campus", type: "Veg" },
    { id: "5", regNo: "2023CS005", name: "Michael Brown", block: "D", room: "402", mess: "Women's Hostel", type: "Night mess" },
  ];

  const mealData = [
    { date: "2023-10-01", meal: "Breakfast", studentCount: 210, vegCount: 120, nonVegCount: 90 },
    { date: "2023-10-01", meal: "Lunch", studentCount: 320, vegCount: 150, nonVegCount: 170 },
    { date: "2023-10-01", meal: "Dinner", studentCount: 290, vegCount: 140, nonVegCount: 150 },
    { date: "2023-10-02", meal: "Breakfast", studentCount: 205, vegCount: 115, nonVegCount: 90 },
    { date: "2023-10-02", meal: "Lunch", studentCount: 315, vegCount: 145, nonVegCount: 170 },
  ];

  const handleGenerateReport = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated in ${reportFormat.toUpperCase()} format`);
      setLoading(false);
    }, 1500);
  };

  const filteredStudents = studentData.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BlurCard variant="elevated" className="w-full mx-auto p-6">
      <div className="space-y-2 mb-6">
        <div className="chip">Admin Dashboard</div>
        <h2 className="heading-2">Mess Management Dashboard</h2>
        <p className="body-text">Generate reports and manage mess data</p>
      </div>
      
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="reports" className="text-sm">Reports</TabsTrigger>
          <TabsTrigger value="students" className="text-sm">Students</TabsTrigger>
          <TabsTrigger value="meals" className="text-sm">Meals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select 
                onValueChange={setReportType}
                value={reportType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student-wise</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="meal">Meal-wise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reportFormat">Report Format</Label>
              <Select 
                onValueChange={setReportFormat}
                value={reportFormat}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(reportType === "monthly" || reportType === "weekly") && (
              <div className="space-y-2">
                <Label>Select Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "MMMM yyyy") : <span>Select month</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            
            {reportType === "meal" && (
              <div className="space-y-2">
                <Label htmlFor="mealType">Meal Type</Label>
                <Select 
                  onValueChange={setMealType}
                  value={mealType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="night">Night Mess</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleGenerateReport} 
            className="flex items-center gap-2"
            disabled={loading}
          >
            <Download size={16} />
            {loading ? "Generating..." : "Generate Report"}
          </Button>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-6">
          <div className="flex items-center">
            <Input
              placeholder="Search by name or registration number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium text-sm">Reg. No</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Name</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Block</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Room</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Mess</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b transition-colors hover:bg-muted/30">
                    <td className="py-3 px-4 text-sm">{student.regNo}</td>
                    <td className="py-3 px-4 text-sm">{student.name}</td>
                    <td className="py-3 px-4 text-sm">{student.block}</td>
                    <td className="py-3 px-4 text-sm">{student.room}</td>
                    <td className="py-3 px-4 text-sm">{student.mess}</td>
                    <td className="py-3 px-4 text-sm">
                      <span 
                        className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          student.type === "Veg" && "bg-green-100 text-green-700",
                          student.type === "Non-Veg" && "bg-red-100 text-red-700",
                          student.type === "Special" && "bg-purple-100 text-purple-700",
                          student.type === "Night mess" && "bg-blue-100 text-blue-700",
                        )}
                      >
                        {student.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="meals" className="space-y-6">
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium text-sm">Date</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Meal</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Total Students</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Veg Count</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Non-Veg Count</th>
                </tr>
              </thead>
              <tbody>
                {mealData.map((meal, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-muted/30">
                    <td className="py-3 px-4 text-sm">{meal.date}</td>
                    <td className="py-3 px-4 text-sm">{meal.meal}</td>
                    <td className="py-3 px-4 text-sm">{meal.studentCount}</td>
                    <td className="py-3 px-4 text-sm">{meal.vegCount}</td>
                    <td className="py-3 px-4 text-sm">{meal.nonVegCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </BlurCard>
  );
};

export default Dashboard;
