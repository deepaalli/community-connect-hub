import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ArrowLeft, Calendar, MapPin, Users, Clock, Settings, Bell, Plus, Trash2, 
  Image, Link, Globe, Lock, Info, Upload
} from "lucide-react";
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

interface Role {
  id: string;
  name: string;
  shiftStart: string;
  shiftEnd: string;
  slotsNeeded: number;
  skills: string[];
  notes: string;
}

const categoryTags = [
  "Cleanup", "Food Drive", "Shelter Support", "Mentorship", "Healthcare",
  "Education", "Environment", "Seniors", "Youth", "Animals", "Community"
];

const waiverTemplates = [
  { id: "general", name: "General Volunteer Waiver" },
  { id: "minor", name: "Minor Participation Waiver" },
  { id: "physical", name: "Physical Activity Waiver" },
  { id: "photo", name: "Photo/Video Release" },
];

export default function EventForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    category: "",
    tags: [] as string[],
    description: "",
    coverImage: null as File | null,
    coverImagePreview: "",
    date: "",
    startTime: "",
    endTime: "",
    timezone: "America/New_York",
    registrationOpenDate: "",
    registrationOpenTime: "",
    registrationCloseDate: "",
    registrationCloseTime: "",
    locationType: "physical",
    venueName: "",
    address: "",
    virtualUrl: "",
    maxAttendees: "",
    volunteerSlots: "",
    minimumAge: "",
    requirements: "",
    waiverRequired: false,
    waiverTemplate: "",
    backgroundCheckRequired: false,
    isPublic: true,
    isInviteOnly: false,
    requiresApproval: false,
    waitlistEnabled: false,
    maxWaitlistSize: "",
    internalNotes: "",
    reminder24h: true,
    reminder2h: true,
    postEventThankYou: true,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: "",
    shiftStart: "",
    shiftEnd: "",
    slotsNeeded: 1,
    skills: [],
    notes: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = "Event title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Event date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = "End time must be after start time";
    }
    if (!formData.volunteerSlots) newErrors.volunteerSlots = "Volunteer slots are required";
    if ((formData.locationType === "physical" || formData.locationType === "hybrid") && !formData.venueName) {
      newErrors.venueName = "Venue name is required";
    }
    if ((formData.locationType === "physical" || formData.locationType === "hybrid") && !formData.address) {
      newErrors.address = "Address is required";
    }
    if ((formData.locationType === "virtual" || formData.locationType === "hybrid") && !formData.virtualUrl) {
      newErrors.virtualUrl = "Virtual URL is required";
    }

    if (!isDraft && Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Saving event:", { ...formData, roles, status: isDraft ? "draft" : "published" });
    navigate("/admin/events");
  };

  const handleChange = (field: string, value: string | boolean | string[] | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("coverImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("coverImagePreview", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      handleChange("tags", [...formData.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    handleChange("tags", formData.tags.filter((t) => t !== tag));
  };

  const addSkillToRole = () => {
    if (skillInput && !newRole.skills?.includes(skillInput)) {
      setNewRole((prev) => ({ ...prev, skills: [...(prev.skills || []), skillInput] }));
      setSkillInput("");
    }
  };

  const removeSkillFromRole = (skill: string) => {
    setNewRole((prev) => ({ ...prev, skills: prev.skills?.filter((s) => s !== skill) }));
  };

  const addRole = () => {
    if (newRole.name && newRole.shiftStart && newRole.shiftEnd) {
      setRoles([...roles, { ...newRole, id: Date.now().toString() } as Role]);
      setNewRole({ name: "", shiftStart: "", shiftEnd: "", slotsNeeded: 1, skills: [], notes: "" });
    }
  };

  const removeRole = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  return (
    <TooltipProvider>
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

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
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
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                  <p className="text-xs text-muted-foreground">Choose a clear, descriptive title</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select value={formData.eventType} onValueChange={(v) => handleChange("eventType", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="volunteer">Volunteer Event</SelectItem>
                      <SelectItem value="fundraiser">Fundraiser</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(v) => handleChange("category", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="community">Community Service</SelectItem>
                      <SelectItem value="food">Food & Hunger</SelectItem>
                      <SelectItem value="youth">Youth Programs</SelectItem>
                      <SelectItem value="seniors">Senior Care</SelectItem>
                      <SelectItem value="animals">Animal Welfare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">×</button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Select onValueChange={addTag}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Add tags..." />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {categoryTags.filter((t) => !formData.tags.includes(t)).map((tag) => (
                          <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the event, its purpose, and what volunteers will be doing..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                  <p className="text-xs text-muted-foreground">Supports rich text formatting</p>
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {formData.coverImagePreview ? (
                      <div className="relative">
                        <img src={formData.coverImagePreview} alt="Preview" className="max-h-40 mx-auto rounded" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => { handleChange("coverImage", null); handleChange("coverImagePreview", ""); }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    )}
                  </div>
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
                    className={errors.date ? "border-destructive" : ""}
                  />
                  {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleChange("startTime", e.target.value)}
                      className={errors.startTime ? "border-destructive" : ""}
                    />
                    {errors.startTime && <p className="text-sm text-destructive">{errors.startTime}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleChange("endTime", e.target.value)}
                      className={errors.endTime ? "border-destructive" : ""}
                    />
                    {errors.endTime && <p className="text-sm text-destructive">{errors.endTime}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.timezone} onValueChange={(v) => handleChange("timezone", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Defaults from organization settings</p>
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-medium mb-3">Registration Window</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registrationOpenDate">Opens</Label>
                      <Input
                        id="registrationOpenDate"
                        type="date"
                        value={formData.registrationOpenDate}
                        onChange={(e) => handleChange("registrationOpenDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationOpenTime">Time</Label>
                      <Input
                        id="registrationOpenTime"
                        type="time"
                        value={formData.registrationOpenTime}
                        onChange={(e) => handleChange("registrationOpenTime", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="registrationCloseDate">Closes</Label>
                      <Input
                        id="registrationCloseDate"
                        type="date"
                        value={formData.registrationCloseDate}
                        onChange={(e) => handleChange("registrationCloseDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationCloseTime">Time</Label>
                      <Input
                        id="registrationCloseTime"
                        type="time"
                        value={formData.registrationCloseTime}
                        onChange={(e) => handleChange("registrationCloseTime", e.target.value)}
                      />
                    </div>
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
                  <Label>Location Type</Label>
                  <Select value={formData.locationType} onValueChange={(v) => handleChange("locationType", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="physical">Physical</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.locationType === "physical" || formData.locationType === "hybrid") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="venueName">Venue Name *</Label>
                      <Input
                        id="venueName"
                        placeholder="e.g., Central Park"
                        value={formData.venueName}
                        onChange={(e) => handleChange("venueName", e.target.value)}
                        className={errors.venueName ? "border-destructive" : ""}
                      />
                      {errors.venueName && <p className="text-sm text-destructive">{errors.venueName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter the complete address..."
                        rows={2}
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className={errors.address ? "border-destructive" : ""}
                      />
                      {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                    </div>
                    <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Map preview placeholder</p>
                    </div>
                  </>
                )}

                {(formData.locationType === "virtual" || formData.locationType === "hybrid") && (
                  <div className="space-y-2">
                    <Label htmlFor="virtualUrl">Virtual URL *</Label>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="virtualUrl"
                        placeholder="https://zoom.us/j/..."
                        value={formData.virtualUrl}
                        onChange={(e) => handleChange("virtualUrl", e.target.value)}
                        className={`pl-10 ${errors.virtualUrl ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.virtualUrl && <p className="text-sm text-destructive">{errors.virtualUrl}</p>}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Capacity & Requirements */}
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
                    <Label htmlFor="maxAttendees">Max Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      placeholder="Optional"
                      value={formData.maxAttendees}
                      onChange={(e) => handleChange("maxAttendees", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volunteerSlots">Volunteer Slots *</Label>
                    <Input
                      id="volunteerSlots"
                      type="number"
                      placeholder="20"
                      value={formData.volunteerSlots}
                      onChange={(e) => handleChange("volunteerSlots", e.target.value)}
                      className={errors.volunteerSlots ? "border-destructive" : ""}
                    />
                    {errors.volunteerSlots && <p className="text-sm text-destructive">{errors.volunteerSlots}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumAge">Minimum Age</Label>
                  <Input
                    id="minimumAge"
                    type="number"
                    placeholder="18"
                    value={formData.minimumAge}
                    onChange={(e) => handleChange("minimumAge", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Leave blank for no age restriction</p>
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

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Waiver Required</Label>
                    <p className="text-sm text-muted-foreground">Volunteers must sign a waiver</p>
                  </div>
                  <Switch
                    checked={formData.waiverRequired}
                    onCheckedChange={(checked) => handleChange("waiverRequired", checked)}
                  />
                </div>

                {formData.waiverRequired && (
                  <div className="space-y-2">
                    <Label>Waiver Template</Label>
                    <Select value={formData.waiverTemplate} onValueChange={(v) => handleChange("waiverTemplate", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select waiver template" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {waiverTemplates.map((w) => (
                          <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="space-y-0.5">
                      <Label>Background Check Required</Label>
                      <p className="text-sm text-muted-foreground">Require volunteers to pass background check</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Optional for MVP, can integrate later</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Switch
                    checked={formData.backgroundCheckRequired}
                    onCheckedChange={(checked) => handleChange("backgroundCheckRequired", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Volunteer Shifts & Roles */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Volunteer Shifts & Roles
                </CardTitle>
                <CardDescription>Define specific roles and shifts for this event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Role Name</Label>
                    <Input
                      placeholder="e.g., Food Server"
                      value={newRole.name || ""}
                      onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Shift Start</Label>
                    <Input
                      type="time"
                      value={newRole.shiftStart || ""}
                      onChange={(e) => setNewRole((prev) => ({ ...prev, shiftStart: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Shift End</Label>
                    <Input
                      type="time"
                      value={newRole.shiftEnd || ""}
                      onChange={(e) => setNewRole((prev) => ({ ...prev, shiftEnd: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slots</Label>
                    <Input
                      type="number"
                      min={1}
                      value={newRole.slotsNeeded || 1}
                      onChange={(e) => setNewRole((prev) => ({ ...prev, slotsNeeded: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <Button type="button" onClick={addRole} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Role
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Skills Required (for new role)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newRole.skills?.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <button type="button" onClick={() => removeSkillFromRole(skill)} className="ml-1 hover:text-destructive">×</button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkillToRole())}
                    />
                    <Button type="button" variant="outline" onClick={addSkillToRole}>Add</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input
                    placeholder="Additional notes for this role"
                    value={newRole.notes || ""}
                    onChange={(e) => setNewRole((prev) => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                {roles.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role</TableHead>
                          <TableHead>Shift</TableHead>
                          <TableHead>Slots</TableHead>
                          <TableHead>Skills</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roles.map((role) => (
                          <TableRow key={role.id}>
                            <TableCell className="font-medium">{role.name}</TableCell>
                            <TableCell>{role.shiftStart} - {role.shiftEnd}</TableCell>
                            <TableCell>{role.slotsNeeded}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {role.skills.map((s) => (
                                  <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{role.notes}</TableCell>
                            <TableCell>
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeRole(role.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Event Settings
                </CardTitle>
                <CardDescription>Visibility and registration options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Public Event</Label>
                      <p className="text-sm text-muted-foreground">Visible to all visitors</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => handleChange("isPublic", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Invite Only</Label>
                      <p className="text-sm text-muted-foreground">Only invited users can register</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.isInviteOnly}
                    onCheckedChange={(checked) => handleChange("isInviteOnly", checked)}
                  />
                </div>

                {formData.isInviteOnly && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Invite link generation placeholder</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Approval</Label>
                    <p className="text-sm text-muted-foreground">Manually approve registrations</p>
                  </div>
                  <Switch
                    checked={formData.requiresApproval}
                    onCheckedChange={(checked) => handleChange("requiresApproval", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Waitlist</Label>
                    <p className="text-sm text-muted-foreground">Allow signups when full</p>
                  </div>
                  <Switch
                    checked={formData.waitlistEnabled}
                    onCheckedChange={(checked) => handleChange("waitlistEnabled", checked)}
                  />
                </div>

                {formData.waitlistEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="maxWaitlistSize">Max Waitlist Size</Label>
                    <Input
                      id="maxWaitlistSize"
                      type="number"
                      placeholder="50"
                      value={formData.maxWaitlistSize}
                      onChange={(e) => handleChange("maxWaitlistSize", e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="internalNotes">Internal Notes</Label>
                  <Textarea
                    id="internalNotes"
                    placeholder="Notes for organizers only..."
                    rows={3}
                    value={formData.internalNotes}
                    onChange={(e) => handleChange("internalNotes", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Communications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Communications
                </CardTitle>
                <CardDescription>Automated email reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>24-Hour Reminder</Label>
                    <p className="text-sm text-muted-foreground">Send reminder 24 hours before</p>
                  </div>
                  <Switch
                    checked={formData.reminder24h}
                    onCheckedChange={(checked) => handleChange("reminder24h", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>2-Hour Reminder</Label>
                    <p className="text-sm text-muted-foreground">Send reminder 2 hours before</p>
                  </div>
                  <Switch
                    checked={formData.reminder2h}
                    onCheckedChange={(checked) => handleChange("reminder2h", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Post-Event Thank You</Label>
                    <p className="text-sm text-muted-foreground">Send thank you email after event</p>
                  </div>
                  <Switch
                    checked={formData.postEventThankYou}
                    onCheckedChange={(checked) => handleChange("postEventThankYou", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/events")}>
              Cancel
            </Button>
            <Button type="button" variant="outline" onClick={(e) => handleSubmit(e as any, true)}>
              Save Draft
            </Button>
            <Button type="submit">
              {isEditing ? "Update Event" : "Publish Event"}
            </Button>
          </div>
        </form>
      </div>
    </TooltipProvider>
  );
}
