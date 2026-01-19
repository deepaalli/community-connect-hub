import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Edit,
  Mail,
  Phone,
  Check,
  X,
  Search,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const event = {
  id: 1,
  title: "Community Cleanup Day",
  description:
    "Join us for our annual community cleanup event. We'll be cleaning up the local park and surrounding areas. All supplies will be provided. Please wear comfortable clothing and closed-toe shoes.",
  date: "Jan 15, 2026",
  time: "9:00 AM - 2:00 PM",
  location: "Central Park",
  address: "123 Park Avenue, New York, NY 10001",
  volunteers: 45,
  capacity: 50,
  status: "upcoming",
  category: "Environment",
  contactName: "John Smith",
  contactEmail: "john@impacthub.org",
  contactPhone: "(555) 123-4567",
  requirements: "Comfortable clothing, closed-toe shoes. Gloves and supplies provided.",
};

const registeredVolunteers = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", phone: "(555) 123-4567", status: "confirmed", registeredAt: "Jan 5, 2026" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", phone: "(555) 234-5678", status: "confirmed", registeredAt: "Jan 6, 2026" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", phone: "(555) 345-6789", status: "pending", registeredAt: "Jan 8, 2026" },
  { id: 4, name: "James Wilson", email: "j.wilson@email.com", phone: "(555) 456-7890", status: "confirmed", registeredAt: "Jan 9, 2026" },
  { id: 5, name: "Lisa Martinez", email: "lisa.m@email.com", phone: "(555) 567-8901", status: "cancelled", registeredAt: "Jan 3, 2026" },
];

export default function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVolunteers = registeredVolunteers.filter(
    (volunteer) =>
      volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/events")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{event.title}</h1>
              <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                {event.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{event.category}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/admin/events/${id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Event
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="volunteers">
            Volunteers ({event.volunteers})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Event Information */}
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{event.description}</p>
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-foreground">{event.location}</span>
                      <p className="text-muted-foreground text-xs">{event.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {event.volunteers} / {event.capacity} volunteers registered
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Requirements */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Coordinator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {event.contactName.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{event.contactName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{event.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{event.contactPhone}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.requirements}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search volunteers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Volunteers Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Volunteer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVolunteers.map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {volunteer.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">{volunteer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>{volunteer.email}</div>
                          <div>{volunteer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {volunteer.registeredAt}
                      </TableCell>
                      <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Confirm
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <X className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
