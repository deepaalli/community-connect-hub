import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Mail, Phone, Briefcase, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const availableSkills = [
  "Event Coordination",
  "First Aid",
  "Food Service",
  "Transportation",
  "Youth Mentorship",
  "Teaching",
  "Construction",
  "Landscaping",
  "Healthcare",
  "Administration",
  "Photography",
  "Social Media",
  "Fundraising",
  "Public Speaking",
  "Translation",
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
    skills: [] as string[],
    availability: "",
    experience: "",
    motivation: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save volunteer data
    console.log("Saving volunteer:", formData);
    navigate("/admin/volunteers");
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      handleChange("skills", [...formData.skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    handleChange("skills", formData.skills.filter((s) => s !== skill));
  };

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
        <div className="grid gap-6 md:grid-cols-2">
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
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                  />
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
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
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Skills & Availability
              </CardTitle>
              <CardDescription>Volunteer capabilities and schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={addSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add a skill..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSkills
                      .filter((skill) => !formData.skills.includes(skill))
                      .map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Textarea
                  id="availability"
                  placeholder="e.g., Weekends, Monday evenings, flexible schedule..."
                  rows={2}
                  value={formData.availability}
                  onChange={(e) => handleChange("availability", e.target.value)}
                />
              </div>
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
                  rows={2}
                  value={formData.motivation}
                  onChange={(e) => handleChange("motivation", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Notes for organizers only..."
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
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
