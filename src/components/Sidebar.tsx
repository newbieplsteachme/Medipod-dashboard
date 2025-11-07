import { Activity, Package, Wrench, BarChart3 } from "lucide-react";

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: "activity", label: "Activity", icon: Activity },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "operations", label: "Operations", icon: BarChart3 },
  ];

  return (
    <div className="w-20 bg-white border-r flex flex-col items-center py-8 gap-6 fixed left-0 top-16 bottom-0 z-10">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        
        return (
          <div
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all group ${
              isActive ? "text-teal-600" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                isActive
                  ? "bg-teal-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-[10px]">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
