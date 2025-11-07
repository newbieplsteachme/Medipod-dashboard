import { useState } from "react";
import { TopNav } from "./components/TopNav";
import { MedipodActivity } from "./components/MedipodActivity";
import { InventoryMonitoring } from "./components/InventoryMonitoring";
import { MaintenanceTracking } from "./components/MaintenanceTracking";
import { DailyOperations } from "./components/DailyOperations";
import { Notifications } from "./components/Notifications";

export default function App() {
  const [activePage, setActivePage] = useState("activity");

  const renderPage = () => {
    switch (activePage) {
      case "activity":
        return <MedipodActivity />;
      case "inventory":
        return <InventoryMonitoring />;
      case "maintenance":
        return <MaintenanceTracking />;
      case "operations":
        return <DailyOperations />;
      case "notifications":
        return <Notifications />;
      default:
        return <MedipodActivity />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav activePage={activePage} onPageChange={setActivePage} />
      <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
        {renderPage()}
      </main>
    </div>
  );
}
