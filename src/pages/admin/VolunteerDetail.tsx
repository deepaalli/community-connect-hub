import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  skills: ["Event Coordination", "First Aid", "Public Speaking"],
  availability: "Weekends, Monday and Wednesday evenings",
  experience: "5 years of community organizing experience. Previously served as volunteer coordinator at local food bank.",
  motivation: "Passionate about making a positive impact in the community and helping those in need.",
  emergencyContact: {
    name: "Michael Johnson",
    phone: "(555) 987-6543",
    relationship: "Spouse",
  },
};

const eventHistory = [
  { id: 1, title: "Community Cleanup Day", date: "Jan 10, 2026", hours: 5, role: "Team Lead" },
  { id: 2, title: "Youth Mentorship Workshop", date: "Dec 20, 2025", hours: 3, role: "Volunteer" },
  { id: 3, title: "Food Drive Collection", date: "Dec 5, 2025", hours: 6, role: "Coordinator" },
  { id: 4, title: "Senior Care Visit", date: "Nov 25, 2025", hours: 4, role: "Volunteer" },
  { id: 5, title: "Community Garden Project", date: "Nov 15, 2025", hours: 8, role: "Team Lead" },
];

const upcomingEvents = [
  { id: 1, title: "Winter Shelter Support", date: "Jan 20, 2026", time: "6:00 PM", status: "confirmed" },
  { id: 2, title: "Education Workshop", date: "Feb 5, 2026", time: "10:00 AM", status: "pending" },
];

export default function VolunteerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      active: "default",
      pending: "secondary",
      inactive: "outline",
      confirmed: "default",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
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
        <Button onClick={() => navigate(`/admin/volunteers/${id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
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
                <p className="text-sm text-muted-foreground">Hours Volunteered</p>
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

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="events">Event History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
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

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{volunteer.availability}</p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Experience & Motivation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Previous Experience</h4>
                  <p className="text-muted-foreground">{volunteer.experience}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Motivation</h4>
                  <p className="text-muted-foreground">{volunteer.motivation}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event History</CardTitle>
              <CardDescription>Past events this volunteer has participated in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventHistory.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{event.role}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{event.hours} hours</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events this volunteer is registered for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                    </div>
                    {getStatusBadge(event.status)}
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
