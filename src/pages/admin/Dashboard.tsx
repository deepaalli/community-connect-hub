import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Heart, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Events",
    value: "24",
    change: "+3 this month",
    icon: Calendar,
  },
  {
    title: "Active Volunteers",
    value: "156",
    change: "+12 this week",
    icon: Users,
  },
  {
    title: "Funds Raised",
    value: "$45,230",
    change: "+18% from last month",
    icon: Heart,
  },
  {
    title: "Event Attendees",
    value: "1,234",
    change: "+8% growth",
    icon: TrendingUp,
  },
];

const recentEvents = [
  { name: "Community Cleanup Day", date: "Jan 15, 2026", attendees: 45, status: "Upcoming" },
  { name: "Food Drive Collection", date: "Jan 10, 2026", attendees: 128, status: "Completed" },
  { name: "Youth Mentorship Workshop", date: "Jan 8, 2026", attendees: 32, status: "Completed" },
];

const recentVolunteers = [
  { name: "Sarah Johnson", role: "Event Coordinator", joinedDate: "Jan 2, 2026" },
  { name: "Michael Chen", role: "Food Bank Helper", joinedDate: "Jan 1, 2026" },
  { name: "Emily Davis", role: "Youth Mentor", joinedDate: "Dec 28, 2025" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your organization.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
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
