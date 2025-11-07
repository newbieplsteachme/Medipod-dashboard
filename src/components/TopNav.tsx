import { Bell, Search, User, Settings, LogOut, UserCircle, HelpCircle, AlertCircle, CheckCircle2, Clock, Activity, Package, Wrench, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SearchResults } from "./SearchResults";

interface TopNavProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Low Stock Alert",
    message: "Alcohol Wipes inventory is critically low",
    time: "5 min ago",
    icon: AlertCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    id: 2,
    type: "success",
    title: "Maintenance Complete",
    message: "MP-042 sensor calibration finished",
    time: "1 hour ago",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50"
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled Maintenance",
    message: "MP-018 maintenance due tomorrow",
    time: "2 hours ago",
    icon: Clock,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50"
  },
];

export function TopNav({ activePage, onPageChange }: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  
  const menuItems = [
    { id: "activity", label: "Activity", icon: Activity },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "operations", label: "Operations", icon: BarChart3 },
  ];

  return (
    <div className="border-b bg-white sticky top-0 z-20">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white">MP</span>
            </div>
            <span className="text-xl">Medipod</span>
          </div>

          <nav className="hidden lg:flex items-center gap-1 ml-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? "bg-teal-50 text-teal-700" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors hidden md:flex">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 md:w-[500px] p-0" align="end">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search medipods, inventory, maintenance..."
                    className="pl-10 bg-gray-50 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-3">
                {searchQuery.trim() === "" ? (
                  <div className="py-8 text-center text-gray-500 text-sm">
                    <Search className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                    <p>Start typing to search</p>
                  </div>
                ) : (
                  <SearchResults 
                    query={searchQuery} 
                    onResultClick={(page) => {
                      onPageChange(page);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }} 
                  />
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                  {notifications.length}
                </Badge>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="text-sm">Notifications</h3>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div key={notification.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm mb-1">{notification.title}</p>
                          <p className="text-xs text-gray-500 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 border-t">
                <button 
                  className="text-sm text-teal-600 hover:text-teal-700 w-full text-center"
                  onClick={() => onPageChange("notifications")}
                >
                  View all notifications
                </button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-teal-100 text-teal-700">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div>
                  <p className="text-sm">Admin User</p>
                  <p className="text-xs text-gray-500">admin@medipod.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button 
            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search medipods, inventory..."
                className="pl-10 bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery.trim() !== "" && (
              <div className="mt-3 max-h-[300px] overflow-y-auto">
                <SearchResults 
                  query={searchQuery} 
                  onResultClick={(page) => {
                    onPageChange(page);
                    setMobileMenuOpen(false);
                    setSearchQuery("");
                  }} 
                />
              </div>
            )}
          </div>
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? "bg-teal-50 text-teal-700" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
