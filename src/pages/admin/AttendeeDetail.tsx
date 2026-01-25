import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Heart,
  Package,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const attendee = {
  id: 1,
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.j@email.com",
  phone: "(555) 123-4567",
  address: "456 Oak Street, Brooklyn, NY 11201",
  signupMethod: "google",
  registeredAt: "Jan 5, 2026",
  eventsAttended: 8,
  status: "active",
  linkedSponsorship: {
    id: 1,
    name: "ABC Corporation",
    role: "Representative",
  },
  assignedItems: [
    { id: 1, name: "Food Packets", event: "Community Cleanup Day", qty: 50, status: "Delivered" },
    { id: 2, name: "Wristbands", event: "Community Cleanup Day", qty: 100, status: "Pending" },
  ],
};

const eventHistory = [
  { id: 1, name: "Community Cleanup Day", date: "Jan 15, 2026", status: "registered", role: "Attendee" },
  { id: 2, name: "Holiday Food Drive", date: "Dec 20, 2025", status: "attended", role: "Sponsor Rep" },
  { id: 3, name: "Fall Festival", date: "Oct 15, 2025", status: "attended", role: "Attendee" },
  { id: 4, name: "Summer BBQ", date: "Jul 4, 2025", status: "attended", role: "Attendee" },
];

export default function AttendeeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const getSignupBadge = (method: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      google: { label: "Google", variant: "default" },
      email: { label: "Email", variant: "secondary" },
      phone: { label: "Phone", variant: "outline" },
    };
    const config = variants[method] || { label: method, variant: "outline" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      registered: "secondary",
      attended: "default",
      cancelled: "outline",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">
                {attendee.firstName} {attendee.lastName}
              </h1>
              <Badge variant={attendee.status === "active" ? "default" : "secondary"}>
                {attendee.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">Registered {attendee.registeredAt}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/admin/attendees/${id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Attendee
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendee.eventsAttended}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signup Method</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="pt-1">{getSignupBadge(attendee.signupMethod)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Linked Sponsor</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{attendee.linkedSponsorship?.name || "None"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendee.assignedItems.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Event History</TabsTrigger>
          <TabsTrigger value="items">Assigned Items</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {attendee.firstName[0]}{attendee.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{attendee.firstName} {attendee.lastName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getSignupBadge(attendee.signupMethod)}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{attendee.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{attendee.phone}</span>
                  </div>
                  {attendee.address && (
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{attendee.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Linked Sponsorship */}
            {attendee.linkedSponsorship && (
              <Card>
                <CardHeader>
                  <CardTitle>Linked Sponsorship</CardTitle>
                  <CardDescription>This attendee represents a sponsor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{attendee.linkedSponsorship.name}</p>
                        <p className="text-sm text-muted-foreground">{attendee.linkedSponsorship.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/sponsors/${attendee.linkedSponsorship?.id}`)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event History</CardTitle>
              <CardDescription>All events this attendee has registered for or attended</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventHistory.map((event) => (
                    <TableRow key={event.id} className="cursor-pointer" onClick={() => navigate(`/admin/events/${event.id}`)}>
                      <TableCell className="font-medium text-foreground">{event.name}</TableCell>
                      <TableCell className="text-muted-foreground">{event.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.role}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Items</CardTitle>
              <CardDescription>Items this attendee is responsible for (sponsor/lead)</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendee.assignedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                      <TableCell className="text-muted-foreground">{item.event}</TableCell>
                      <TableCell>{item.qty}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Delivered" ? "default" : "secondary"}>
                          {item.status === "Delivered" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
