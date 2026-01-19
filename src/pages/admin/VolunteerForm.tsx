import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, User, Mail, Phone, Briefcase, X, Upload, Shield, 
  Calendar, FileText, Clock, Bell
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AvailabilitySlot {
  day: string;
  timeRange: string;
}

const availableSkills = [
  "Event Coordination", "First Aid", "Food Service", "Transportation",
  "Youth Mentorship", "Teaching", "Construction", "Landscaping",
  "Healthcare", "Administration", "Photography", "Social Media",
  "Fundraising", "Public Speaking", "Translation", "IT Support",
  "Counseling", "Legal", "Accounting", "Marketing"
];

const events = [
  { id: "1", name: "Community Cleanup Day", roles: ["Team Lead", "Cleanup Crew", "Registration"] },
  { id: "2", name: "Youth Mentorship Workshop", roles: ["Mentor", "Assistant", "Greeter"] },
  { id: "3", name: "Food Drive Collection", roles: ["Sorter", "Driver", "Registration"] },
];

export default function VolunteerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    status: "pending",
    suspendedReason: "",
    skills: [] as string[],
    availabilityNotes: "",
    experience: "",
    motivation: "",
    notes: "",
    waiverSigned: false,
    waiverDate: "",
    trainingCompleted: false,
    trainingName: "",
    backgroundCheckCompleted: false,
    backgroundCheckDate: "",
    backgroundCheckStatus: "pending",
    preferredCommunication: "email",
    consentContact: false,
    assignedEvent: "",
    assignedRole: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phone && !/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Saving volunteer:", { ...formData, availability, documents });
    navigate("/admin/volunteers");
  };

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addSkill = () => {
    if (skillInput && !formData.skills.includes(skillInput)) {
      handleChange("skills", [...formData.skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    handleChange("skills", formData.skills.filter((s) => s !== skill));
  };

  const addAvailability = (day: string, timeRange: string) => {
    if (!availability.some((a) => a.day === day && a.timeRange === timeRange)) {
      setAvailability([...availability, { day, timeRange }]);
    }
  };

  const removeAvailability = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setDocuments([...documents, ...Array.from(files)]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const selectedEvent = events.find((e) => e.id === formData.assignedEvent);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/volunteers")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Edit Volunteer" : "Add Volunteer"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update volunteer information" : "Register a new volunteer"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Basic volunteer details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Status Workflow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Status Workflow
              </CardTitle>
              <CardDescription>Volunteer approval status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(v) => handleChange("status", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === "suspended" && (
                <div className="space-y-2">
                  <Label htmlFor="suspendedReason">Reason for Suspension</Label>
                  <Textarea
                    id="suspendedReason"
                    placeholder="Explain why this volunteer is suspended..."
                    rows={3}
                    value={formData.suspendedReason}
                    onChange={(e) => handleChange("suspendedReason", e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>How to reach the volunteer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                <p className="text-xs text-muted-foreground">Optional, but useful for urgent communication</p>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>Volunteer's location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  placeholder="10001"
                  value={formData.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Onboarding Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Onboarding Checklist
              </CardTitle>
              <CardDescription>Track volunteer onboarding progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  id="waiverSigned"
                  checked={formData.waiverSigned}
                  onCheckedChange={(checked) => handleChange("waiverSigned", checked as boolean)}
                />
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="waiverSigned">Waiver Signed</Label>
                  {formData.waiverSigned && (
                    <Input
                      type="date"
                      placeholder="Date signed"
                      value={formData.waiverDate}
                      onChange={(e) => handleChange("waiverDate", e.target.value)}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Checkbox
                  id="trainingCompleted"
                  checked={formData.trainingCompleted}
                  onCheckedChange={(checked) => handleChange("trainingCompleted", checked as boolean)}
                />
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="trainingCompleted">Training Completed</Label>
                  {formData.trainingCompleted && (
                    <Input
                      placeholder="Training name"
                      value={formData.trainingName}
                      onChange={(e) => handleChange("trainingName", e.target.value)}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Checkbox
                  id="backgroundCheckCompleted"
                  checked={formData.backgroundCheckCompleted}
                  onCheckedChange={(checked) => handleChange("backgroundCheckCompleted", checked as boolean)}
                />
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="backgroundCheckCompleted">Background Check</Label>
                  {formData.backgroundCheckCompleted && (
                    <>
                      <Input
                        type="date"
                        placeholder="Date completed"
                        value={formData.backgroundCheckDate}
                        onChange={(e) => handleChange("backgroundCheckDate", e.target.value)}
                      />
                      <Select
                        value={formData.backgroundCheckStatus}
                        onValueChange={(v) => handleChange("backgroundCheckStatus", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="cleared">Cleared</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contact
              </CardTitle>
              <CardDescription>In case of emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  placeholder="Jane Smith"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleChange("emergencyContactName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  placeholder="(555) 987-6543"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleChange("emergencyContactPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills & Availability */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Skills & Availability
              </CardTitle>
              <CardDescription>Volunteer capabilities and schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type skill and press Enter"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    list="skills-list"
                  />
                  <datalist id="skills-list">
                    {availableSkills.filter((s) => !formData.skills.includes(s)).map((skill) => (
                      <option key={skill} value={skill} />
                    ))}
                  </datalist>
                  <Button type="button" variant="outline" onClick={addSkill}>Add</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {availability.map((slot, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {slot.day} - {slot.timeRange}
                      <button type="button" onClick={() => removeAvailability(index)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select onValueChange={(day) => addAvailability(day, "Morning (8am-12pm)")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add weekday availability" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(day) => addAvailability(day, "All Day")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add weekend availability" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="availabilityNotes">Additional Notes</Label>
                  <Textarea
                    id="availabilityNotes"
                    placeholder="e.g., Available evenings only after 6pm..."
                    rows={2}
                    value={formData.availabilityNotes}
                    onChange={(e) => handleChange("availabilityNotes", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Previous Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Describe any relevant volunteer or professional experience..."
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motivation">Motivation</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Why does this person want to volunteer?"
                    rows={3}
                    value={formData.motivation}
                    onChange={(e) => handleChange("motivation", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consent & Communication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Consent & Communication
              </CardTitle>
              <CardDescription>Communication preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Communication</Label>
                <Select
                  value={formData.preferredCommunication}
                  onValueChange={(v) => handleChange("preferredCommunication", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-4">
                <Checkbox
                  id="consentContact"
                  checked={formData.consentContact}
                  onCheckedChange={(checked) => handleChange("consentContact", checked as boolean)}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="consentContact">Communication Consent</Label>
                  <p className="text-sm text-muted-foreground">
                    I agree to be contacted about volunteer opportunities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Documents
              </CardTitle>
              <CardDescription>Upload waiver, ID, or other documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <label className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload documents</p>
                  <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    onChange={handleDocumentUpload}
                  />
                </label>
              </div>
              {documents.length > 0 && (
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{doc.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Assign */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Quick Assign (Optional)
              </CardTitle>
              <CardDescription>Assign this volunteer to an event immediately</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event</Label>
                  <Select
                    value={formData.assignedEvent}
                    onValueChange={(v) => handleChange("assignedEvent", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.assignedEvent && selectedEvent && (
                  <div className="space-y-2">
                    <Label>Role / Shift</Label>
                    <Select
                      value={formData.assignedRole}
                      onValueChange={(v) => handleChange("assignedRole", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {selectedEvent.roles.map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Internal Notes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
              <CardDescription>Notes visible only to staff</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="notes"
                placeholder="Notes for organizers only..."
                rows={3}
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/volunteers")}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Volunteer" : "Add Volunteer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
