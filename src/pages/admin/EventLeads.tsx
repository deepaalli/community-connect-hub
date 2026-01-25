import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Filter,
  User,
  Phone,
  Mail,
  Calendar,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  Utensils,
  Truck,
  UserCheck,
} from "lucide-react";

// Mock data
const eventLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    role: "Food Lead",
    event: "Community Cleanup Day",
    eventDate: "Jan 15, 2026",
    managedItems: [
      { name: "Food Packets", status: "Delivered", qty: 100 },
      { name: "Snack Boxes", status: "Planned", qty: 50 },
    ],
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "(555) 234-5678",
    role: "Logistics Lead",
    event: "Community Cleanup Day",
    eventDate: "Jan 15, 2026",
    managedItems: [
      { name: "Folding Tables", status: "Ordered", qty: 10 },
      { name: "Tents", status: "Delivered", qty: 4 },
    ],
    status: "active",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@email.com",
    phone: "(555) 345-6789",
    role: "Check-in Lead",
    event: "Community Cleanup Day",
    eventDate: "Jan 15, 2026",
    managedItems: [
      { name: "Wristbands", status: "Delivered", qty: 500 },
    ],
    status: "active",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "j.wilson@email.com",
    phone: "(555) 456-7890",
    role: "Food Lead",
    event: "Holiday Food Drive",
    eventDate: "Dec 20, 2025",
    managedItems: [
      { name: "Food Packets", status: "Used", qty: 200 },
      { name: "Water Bottles", status: "Used", qty: 300 },
    ],
    status: "completed",
  },
];

const roles = ["All Roles", "Food Lead", "Logistics Lead", "Check-in Lead", "Safety Lead", "Volunteer Coordinator"];
const events = ["All Events", "Community Cleanup Day", "Holiday Food Drive", "Fall Festival"];

export default function EventLeads() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [eventFilter, setEventFilter] = useState("All Events");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredLeads = eventLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || lead.role === roleFilter;
    const matchesEvent = eventFilter === "All Events" || lead.event === eventFilter;
    return matchesSearch && matchesRole && matchesEvent;
  });

  const getRoleIcon = (role: string) => {
    if (role.includes("Food")) return <Utensils className="h-4 w-4" />;
    if (role.includes("Logistics")) return <Truck className="h-4 w-4" />;
    if (role.includes("Check-in")) return <UserCheck className="h-4 w-4" />;
    return <User className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" />Delivered</Badge>;
      case "Ordered":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Ordered</Badge>;
      case "Planned":
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Planned</Badge>;
      case "Used":
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" />Used</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Leads & Ownership</h1>
          <p className="text-muted-foreground">Assign and manage event responsibilities</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Assign Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Assign Event Lead</DialogTitle>
              <DialogDescription>
                Assign a volunteer as a lead for an event with specific responsibilities.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="volunteer">Volunteer *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select volunteer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Sarah Johnson</SelectItem>
                    <SelectItem value="2">Michael Chen</SelectItem>
                    <SelectItem value="3">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event">Event *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Community Cleanup Day</SelectItem>
                    <SelectItem value="2">Holiday Food Drive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food Lead</SelectItem>
                    <SelectItem value="logistics">Logistics Lead</SelectItem>
                    <SelectItem value="checkin">Check-in Lead</SelectItem>
                    <SelectItem value="safety">Safety Lead</SelectItem>
                    <SelectItem value="coordinator">Volunteer Coordinator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Managed Items</Label>
                <p className="text-xs text-muted-foreground">Select items this lead will be responsible for</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select items (multi-select)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Food Packets</SelectItem>
                    <SelectItem value="2">Water Bottles</SelectItem>
                    <SelectItem value="3">Folding Tables</SelectItem>
                    <SelectItem value="4">Tents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Assign Lead</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventLeads.length}</div>
            <p className="text-xs text-muted-foreground">Assigned across events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventLeads.filter(l => l.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Managed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventLeads.reduce((sum, l) => sum + l.managedItems.length, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Delivery</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {eventLeads.reduce((sum, l) => sum + l.managedItems.filter(i => i.status === "Planned" || i.status === "Ordered").length, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Event" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event} value={event}>{event}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lead Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {lead.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-base">{lead.name}</CardTitle>
                    <Badge variant="secondary" className="gap-1 mt-1">
                      {getRoleIcon(lead.role)}
                      {lead.role}
                    </Badge>
                  </div>
                </div>
                <Badge variant={lead.status === "active" ? "default" : "outline"}>
                  {lead.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Event Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{lead.event}</span>
                <span className="text-xs">({lead.eventDate})</span>
              </div>

              {/* Contact */}
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{lead.phone}</span>
                </div>
              </div>

              {/* Managed Items */}
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">MANAGED ITEMS</p>
                <div className="space-y-2">
                  {lead.managedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="h-3 w-3 text-muted-foreground" />
                        <span className="text-foreground">{item.name}</span>
                        <span className="text-muted-foreground">×{item.qty}</span>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
