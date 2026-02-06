import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Heart, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { fetchDashboard } from "@/services/backend";
import { DashboardData } from "@/types";
import { dashboardData } from "@/mocks/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Users,
  Heart,
  TrendingUp,
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(dashboardData);

  useEffect(() => {
    fetchDashboard()
      .then((res) => setData(res && Array.isArray(res.stats) ? res : dashboardData))
      .catch(() => setData(dashboardData));
  }, []);

  const stats = data?.stats ?? [];
  const recentEvents = data?.recentEvents ?? [];
  const recentVolunteers = data?.recentVolunteers ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your organization.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon] || Calendar;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Your latest event activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.name} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-foreground">{event.name}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{event.attendees} attendees</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.status === "Upcoming" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Volunteers */}
        <Card>
          <CardHeader>
            <CardTitle>New Volunteers</CardTitle>
            <CardDescription>Recently joined team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVolunteers.map((volunteer) => (
                <div key={volunteer.name} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {volunteer.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{volunteer.name}</p>
                      <p className="text-sm text-muted-foreground">{volunteer.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{volunteer.joinedDate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
