import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Filter,
  Calendar,
} from "lucide-react";

const pendingHours = [
  {
    id: 1,
    volunteer: "Sarah Johnson",
    volunteerEmail: "sarah.j@email.com",
    event: "Community Cleanup Day",
    shift: "Morning Shift",
    date: "Jan 20, 2026",
    checkIn: "9:00 AM",
    checkOut: "1:15 PM",
    calculatedHours: 4.25,
    notes: "",
    status: "pending",
  },
  {
    id: 2,
    volunteer: "Michael Chen",
    volunteerEmail: "m.chen@email.com",
    event: "Community Cleanup Day",
    shift: "Morning Shift",
    date: "Jan 20, 2026",
    checkIn: "9:05 AM",
    checkOut: "1:00 PM",
    calculatedHours: 3.92,
    notes: "Left 15 mins early - approved by coordinator",
    status: "pending",
  },
  {
    id: 3,
    volunteer: "Emily Davis",
    volunteerEmail: "emily.d@email.com",
    event: "Youth Mentorship Workshop",
    shift: "Full Day",
    date: "Jan 18, 2026",
    checkIn: "10:00 AM",
    checkOut: "3:30 PM",
    calculatedHours: 5.5,
    notes: "",
    status: "pending",
  },
  {
    id: 4,
    volunteer: "James Wilson",
    volunteerEmail: "j.wilson@email.com",
    event: "Food Drive Collection",
    shift: "Afternoon Shift",
    date: "Jan 15, 2026",
    checkIn: "1:00 PM",
    checkOut: "5:45 PM",
    calculatedHours: 4.75,
    notes: "Extended shift to help with cleanup",
    status: "pending",
  },
  {
    id: 5,
    volunteer: "Lisa Martinez",
    volunteerEmail: "lisa.m@email.com",
    event: "Senior Care Visit",
    shift: "Morning Shift",
    date: "Jan 14, 2026",
    checkIn: "9:30 AM",
    checkOut: "12:00 PM",
    calculatedHours: 2.5,
    notes: "",
    status: "pending",
  },
];

const events = [
  { id: "all", name: "All Events" },
  { id: "1", name: "Community Cleanup Day" },
  { id: "2", name: "Youth Mentorship Workshop" },
  { id: "3", name: "Food Drive Collection" },
  { id: "4", name: "Senior Care Visit" },
];

export default function HoursApproval() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [eventFilter, setEventFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredHours = pendingHours.filter((item) => {
    if (eventFilter !== "all" && !item.event.includes(events.find(e => e.id === eventFilter)?.name || "")) {
      return false;
    }
    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredHours.map((h) => h.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    }
  };

  const handleApprove = (id: number) => {
    console.log("Approve hours:", id);
  };

  const handleReject = (id: number) => {
    console.log("Reject hours:", id);
  };

  const handleBulkApprove = () => {
    console.log("Bulk approve:", selectedItems);
    setSelectedItems([]);
  };

  const handleBulkReject = () => {
    console.log("Bulk reject:", selectedItems);
    setSelectedItems([]);
  };

  const totalPendingHours = filteredHours.reduce((sum, h) => sum + h.calculatedHours, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hours Approval</h1>
          <p className="text-muted-foreground">Review and approve volunteer hours</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredHours.length}</p>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalPendingHours.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-muted">
                <Filter className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{new Set(filteredHours.map(h => h.event)).size}</p>
                <p className="text-sm text-muted-foreground">Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full sm:w-auto"
              />
            </div>
            {selectedItems.length > 0 && (
              <div className="flex gap-2">
                <Button onClick={handleBulkApprove}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Selected ({selectedItems.length})
                </Button>
                <Button variant="outline" onClick={handleBulkReject}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Selected
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hours Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Hours</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredHours.length && filteredHours.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Volunteer</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHours.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{item.volunteer}</p>
                      <p className="text-xs text-muted-foreground">{item.volunteerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{item.event}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.shift}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.checkIn}</TableCell>
                  <TableCell className="text-muted-foreground">{item.checkOut}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-foreground">{item.calculatedHours.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground max-w-[150px] truncate block">
                      {item.notes || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={() => handleApprove(item.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleApprove(item.id)}>
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReject(item.id)}>
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Hours</DropdownMenuItem>
                          <DropdownMenuItem>View Volunteer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
