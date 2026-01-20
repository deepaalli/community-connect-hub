import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Mail, Phone, MoreHorizontal, Users, Clock, Award, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const volunteers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    skills: ["Event Coordination", "First Aid"],
    eventsAttended: 12,
    totalHours: 48,
    lastVolunteered: "Jan 20, 2026",
    status: "active",
    joinedDate: "Jan 2, 2026",
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "(555) 234-5678",
    skills: ["Food Service", "Transportation"],
    eventsAttended: 8,
    totalHours: 32,
    lastVolunteered: "Jan 18, 2026",
    status: "active",
    joinedDate: "Dec 15, 2025",
    availability: "Weekdays",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@email.com",
    phone: "(555) 345-6789",
    skills: ["Youth Mentorship", "Teaching"],
    eventsAttended: 15,
    totalHours: 60,
    lastVolunteered: "Jan 15, 2026",
    status: "active",
    joinedDate: "Nov 20, 2025",
    availability: "Flexible",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "j.wilson@email.com",
    phone: "(555) 456-7890",
    skills: ["Construction", "Landscaping"],
    eventsAttended: 3,
    totalHours: 12,
    lastVolunteered: "Jan 10, 2026",
    status: "pending",
    joinedDate: "Jan 5, 2026",
    availability: "Weekends",
  },
  {
    id: 5,
    name: "Lisa Martinez",
    email: "lisa.m@email.com",
    phone: "(555) 567-8901",
    skills: ["Healthcare", "Administration"],
    eventsAttended: 0,
    totalHours: 0,
    lastVolunteered: null,
    status: "inactive",
    joinedDate: "Oct 10, 2025",
    availability: "Weekdays",
  },
];

const statusOptions = [
  { id: "all", name: "All Statuses" },
  { id: "active", name: "Active" },
  { id: "pending", name: "Pending" },
  { id: "inactive", name: "Inactive" },
  { id: "suspended", name: "Suspended" },
];

const availabilityOptions = [
  { id: "all", name: "All Availability" },
  { id: "weekdays", name: "Weekdays" },
  { id: "weekends", name: "Weekends" },
  { id: "flexible", name: "Flexible" },
];

export default function AdminVolunteers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("");

  const filteredVolunteers = volunteers.filter((volunteer) => {
    if (searchQuery && !volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !volunteer.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (statusFilter !== "all" && volunteer.status !== statusFilter) {
      return false;
    }
    if (availabilityFilter !== "all" && volunteer.availability.toLowerCase() !== availabilityFilter) {
      return false;
    }
    if (skillFilter && !volunteer.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()))) {
      return false;
    }
    return true;
  });

  const totalVolunteers = volunteers.length;
  const activeVolunteers = volunteers.filter(v => v.status === "active").length;
  const totalHours = volunteers.reduce((sum, v) => sum + v.totalHours, 0);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      active: "default",
      pending: "secondary",
      inactive: "outline",
      suspended: "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Volunteers</h1>
          <p className="text-muted-foreground">Manage your volunteer database</p>
        </div>
        <Button onClick={() => navigate("/admin/volunteers/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Volunteer
        </Button>
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
                <p className="text-2xl font-bold text-foreground">{totalVolunteers}</p>
                <p className="text-sm text-muted-foreground">Total Volunteers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeVolunteers}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalHours}</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {totalVolunteers > 0 ? Math.round(totalHours / activeVolunteers) : 0}
                </p>
                <p className="text-sm text-muted-foreground">Avg Hours/Volunteer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search volunteers by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Filter by skill..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full md:w-[150px]"
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
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {volunteer.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{volunteer.name}</p>
                        <p className="text-xs text-muted-foreground">Joined {volunteer.joinedDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{volunteer.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{volunteer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">{volunteer.eventsAttended}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/admin/volunteers/${volunteer.id}`)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/volunteers/${volunteer.id}/edit`)}>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign to Event</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
