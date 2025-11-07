import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Package, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Progress } from "./ui/progress";

const inventoryData = [
  { 
    item: "Test Strips", 
    current: 450, 
    capacity: 500, 
    status: "sufficient", 
    nextRefill: "Nov 15, 2025" 
  },
  { 
    item: "Lancets", 
    current: 280, 
    capacity: 1000, 
    status: "low", 
    nextRefill: "Nov 10, 2025" 
  },
  { 
    item: "Alcohol Wipes", 
    current: 89, 
    capacity: 500, 
    status: "critical", 
    nextRefill: "Nov 8, 2025" 
  },
  { 
    item: "Reagent Cartridges", 
    current: 340, 
    capacity: 400, 
    status: "sufficient", 
    nextRefill: "Nov 20, 2025" 
  },
  { 
    item: "Collection Tubes", 
    current: 120, 
    capacity: 600, 
    status: "low", 
    nextRefill: "Nov 12, 2025" 
  },
  { 
    item: "Gloves (Pairs)", 
    current: 780, 
    capacity: 800, 
    status: "sufficient", 
    nextRefill: "Nov 18, 2025" 
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "sufficient":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "low":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "critical":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "sufficient":
      return <CheckCircle2 className="w-4 h-4" />;
    case "low":
    case "critical":
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return null;
  }
};

export function InventoryMonitoring() {
  const criticalItems = inventoryData.filter(item => item.status === "critical").length;
  const lowItems = inventoryData.filter(item => item.status === "low").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Inventory Monitoring</h2>
        <p className="text-gray-500 text-sm">Track stock levels and restock alerts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-emerald-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Total Items</CardTitle>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{inventoryData.length}</div>
            <p className="text-sm text-gray-500">Categories tracked</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Low Stock</CardTitle>
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{lowItems}</div>
            <p className="text-sm text-yellow-600">Needs attention</p>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-gray-600">Critical Stock</CardTitle>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{criticalItems}</div>
            <p className="text-sm text-red-600">Urgent restock</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Stock Levels</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Item</TableHead>
                <TableHead className="min-w-[200px]">Stock Level</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Next Refill</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => {
                const percentage = (item.current / item.capacity) * 100;
                return (
                  <TableRow key={item.item}>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {item.current} / {item.capacity}
                          </span>
                          <span className="text-gray-500">{percentage.toFixed(0)}%</span>
                        </div>
                        <Progress 
                          value={percentage} 
                          className={`h-2 ${
                            item.status === 'critical' ? 'bg-red-100' : 
                            item.status === 'low' ? 'bg-yellow-100' : 
                            'bg-emerald-100'
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        <span className="flex items-center gap-1">
                          {getStatusIcon(item.status)}
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {item.nextRefill}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
