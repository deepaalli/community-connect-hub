import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  QrCode,
  Search,
  UserCheck,
  UserX,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const eventInfo = {
  id: 1,
  title: "Community Cleanup Day",
  date: "January 20, 2026",
  time: "9:00 AM - 1:00 PM",
  registered: 45,
  checkedIn: 32,
  noShow: 5,
};

const attendees = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", role: "Team Lead", status: "checked-in", checkInTime: "8:55 AM" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", role: "Volunteer", status: "checked-in", checkInTime: "9:02 AM" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", role: "Volunteer", status: "checked-in", checkInTime: "9:10 AM" },
  { id: 4, name: "James Wilson", email: "j.wilson@email.com", role: "Volunteer", status: "registered", checkInTime: null },
  { id: 5, name: "Lisa Martinez", email: "lisa.m@email.com", role: "Coordinator", status: "no-show", checkInTime: null },
  { id: 6, name: "Robert Brown", email: "r.brown@email.com", role: "Volunteer", status: "registered", checkInTime: null },
  { id: 7, name: "Amanda Lee", email: "a.lee@email.com", role: "Volunteer", status: "checked-in", checkInTime: "9:15 AM" },
  { id: 8, name: "David Kim", email: "d.kim@email.com", role: "Team Lead", status: "checked-out", checkInTime: "8:50 AM", checkOutTime: "12:30 PM" },
];

const recentCheckins = [
  { name: "Amanda Lee", time: "9:15 AM", type: "check-in" },
  { name: "David Kim", time: "12:30 PM", type: "check-out" },
  { name: "Emily Davis", time: "9:10 AM", type: "check-in" },
  { name: "Michael Chen", time: "9:02 AM", type: "check-in" },
];

export default function EventCheckin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAttendees = attendees.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; label: string }> = {
      "checked-in": { variant: "default", label: "Checked In" },
      "checked-out": { variant: "secondary", label: "Checked Out" },
      "registered": { variant: "outline", label: "Registered" },
      "no-show": { variant: "destructive", label: "No Show" },
    };
    const { variant, label } = config[status] || { variant: "outline", label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const handleCheckIn = (attendeeId: number) => {
    console.log("Check in attendee:", attendeeId);
  };

  const handleCheckOut = (attendeeId: number) => {
    console.log("Check out attendee:", attendeeId);
  };

  const handleMarkNoShow = (attendeeId: number) => {
    console.log("Mark no-show:", attendeeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/events/${id}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Event Check-in</h1>
            <p className="text-muted-foreground">{eventInfo.title} • {eventInfo.date}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{eventInfo.registered}</p>
                <p className="text-sm text-muted-foreground">Registered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{eventInfo.checkedIn}</p>
                <p className="text-sm text-muted-foreground">Checked In</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{eventInfo.noShow}</p>
                <p className="text-sm text-muted-foreground">No Shows</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-muted">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round((eventInfo.checkedIn / eventInfo.registered) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* QR Scanner Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
              <div className="text-center space-y-2">
                <QrCode className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">QR Scanner Placeholder</p>
                <p className="text-xs text-muted-foreground">Camera access required</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button className="w-full" variant="outline">
                Enable Camera
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Check-ins */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCheckins.map((checkin, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {checkin.type === "check-in" ? (
                      <UserCheck className="h-5 w-5 text-green-500" />
                    ) : (
                      <UserX className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{checkin.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{checkin.type.replace("-", " ")}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{checkin.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendee Search and List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <CardTitle>Attendees</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{attendee.name}</p>
                      <p className="text-xs text-muted-foreground">{attendee.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{attendee.role}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(attendee.status)}</TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {attendee.checkInTime || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {attendee.status === "registered" && (
                        <>
                          <Button size="sm" onClick={() => handleCheckIn(attendee.id)}>
                            Check In
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkNoShow(attendee.id)}
                          >
                            No Show
                          </Button>
                        </>
                      )}
                      {attendee.status === "checked-in" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCheckOut(attendee.id)}
                        >
                          Check Out
                        </Button>
                      )}
                      {(attendee.status === "checked-out" || attendee.status === "no-show") && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCheckIn(attendee.id)}
                        >
                          Re-check In
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
