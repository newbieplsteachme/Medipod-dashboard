import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Activity, Zap, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailyTestsData = [
  { day: "Mon", tests: 145 },
  { day: "Tue", tests: 189 },
  { day: "Wed", tests: 167 },
  { day: "Thu", tests: 203 },
  { day: "Fri", tests: 178 },
  { day: "Sat", tests: 134 },
  { day: "Sun", tests: 98 },
];

const peakHoursData = [
  { hour: "6AM", usage: 12 },
  { hour: "8AM", usage: 45 },
  { hour: "10AM", usage: 78 },
  { hour: "12PM", usage: 92 },
  { hour: "2PM", usage: 85 },
  { hour: "4PM", usage: 67 },
  { hour: "6PM", usage: 54 },
  { hour: "8PM", usage: 23 },
];

export function MedipodActivity() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Medipod Activity</h2>
        <p className="text-gray-500 text-sm">Real-time monitoring of all medipod units</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-teal-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Active Pods</CardTitle>
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">42</div>
            <p className="text-sm text-emerald-600">↑ 12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Idle Pods</CardTitle>
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">8</div>
            <p className="text-sm text-gray-500">Available for use</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Activity className="w-5 h-5 text-teal-600" />
            <span className="truncate">Total Tests Conducted Daily</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyTestsData}>
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
              <Bar dataKey="tests" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Clock className="w-5 h-5 text-teal-600" />
            <span className="truncate">Peak Hours of Pod Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#888" style={{ fontSize: '12px' }} />
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
                dataKey="usage" 
                stroke="#14b8a6" 
                strokeWidth={3}
                dot={{ fill: '#14b8a6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
