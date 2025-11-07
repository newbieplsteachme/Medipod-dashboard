import { Search, Activity, Package, Wrench, BarChart3, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface SearchResultsProps {
  query: string;
  onResultClick: (page: string) => void;
}

export function SearchResults({ query, onResultClick }: SearchResultsProps) {
  const searchData = [
    // Medipod Activity
    { id: "mp-001", title: "MP-001", description: "Active medipod - 15 tests today", category: "activity", page: "activity" },
    { id: "mp-002", title: "MP-002", description: "Active medipod - 12 tests today", category: "activity", page: "activity" },
    { id: "mp-042", title: "MP-042", description: "Recently maintained - Sensor calibration", category: "activity", page: "activity" },
    { id: "mp-018", title: "MP-018", description: "Maintenance scheduled for tomorrow", category: "activity", page: "activity" },
    { id: "mp-007", title: "MP-007", description: "Currently offline", category: "activity", page: "activity" },
    { id: "mp-023", title: "MP-023", description: "Error reported - Sensor error E-401", category: "activity", page: "activity" },
    
    // Inventory
    { id: "inv-001", title: "Test Strips", description: "Stock: 450/500 units - Good status", category: "inventory", page: "inventory" },
    { id: "inv-002", title: "Alcohol Wipes", description: "Stock: 5/200 units - Critical Low", category: "inventory", page: "inventory" },
    { id: "inv-003", title: "Lancets", description: "Stock: 280/300 units - Good status", category: "inventory", page: "inventory" },
    { id: "inv-004", title: "Cotton Swabs", description: "Stock: 85/250 units - Low stock", category: "inventory", page: "inventory" },
    { id: "inv-005", title: "Bandages", description: "Stock: 420/500 units - Good status", category: "inventory", page: "inventory" },
    
    // Maintenance
    { id: "maint-001", title: "Sensor Calibration", description: "Common maintenance task", category: "maintenance", page: "maintenance" },
    { id: "maint-002", title: "Display Error", description: "MP-015 - Fixed by Tech-A", category: "maintenance", page: "maintenance" },
    { id: "maint-003", title: "Battery Replacement", description: "MP-003 - Completed by Tech-B", category: "maintenance", page: "maintenance" },
    { id: "maint-004", title: "Software Bug", description: "MP-008 - Under investigation", category: "maintenance", page: "maintenance" },
    { id: "maint-005", title: "Power Failure", description: "MP-012 - Resolved by Tech-C", category: "maintenance", page: "maintenance" },
    
    // Operations
    { id: "ops-001", title: "Daily Customer Reports", description: "View customer service metrics", category: "operations", page: "operations" },
    { id: "ops-002", title: "Weekly Trends", description: "Analyze weekly performance data", category: "operations", page: "operations" },
    { id: "ops-003", title: "Peak Usage Hours", description: "8AM-10AM highest activity period", category: "operations", page: "operations" },
  ];

  const results = query.trim() === "" 
    ? [] 
    : searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "activity": return Activity;
      case "inventory": return Package;
      case "maintenance": return Wrench;
      case "operations": return BarChart3;
      default: return Search;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "activity": return "bg-teal-50 text-teal-700 border-teal-200";
      case "inventory": return "bg-blue-50 text-blue-700 border-blue-200";
      case "maintenance": return "bg-orange-50 text-orange-700 border-orange-200";
      case "operations": return "bg-purple-50 text-purple-700 border-purple-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (query.trim() === "") {
    return (
      <div className="py-12 text-center text-gray-500">
        <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>Start typing to search across medipods, inventory, maintenance, and operations</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No results found for "{query}"</p>
        <p className="text-sm mt-2">Try searching for medipod IDs, inventory items, or maintenance tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-2">
        {results.map((result) => {
          const Icon = getCategoryIcon(result.category);
          return (
            <div
              key={result.id}
              className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-all hover:border-teal-300"
              onClick={() => onResultClick(result.page)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg ${getCategoryColor(result.category)} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium">{result.title}</h3>
                    <Badge variant="outline" className="text-xs capitalize">
                      {result.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{result.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
