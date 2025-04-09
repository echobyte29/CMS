import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, Legend,
  AreaChart, Area
} from "recharts";
import { 
  Calendar, Users, TrendingUp, Download,
  ChevronDown, Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";

export function DashboardCharts() {
  const [eventPeriod, setEventPeriod] = useState("week");
  const [membershipPeriod, setMembershipPeriod] = useState("week");
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    events: [],
    membership: [],
    engagement: []
  });

  // Sample data - Replace with actual API calls
  const eventData = {
    week: [
      { name: "Mon", events: 2, participants: 45 },
      { name: "Tue", events: 1, participants: 30 },
      { name: "Wed", events: 3, participants: 60 },
      { name: "Thu", events: 2, participants: 40 },
      { name: "Fri", events: 4, participants: 75 },
      { name: "Sat", events: 1, participants: 25 },
      { name: "Sun", events: 2, participants: 35 }
    ],
    month: [
      { name: "Week 1", events: 8, participants: 150 },
      { name: "Week 2", events: 12, participants: 220 },
      { name: "Week 3", events: 10, participants: 180 },
      { name: "Week 4", events: 15, participants: 280 }
    ],
    quarter: [
      { name: "Jan", events: 25, participants: 450 },
      { name: "Feb", events: 30, participants: 520 },
      { name: "Mar", events: 28, participants: 480 }
    ],
    year: [
      { name: "Q1", events: 83, participants: 1450 },
      { name: "Q2", events: 95, participants: 1620 },
      { name: "Q3", events: 88, participants: 1480 },
      { name: "Q4", events: 92, participants: 1550 }
    ]
  };

  const membershipData = {
    week: [
      { name: "Mon", new: 5, total: 120 },
      { name: "Tue", new: 3, total: 123 },
      { name: "Wed", new: 7, total: 130 },
      { name: "Thu", new: 4, total: 134 },
      { name: "Fri", new: 6, total: 140 },
      { name: "Sat", new: 2, total: 142 },
      { name: "Sun", new: 4, total: 146 }
    ],
    month: [
      { name: "Week 1", new: 25, total: 165 },
      { name: "Week 2", new: 30, total: 195 },
      { name: "Week 3", new: 28, total: 223 },
      { name: "Week 4", new: 35, total: 258 }
    ],
    quarter: [
      { name: "Jan", new: 95, total: 353 },
      { name: "Feb", new: 110, total: 463 },
      { name: "Mar", new: 105, total: 568 }
    ],
    year: [
      { name: "Q1", new: 310, total: 568 },
      { name: "Q2", new: 340, total: 908 },
      { name: "Q3", new: 320, total: 1228 },
      { name: "Q4", new: 350, total: 1578 }
    ]
  };

  const engagementData = {
    week: [
      { name: "Mon", active: 85, total: 146 },
      { name: "Tue", active: 92, total: 146 },
      { name: "Wed", active: 88, total: 146 },
      { name: "Thu", active: 95, total: 146 },
      { name: "Fri", active: 90, total: 146 },
      { name: "Sat", active: 82, total: 146 },
      { name: "Sun", active: 87, total: 146 }
    ],
    month: [
      { name: "Week 1", active: 120, total: 165 },
      { name: "Week 2", active: 145, total: 195 },
      { name: "Week 3", active: 155, total: 223 },
      { name: "Week 4", active: 180, total: 258 }
    ],
    quarter: [
      { name: "Jan", active: 320, total: 353 },
      { name: "Feb", active: 380, total: 463 },
      { name: "Mar", active: 420, total: 568 }
    ],
    year: [
      { name: "Q1", active: 420, total: 568 },
      { name: "Q2", active: 680, total: 908 },
      { name: "Q3", active: 850, total: 1228 },
      { name: "Q4", active: 1100, total: 1578 }
    ]
  };

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setChartData({
          events: eventData[eventPeriod],
          membership: membershipData[membershipPeriod],
          engagement: engagementData[membershipPeriod]
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [eventPeriod, membershipPeriod]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-4">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Event Participation Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Event Participation</h3>
          </div>
          <div className="flex items-center gap-2">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-[300px]"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {eventPeriod.charAt(0).toUpperCase() + eventPeriod.slice(1)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setEventPeriod("week")}>Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEventPeriod("month")}>Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEventPeriod("quarter")}>Quarter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEventPeriod("year")}>Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.events}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="events" 
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]}
                name="Events"
              />
              <Bar 
                dataKey="participants" 
                fill="var(--primary-foreground)" 
                radius={[4, 4, 0, 0]}
                name="Participants"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Membership Growth Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-xl">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Membership Growth</h3>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {membershipPeriod.charAt(0).toUpperCase() + membershipPeriod.slice(1)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setMembershipPeriod("week")}>Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMembershipPeriod("month")}>Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMembershipPeriod("quarter")}>Quarter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMembershipPeriod("year")}>Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData.membership}>
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--green-500)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--green-500)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="new" 
                stroke="var(--green-500)" 
                fillOpacity={1} 
                fill="url(#colorNew)"
                name="New Members"
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="var(--primary)" 
                fillOpacity={1} 
                fill="url(#colorTotal)"
                name="Total Members"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Member Engagement Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold">Member Engagement</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.engagement}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="var(--blue-500)" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Active Members"
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="var(--primary)" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Total Members"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
} 