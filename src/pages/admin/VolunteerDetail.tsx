import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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
  ArrowLeft,
  Calendar,
  MapPin,
  Edit,
  Mail,
  Phone,
  User,
  Clock,
  Award,
  Download,
  FileText,
  MoreHorizontal,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Mock data
const volunteer = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.j@email.com",
  phone: "(555) 123-4567",
  address: "456 Oak Street, New York, NY 10002",
  dateOfBirth: "March 15, 1990",
  status: "active",
  joinedDate: "January 2, 2026",
  eventsAttended: 12,
  hoursVolunteered: 48,
  hoursApproved: 45,
  hoursPending: 3,
  skills: ["Event Coordination", "First Aid", "Public Speaking"],
  availability: "Weekends, Monday and Wednesday evenings",
  experience: "5 years of community organizing experience. Previously served as volunteer coordinator at local food bank.",
  motivation: "Passionate about making a positive impact in the community and helping those in need.",
  emergencyContact: {
    name: "Michael Johnson",
    phone: "(555) 987-6543",
    relationship: "Spouse",
  },
  onboarding: {
    waiverSigned: true,
    waiverDate: "Jan 2, 2026",
    trainingCompleted: true,
    trainingName: "Volunteer Orientation",
    backgroundCheck: "cleared",
    backgroundCheckDate: "Jan 3, 2026",
  },
};

const shiftHistory = [
  { id: 1, event: "Community Cleanup Day", date: "Jan 20, 2026", shift: "Morning Shift", checkIn: "9:00 AM", checkOut: "1:00 PM", hours: 4, status: "approved", role: "Team Lead" },
  { id: 2, event: "Youth Mentorship Workshop", date: "Jan 18, 2026", shift: "Full Day", checkIn: "10:00 AM", checkOut: "3:30 PM", hours: 5.5, status: "approved", role: "Volunteer" },
  { id: 3, event: "Food Drive Collection", date: "Jan 15, 2026", shift: "Afternoon Shift", checkIn: "1:00 PM", checkOut: "5:00 PM", hours: 4, status: "pending", role: "Coordinator" },
  { id: 4, event: "Senior Care Visit", date: "Jan 10, 2026", shift: "Morning Shift", checkIn: "9:30 AM", checkOut: "12:00 PM", hours: 2.5, status: "approved", role: "Volunteer" },
  { id: 5, event: "Community Garden Project", date: "Jan 5, 2026", shift: "Full Day", checkIn: "8:00 AM", checkOut: "4:00 PM", hours: 8, status: "approved", role: "Team Lead" },
];

const documents = [
  { id: 1, name: "Volunteer Waiver", type: "PDF", uploadedDate: "Jan 2, 2026", size: "245 KB" },
  { id: 2, name: "Background Check Authorization", type: "PDF", uploadedDate: "Jan 2, 2026", size: "128 KB" },
  { id: 3, name: "Training Certificate", type: "PDF", uploadedDate: "Jan 5, 2026", size: "312 KB" },
];

const notes = [
  { id: 1, date: "Jan 20, 2026", author: "Admin", content: "Excellent performance as team lead during cleanup event. Recommended for leadership roles." },
  { id: 2, date: "Jan 10, 2026", author: "Coordinator", content: "Very reliable and always arrives early. Great with seniors." },
  { id: 3, date: "Jan 2, 2026", author: "System", content: "Volunteer onboarding completed successfully." },
];

const upcomingEvents = [
  { id: 1, title: "Winter Shelter Support", date: "Jan 25, 2026", time: "6:00 PM", status: "confirmed", role: "Team Lead" },
  { id: 2, title: "Education Workshop", date: "Feb 5, 2026", time: "10:00 AM", status: "pending", role: "Volunteer" },
];

export default function VolunteerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newNote, setNewNote] = useState("");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      active: "default",
      pending: "secondary",
      inactive: "outline",
      suspended: "destructive",
      confirmed: "default",
      approved: "default",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log("Add note:", newNote);
      setNewNote("");
    }
  };

  const handleDownloadCertificate = () => {
    console.log("Download certificate");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/volunteers")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-medium text-primary">
                {volunteer.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">{volunteer.name}</h1>
                {getStatusBadge(volunteer.status)}
              </div>
              <p className="text-muted-foreground">Member since {volunteer.joinedDate}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadCertificate}>
            <Download className="h-4 w-4 mr-2" />
            Certificate
          </Button>
          <Button onClick={() => navigate(`/admin/volunteers/${id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{volunteer.eventsAttended}</p>
                <p className="text-sm text-muted-foreground">Events Attended</p>
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
                <p className="text-2xl font-bold text-foreground">{volunteer.hoursVolunteered}</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{volunteer.hoursApproved}</p>
                <p className="text-sm text-muted-foreground">Approved Hours</p>
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
                <p className="text-2xl font-bold text-foreground">{volunteer.skills.length}</p>
                <p className="text-sm text-muted-foreground">Skills</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
          <TabsTrigger value="hours">Hours</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{volunteer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{volunteer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{volunteer.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Born: {volunteer.dateOfBirth}</span>
                </div>
              </CardContent>
            </Card>

            {/* Onboarding Status */}
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Waiver Signed</span>
                  <div className="flex items-center gap-2">
                    {volunteer.onboarding.waiverSigned ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-xs text-muted-foreground">{volunteer.onboarding.waiverDate}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Training Completed</span>
                  <div className="flex items-center gap-2">
                    {volunteer.onboarding.trainingCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-xs text-muted-foreground">{volunteer.onboarding.trainingName}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Background Check</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={volunteer.onboarding.backgroundCheck === "cleared" ? "default" : "secondary"}>
                      {volunteer.onboarding.backgroundCheck}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{volunteer.onboarding.backgroundCheckDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {volunteer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-foreground">{volunteer.emergencyContact.name}</p>
                  <p className="text-sm text-muted-foreground">{volunteer.emergencyContact.relationship}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{volunteer.emergencyContact.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Registered for upcoming volunteer opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{event.role}</Badge>
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shifts">
          <Card>
            <CardHeader>
              <CardTitle>Shift History</CardTitle>
              <CardDescription>All volunteer shifts and check-ins</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shiftHistory.map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{shift.event}</p>
                          <Badge variant="outline" className="mt-1">{shift.role}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{shift.date}</TableCell>
                      <TableCell className="text-muted-foreground">{shift.shift}</TableCell>
                      <TableCell className="text-muted-foreground">{shift.checkIn}</TableCell>
                      <TableCell className="text-muted-foreground">{shift.checkOut}</TableCell>
                      <TableCell className="font-semibold text-foreground">{shift.hours}</TableCell>
                      <TableCell>{getStatusBadge(shift.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">{volunteer.hoursVolunteered}</p>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-500">{volunteer.hoursApproved}</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-500">{volunteer.hoursPending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Hours Log</CardTitle>
                    <CardDescription>Detailed breakdown of volunteer hours</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shiftHistory.map((shift) => (
                      <TableRow key={shift.id}>
                        <TableCell className="font-medium text-foreground">{shift.event}</TableCell>
                        <TableCell className="text-muted-foreground">{shift.date}</TableCell>
                        <TableCell className="font-semibold text-foreground">{shift.hours}</TableCell>
                        <TableCell>{getStatusBadge(shift.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              {shift.status === "pending" && (
                                <>
                                  <DropdownMenuItem>Approve</DropdownMenuItem>
                                  <DropdownMenuItem>Reject</DropdownMenuItem>
                                </>
                              )}
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
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Uploaded documents and certifications</CardDescription>
                </div>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium text-foreground">{doc.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{doc.uploadedDate}</TableCell>
                      <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Internal notes about this volunteer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddNote}>Add Note</Button>
              </div>
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
