import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    address: "",
    capacity: "",
    volunteerSlots: "",
    category: "",
    status: "draft",
    requiresApproval: false,
    isPublic: true,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    requirements: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save event data
    console.log("Saving event:", formData);
    navigate("/admin/events");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/events")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Edit Event" : "Create Event"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update event details" : "Set up a new volunteer event"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Event name and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Community Cleanup Day"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the event, its purpose, and what volunteers will be doing..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                    <SelectItem value="food">Food & Hunger</SelectItem>
                    <SelectItem value="youth">Youth Programs</SelectItem>
                    <SelectItem value="seniors">Senior Care</SelectItem>
                    <SelectItem value="animals">Animal Welfare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Date & Time
              </CardTitle>
              <CardDescription>When the event takes place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleChange("startTime", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleChange("endTime", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
              <CardDescription>Where the event takes place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Venue Name *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Central Park"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter the complete address..."
                  rows={2}
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Capacity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Capacity & Requirements
              </CardTitle>
              <CardDescription>Volunteer slots and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Max Attendees</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="100"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volunteerSlots">Volunteer Slots</Label>
                  <Input
                    id="volunteerSlots"
                    type="number"
                    placeholder="20"
                    value={formData.volunteerSlots}
                    onChange={(e) => handleChange("volunteerSlots", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Volunteer Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Any specific skills, certifications, or equipment needed..."
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => handleChange("requirements", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Event coordinator details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  placeholder="John Smith"
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Event Settings</CardTitle>
              <CardDescription>Visibility and registration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Event</Label>
                  <p className="text-sm text-muted-foreground">
                    Visible to all visitors on the website
                  </p>
                </div>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => handleChange("isPublic", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Manually approve volunteer registrations
                  </p>
                </div>
                <Switch
                  checked={formData.requiresApproval}
                  onCheckedChange={(checked) => handleChange("requiresApproval", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Notes for organizers only..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/events")}>
            Cancel
          </Button>
          <Button type="submit" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">
            {isEditing ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </form>
    </div>
  );
}
