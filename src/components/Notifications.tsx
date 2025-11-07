import { AlertCircle, CheckCircle2, Clock, Info, Bell, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";

const allNotifications = [
  {
    id: 1,
    type: "alert",
    title: "Low Stock Alert",
    message: "Alcohol Wipes inventory is critically low (5 units remaining)",
    time: "5 min ago",
    timestamp: "2025-11-07T14:25:00",
    icon: AlertCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    read: false
  },
  {
    id: 2,
    type: "success",
    title: "Maintenance Complete",
    message: "MP-042 sensor calibration finished successfully",
    time: "1 hour ago",
    timestamp: "2025-11-07T13:30:00",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    read: false
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled Maintenance",
    message: "MP-018 maintenance due tomorrow at 9:00 AM",
    time: "2 hours ago",
    timestamp: "2025-11-07T12:30:00",
    icon: Clock,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    read: false
  },
  {
    id: 4,
    type: "alert",
    title: "Pod Offline",
    message: "MP-007 has been offline for 15 minutes",
    time: "3 hours ago",
    timestamp: "2025-11-07T11:30:00",
    icon: AlertCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    read: true
  },
  {
    id: 5,
    type: "success",
    title: "Stock Replenished",
    message: "Test Strips inventory restocked to 500 units",
    time: "5 hours ago",
    timestamp: "2025-11-07T09:30:00",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    read: true
  },
  {
    id: 6,
    type: "info",
    title: "Daily Report Generated",
    message: "Operations report for November 6, 2025 is ready",
    time: "6 hours ago",
    timestamp: "2025-11-07T08:30:00",
    icon: Info,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    read: true
  },
  {
    id: 7,
    type: "alert",
    title: "Error Log",
    message: "MP-023 reported sensor error code E-401",
    time: "8 hours ago",
    timestamp: "2025-11-07T06:30:00",
    icon: AlertCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    read: true
  },
  {
    id: 8,
    type: "success",
    title: "System Update Complete",
    message: "All medipods updated to firmware v2.4.1",
    time: "1 day ago",
    timestamp: "2025-11-06T14:30:00",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    read: true
  },
  {
    id: 9,
    type: "info",
    title: "Usage Milestone",
    message: "1,000 total tests conducted this month",
    time: "1 day ago",
    timestamp: "2025-11-06T10:00:00",
    icon: Info,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    read: true
  },
  {
    id: 10,
    type: "alert",
    title: "Restock Required",
    message: "Cotton Swabs below minimum threshold",
    time: "2 days ago",
    timestamp: "2025-11-05T16:00:00",
    icon: AlertCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    read: true
  },
];

export function Notifications() {
  const [filter, setFilter] = useState<"all" | "unread" | "alert" | "success" | "info">("all");
  const [notifications, setNotifications] = useState(allNotifications);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl mb-2">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button 
            onClick={markAllAsRead}
            variant="outline"
            className="w-full md:w-auto"
          >
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="w-full md:w-auto grid grid-cols-5 md:inline-flex">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="alert">Alerts</TabsTrigger>
          <TabsTrigger value="success">Success</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No notifications to display</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <Card 
                    key={notification.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      !notification.read ? 'border-l-4 border-l-teal-500' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4 md:p-6">
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${notification.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className={`text-base md:text-lg ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                notification.type === 'alert' ? 'border-red-200 text-red-600' :
                                notification.type === 'success' ? 'border-emerald-200 text-emerald-600' :
                                'border-blue-200 text-blue-600'
                              }`}
                            >
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
