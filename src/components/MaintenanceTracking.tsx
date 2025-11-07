import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wrench, AlertCircle, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const maintenanceHistory = [
  { 
    date: "Nov 5, 2025", 
    machineId: "MP-042", 
    status: "Completed", 
    technician: "Sarah Chen",
    issue: "Sensor calibration"
  },
  { 
    date: "Nov 4, 2025", 
    machineId: "MP-018", 
    status: "In Progress", 
    technician: "Mike Rodriguez",
    issue: "Screen replacement"
  },
  { 
    date: "Nov 3, 2025", 
    machineId: "MP-031", 
    status: "Completed", 
    technician: "David Kim",
    issue: "Routine maintenance"
  },
  { 
    date: "Nov 2, 2025", 
    machineId: "MP-007", 
    status: "Pending", 
    technician: "Sarah Chen",
    issue: "Software update"
  },
  { 
    date: "Nov 1, 2025", 
    machineId: "MP-025", 
    status: "Completed", 
    technician: "Mike Rodriguez",
    issue: "Print module repair"
  },
];

const frequentErrors = [
  { machineId: "MP-018", errorCount: 7, lastError: "Paper jam" },
  { machineId: "MP-007", errorCount: 5, lastError: "Network timeout" },
  { machineId: "MP-042", errorCount: 4, lastError: "Sensor drift" },
];

const maintenanceFrequency = [
  { month: "May", count: 12 },
  { month: "Jun", count: 15 },
  { month: "Jul", count: 18 },
  { month: "Aug", count: 14 },
  { month: "Sep", count: 16 },
  { month: "Oct", count: 19 },
  { month: "Nov", count: 8 },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200" variant="outline">Completed</Badge>;
    case "In Progress":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200" variant="outline">In Progress</Badge>;
    case "Pending":
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200" variant="outline">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function MaintenanceTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Maintenance Tracking</h2>
        <p className="text-gray-500 text-sm">Monitor equipment health and service history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-teal-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Total Maintenance</CardTitle>
              <Wrench className="w-5 h-5 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">102</div>
            <p className="text-sm text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">In Progress</CardTitle>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">3</div>
            <p className="text-sm text-blue-600">Active jobs</p>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Frequent Errors</CardTitle>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{frequentErrors.length}</div>
            <p className="text-sm text-red-600">Machines need attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Machines with Frequent Errors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {frequentErrors.map((machine) => (
              <div key={machine.machineId} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-sm">{machine.machineId}</div>
                    <div className="text-xs text-gray-500">Last error: {machine.lastError}</div>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-700 border-red-200" variant="outline">
                  {machine.errorCount} errors
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance History</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Date</TableHead>
                <TableHead className="min-w-[100px]">Machine ID</TableHead>
                <TableHead className="min-w-[150px]">Issue</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Technician</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {record.machineId}
                    </span>
                  </TableCell>
                  <TableCell>{record.issue}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>{record.technician}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Frequency Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={maintenanceFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" style={{ fontSize: '12px' }} />
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
                dataKey="count" 
                stroke="#0891b2" 
                strokeWidth={3}
                dot={{ fill: '#0891b2', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
