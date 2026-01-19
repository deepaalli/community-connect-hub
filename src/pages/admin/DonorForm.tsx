import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, User, Building, Receipt, Tag, Heart, X } from "lucide-react";

const campaigns = [
  { id: "1", name: "Winter Shelter Initiative" },
  { id: "2", name: "Youth Education Fund" },
  { id: "3", name: "Community Kitchen" },
  { id: "4", name: "Senior Care Program" },
];

export default function DonorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    donorType: "individual",
    firstName: "",
    lastName: "",
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
    preferredCommunication: "email",
    status: "active",
    autoSendReceipts: true,
    receiptEmailOverride: "",
    communicationConsent: false,
    tags: [] as string[],
    preferredCampaigns: [] as string[],
    notes: "",
    recurringEnabled: false,
    recurringFrequency: "monthly",
    recurringStartDate: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      handleChange("tags", [...formData.tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    handleChange("tags", formData.tags.filter((t) => t !== tag));
  };

  const toggleCampaign = (campaignId: string) => {
    if (formData.preferredCampaigns.includes(campaignId)) {
      handleChange("preferredCampaigns", formData.preferredCampaigns.filter((c) => c !== campaignId));
    } else {
      handleChange("preferredCampaigns", [...formData.preferredCampaigns, campaignId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (formData.donorType === "individual") {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
    } else {
      if (!formData.organizationName) newErrors.organizationName = "Organization name is required";
    }
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.communicationConsent) {
      newErrors.communicationConsent = "Communication consent is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Saving donor:", formData);
    navigate("/admin/donors");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/donors")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Edit Donor" : "Add New Donor"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update donor information" : "Enter donor details"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Donor Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {formData.donorType === "individual" ? <User className="h-5 w-5" /> : <Building className="h-5 w-5" />}
                Donor Type
              </CardTitle>
              <CardDescription>Select the type of donor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select value={formData.donorType} onValueChange={(v) => handleChange("donorType", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.donorType === "individual" ? (
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
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      placeholder="Acme Corporation"
                      value={formData.organizationName}
                      onChange={(e) => handleChange("organizationName", e.target.value)}
                      className={errors.organizationName ? "border-destructive" : ""}
                    />
                    {errors.organizationName && <p className="text-sm text-destructive">{errors.organizationName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      placeholder="Jane Smith"
                      value={formData.contactPerson}
                      onChange={(e) => handleChange("contactPerson", e.target.value)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How to reach this donor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="communication">Preferred Communication</Label>
                <Select value={formData.preferredCommunication} onValueChange={(v) => handleChange("preferredCommunication", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="mail">Mail</SelectItem>
                    <SelectItem value="none">No Contact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>Mailing address for correspondence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="123 Main Street"
                  value={formData.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Springfield"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="IL"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="62701"
                    value={formData.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="USA"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Receipt & Consent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Tax Receipt & Consent
              </CardTitle>
              <CardDescription>Receipt and communication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-send Receipts</Label>
                  <p className="text-sm text-muted-foreground">Automatically send tax receipts after donations</p>
                </div>
                <Switch
                  checked={formData.autoSendReceipts}
                  onCheckedChange={(checked) => handleChange("autoSendReceipts", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptEmailOverride">Receipt Email Override</Label>
                <Input
                  id="receiptEmailOverride"
                  type="email"
                  placeholder="Leave blank to use primary email"
                  value={formData.receiptEmailOverride}
                  onChange={(e) => handleChange("receiptEmailOverride", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Optional: Send receipts to a different email</p>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <Checkbox
                  id="communicationConsent"
                  checked={formData.communicationConsent}
                  onCheckedChange={(checked) => handleChange("communicationConsent", checked as boolean)}
                  className={errors.communicationConsent ? "border-destructive" : ""}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="communicationConsent" className={errors.communicationConsent ? "text-destructive" : ""}>
                    Communication Consent *
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    May we contact you about campaigns and impact updates?
                  </p>
                  {errors.communicationConsent && (
                    <p className="text-sm text-destructive">{errors.communicationConsent}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segmentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Segmentation
              </CardTitle>
              <CardDescription>Tags and status for donor organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Donor Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>Add</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Donor Status</Label>
                <Select value={formData.status} onValueChange={(v) => handleChange("status", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Giving Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Giving Profile
              </CardTitle>
              <CardDescription>Preferences and interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Campaigns</Label>
                <div className="space-y-2">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`campaign-${campaign.id}`}
                        checked={formData.preferredCampaigns.includes(campaign.id)}
                        onCheckedChange={() => toggleCampaign(campaign.id)}
                      />
                      <Label htmlFor={`campaign-${campaign.id}`} className="font-normal">
                        {campaign.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any relevant notes about this donor's preferences, interests, or giving history..."
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recurring Donation */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recurring Donation</CardTitle>
              <CardDescription>Set up recurring giving preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Recurring Donation</Label>
                  <p className="text-sm text-muted-foreground">Set up automatic recurring giving</p>
                </div>
                <Switch
                  checked={formData.recurringEnabled}
                  onCheckedChange={(checked) => handleChange("recurringEnabled", checked)}
                />
              </div>

              {formData.recurringEnabled && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={formData.recurringFrequency} onValueChange={(v) => handleChange("recurringFrequency", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recurringStartDate">Start Date</Label>
                    <Input
                      id="recurringStartDate"
                      type="date"
                      value={formData.recurringStartDate}
                      onChange={(e) => handleChange("recurringStartDate", e.target.value)}
                    />
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Actual billing setup handled via Stripe subscriptions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/donors")}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Update Donor" : "Add Donor"}
          </Button>
        </div>
      </form>
    </div>
  );
}
