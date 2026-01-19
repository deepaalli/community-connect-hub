import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, MapPin, Users, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const events = [
  {
    id: 1,
    title: "Community Cleanup Day",
    date: "Jan 15, 2026",
    time: "9:00 AM",
    location: "Central Park",
    volunteers: 45,
    capacity: 50,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Youth Mentorship Workshop",
    date: "Jan 20, 2026",
    time: "2:00 PM",
    location: "Community Center",
    volunteers: 12,
    capacity: 30,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Food Drive Collection",
    date: "Jan 10, 2026",
    time: "10:00 AM",
    location: "Downtown Square",
    volunteers: 128,
    capacity: 100,
    status: "completed",
  },
  {
    id: 4,
    title: "Senior Care Visit",
    date: "Jan 25, 2026",
    time: "11:00 AM",
    location: "Sunshine Retirement Home",
    volunteers: 8,
    capacity: 20,
    status: "draft",
  },
];

export default function AdminEvents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      upcoming: "default",
      completed: "secondary",
      draft: "outline",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Manage and organize your events</p>
        </div>
        <Button onClick={() => navigate("/admin/events/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    {getStatusBadge(event.status)}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{event.volunteers}/{event.capacity} volunteers</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/admin/events/${event.id}`)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/admin/events/${event.id}/edit`)}>Edit Event</DropdownMenuItem>
                    <DropdownMenuItem>Manage Volunteers</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
