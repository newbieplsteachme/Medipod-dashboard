import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, TrendingUp, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const customersPerDay = [
  { day: "Mon", customers: 234 },
  { day: "Tue", customers: 289 },
  { day: "Wed", customers: 267 },
  { day: "Thu", customers: 312 },
  { day: "Fri", customers: 298 },
  { day: "Sat", customers: 189 },
  { day: "Sun", customers: 145 },
];

const weeklyTrend = [
  { week: "Week 1", customers: 1456 },
  { week: "Week 2", customers: 1689 },
  { week: "Week 3", customers: 1834 },
  { week: "Week 4", customers: 1734 },
];

const peakDaysData = [
  { day: "Thursday", avgCustomers: 312, trend: "+8%" },
  { day: "Tuesday", avgCustomers: 289, trend: "+5%" },
  { day: "Friday", avgCustomers: 298, trend: "+6%" },
];

export function DailyOperations() {
  const totalCustomersThisWeek = customersPerDay.reduce((sum, day) => sum + day.customers, 0);
  const avgDaily = Math.round(totalCustomersThisWeek / customersPerDay.length);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Daily Operations</h2>
        <p className="text-gray-500 text-sm">Customer service metrics and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-teal-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">This Week</CardTitle>
              <Users className="w-5 h-5 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{totalCustomersThisWeek.toLocaleString()}</div>
            <p className="text-sm text-emerald-600">↑ 15% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Avg Daily</CardTitle>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{avgDaily}</div>
            <p className="text-sm text-gray-500">Customers per day</p>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Peak Day</CardTitle>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">Thu</div>
            <p className="text-sm text-purple-600">312 customers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Users className="w-5 h-5 text-teal-600" />
            <span className="truncate">Customers Served Per Day</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customersPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" style={{ fontSize: '12px' }} />
              <YAxis stroke="#888" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Bar dataKey="customers" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span className="truncate">Weekly Trend Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#888" style={{ fontSize: '12px' }} />
              <YAxis stroke="#888" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="customers" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Busiest Days Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {peakDaysData.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-white rounded-lg border border-teal-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-700">#{index + 1}</span>
                  </div>
                  <div>
                    <div>{day.day}</div>
                    <div className="text-sm text-gray-500">Average customers served</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl">{day.avgCustomers}</div>
                  <div className="text-sm text-emerald-600">{day.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
