import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Target, Calendar, DollarSign, Image } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CampaignForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    goal: "",
    startDate: "",
    endDate: "",
    category: "",
    status: "draft",
    imageUrl: "",
    isPublic: true,
    isFeatured: false,
    allowRecurring: true,
    minimumDonation: "",
    suggestedAmounts: "",
    thankYouMessage: "",
    contactEmail: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save campaign data
    console.log("Saving campaign:", formData);
    navigate("/admin/fundraising");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/fundraising")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Edit Campaign" : "Create Campaign"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update campaign details" : "Set up a new fundraising campaign"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Campaign Details
              </CardTitle>
              <CardDescription>Basic campaign information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Winter Shelter Initiative"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  placeholder="Brief tagline for the campaign..."
                  value={formData.shortDescription}
                  onChange={(e) => handleChange("shortDescription", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the campaign, its purpose, and impact..."
                  rows={5}
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
                    <SelectItem value="shelter">Shelter & Housing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="food">Food & Hunger</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="youth">Youth Programs</SelectItem>
                    <SelectItem value="seniors">Senior Care</SelectItem>
                    <SelectItem value="emergency">Emergency Relief</SelectItem>
                    <SelectItem value="general">General Fund</SelectItem>
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Goal & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Goal & Timeline
              </CardTitle>
              <CardDescription>Fundraising target and dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Fundraising Goal ($) *</Label>
                <Input
                  id="goal"
                  type="number"
                  placeholder="10000"
                  value={formData.goal}
                  onChange={(e) => handleChange("goal", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Donation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Donation Settings
              </CardTitle>
              <CardDescription>Configure donation options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minimumDonation">Minimum Donation ($)</Label>
                <Input
                  id="minimumDonation"
                  type="number"
                  placeholder="5"
                  value={formData.minimumDonation}
                  onChange={(e) => handleChange("minimumDonation", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggestedAmounts">Suggested Amounts</Label>
                <Input
                  id="suggestedAmounts"
                  placeholder="25, 50, 100, 250"
                  value={formData.suggestedAmounts}
                  onChange={(e) => handleChange("suggestedAmounts", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Comma-separated amounts</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Recurring Donations</Label>
                  <p className="text-sm text-muted-foreground">
                    Let donors set up monthly giving
                  </p>
                </div>
                <Switch
                  checked={formData.allowRecurring}
                  onCheckedChange={(checked) => handleChange("allowRecurring", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Media & Presentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Media & Presentation
              </CardTitle>
              <CardDescription>Campaign visuals and messaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Campaign Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thankYouMessage">Thank You Message</Label>
                <Textarea
                  id="thankYouMessage"
                  placeholder="Message shown to donors after their contribution..."
                  rows={3}
                  value={formData.thankYouMessage}
                  onChange={(e) => handleChange("thankYouMessage", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="donations@example.org"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Visibility and promotion options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Campaign</Label>
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
                    <Label>Featured Campaign</Label>
                    <p className="text-sm text-muted-foreground">
                      Highlight on the homepage
                    </p>
                  </div>
                  <Switch
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleChange("isFeatured", checked)}
                  />
                </div>
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
          <Button type="button" variant="outline" onClick={() => navigate("/admin/fundraising")}>
            Cancel
          </Button>
          <Button type="submit" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">
            {isEditing ? "Update Campaign" : "Create Campaign"}
          </Button>
        </div>
      </form>
    </div>
  );
}
