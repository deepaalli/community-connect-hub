import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Target, Calendar, DollarSign, Image, Settings, 
  Plus, Trash2, Upload, X, Heart
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

interface DonationTier {
  id: string;
  amount: number;
  label: string;
  impactDescription: string;
}

const categoryTags = [
  "Emergency", "Education", "Healthcare", "Environment", "Housing",
  "Food", "Youth", "Seniors", "Animals", "Arts", "Community"
];

export default function CampaignForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    category: "",
    tags: [] as string[],
    coverImage: null as File | null,
    coverImagePreview: "",
    shareImage: null as File | null,
    shareImagePreview: "",
    whereFundsGo: "",
    whoBenefits: "",
    expectedOutcomes: "",
    goal: "",
    startDate: "",
    endDate: "",
    showProgressMeter: true,
    minimumDonation: "",
    allowRecurring: true,
    recurringFrequency: "monthly",
    allowCoverFees: true,
    allowAnonymous: true,
    receiptSubject: "",
    receiptMessage: "",
    taxReceiptFooter: "",
    isPublic: true,
    isFeatured: false,
    internalNotes: "",
  });

  const [donationTiers, setDonationTiers] = useState<DonationTier[]>([]);
  const [newTier, setNewTier] = useState({ amount: "", label: "", impactDescription: "" });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = "Campaign title is required";
    if (!formData.goal) newErrors.goal = "Fundraising goal is required";

    if (!isDraft && Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Saving campaign:", { ...formData, donationTiers, status: isDraft ? "draft" : "published" });
    navigate("/admin/fundraising");
  };

  const handleChange = (field: string, value: string | boolean | string[] | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (field: "coverImage" | "shareImage", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange(field, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange(`${field}Preview`, reader.result as string);
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

  const addDonationTier = () => {
    if (newTier.amount && newTier.label) {
      setDonationTiers([
        ...donationTiers,
        { ...newTier, id: Date.now().toString(), amount: parseFloat(newTier.amount) }
      ]);
      setNewTier({ amount: "", label: "", impactDescription: "" });
    }
  };

  const removeDonationTier = (id: string) => {
    setDonationTiers(donationTiers.filter((t) => t.id !== id));
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

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Campaign Details */}
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
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Short Tagline</Label>
                <Input
                  id="tagline"
                  placeholder="Brief tagline for the campaign..."
                  value={formData.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Appears in previews and shares</p>
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
                <p className="text-xs text-muted-foreground">Supports rich text formatting</p>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => handleChange("category", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="shelter">Shelter & Housing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="food">Food & Hunger</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="emergency">Emergency Relief</SelectItem>
                    <SelectItem value="general">General Fund</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
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
                <Select onValueChange={addTag}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add tags..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {categoryTags.filter((t) => !formData.tags.includes(t)).map((tag) => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Media
              </CardTitle>
              <CardDescription>Campaign visuals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {formData.coverImagePreview ? (
                    <div className="relative">
                      <img src={formData.coverImagePreview} alt="Cover Preview" className="max-h-32 mx-auto rounded" />
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
                      <p className="text-sm text-muted-foreground">Upload cover image</p>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("coverImage", e)} />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Share Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {formData.shareImagePreview ? (
                    <div className="relative">
                      <img src={formData.shareImagePreview} alt="Share Preview" className="max-h-32 mx-auto rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => { handleChange("shareImage", null); handleChange("shareImagePreview", ""); }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload social share image</p>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("shareImage", e)} />
                    </label>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Recommended: 1200x630px for social media</p>
              </div>
            </CardContent>
          </Card>

          {/* Impact Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Impact Section
              </CardTitle>
              <CardDescription>Describe the impact of donations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whereFundsGo">Where Funds Go</Label>
                <Textarea
                  id="whereFundsGo"
                  placeholder="Explain how the funds will be used..."
                  rows={3}
                  value={formData.whereFundsGo}
                  onChange={(e) => handleChange("whereFundsGo", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whoBenefits">Who Benefits</Label>
                <Textarea
                  id="whoBenefits"
                  placeholder="Describe who will be helped by this campaign..."
                  rows={3}
                  value={formData.whoBenefits}
                  onChange={(e) => handleChange("whoBenefits", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedOutcomes">Expected Outcomes</Label>
                <Textarea
                  id="expectedOutcomes"
                  placeholder="What results do you expect to achieve?"
                  rows={3}
                  value={formData.expectedOutcomes}
                  onChange={(e) => handleChange("expectedOutcomes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Goal & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
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
                  className={errors.goal ? "border-destructive" : ""}
                />
                {errors.goal && <p className="text-sm text-destructive">{errors.goal}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Progress Meter</Label>
                  <p className="text-sm text-muted-foreground">Display public goal progress</p>
                </div>
                <Switch
                  checked={formData.showProgressMeter}
                  onCheckedChange={(checked) => handleChange("showProgressMeter", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Donation Tiers */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Donation Settings
              </CardTitle>
              <CardDescription>Configure donation options and suggested tiers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
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
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Recurring</Label>
                    <p className="text-sm text-muted-foreground">Monthly donations</p>
                  </div>
                  <Switch
                    checked={formData.allowRecurring}
                    onCheckedChange={(checked) => handleChange("allowRecurring", checked)}
                  />
                </div>
                {formData.allowRecurring && (
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={formData.recurringFrequency} onValueChange={(v) => handleChange("recurringFrequency", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Cover Fees</Label>
                    <p className="text-sm text-muted-foreground">Let donors cover processing fees</p>
                  </div>
                  <Switch
                    checked={formData.allowCoverFees}
                    onCheckedChange={(checked) => handleChange("allowCoverFees", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Anonymous</Label>
                    <p className="text-sm text-muted-foreground">Let donors give anonymously</p>
                  </div>
                  <Switch
                    checked={formData.allowAnonymous}
                    onCheckedChange={(checked) => handleChange("allowAnonymous", checked)}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-base font-semibold">Suggested Donation Tiers</Label>
                <p className="text-sm text-muted-foreground mb-4">Add suggested amounts with impact descriptions</p>
                
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      placeholder="25"
                      value={newTier.amount}
                      onChange={(e) => setNewTier({ ...newTier, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input
                      placeholder="Supporter"
                      value={newTier.label}
                      onChange={(e) => setNewTier({ ...newTier, label: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Impact Description</Label>
                    <Input
                      placeholder="Provides one meal"
                      value={newTier.impactDescription}
                      onChange={(e) => setNewTier({ ...newTier, impactDescription: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <Button type="button" onClick={addDonationTier} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tier
                    </Button>
                  </div>
                </div>

                {donationTiers.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Amount</TableHead>
                          <TableHead>Label</TableHead>
                          <TableHead>Impact</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donationTiers.map((tier) => (
                          <TableRow key={tier.id}>
                            <TableCell className="font-medium">${tier.amount}</TableCell>
                            <TableCell>{tier.label}</TableCell>
                            <TableCell className="text-muted-foreground">{tier.impactDescription}</TableCell>
                            <TableCell>
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeDonationTier(tier.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Receipt Customization */}
          <Card>
            <CardHeader>
              <CardTitle>Receipt Customization</CardTitle>
              <CardDescription>Customize donation receipts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receiptSubject">Receipt Subject</Label>
                <Input
                  id="receiptSubject"
                  placeholder="Thank you for your donation!"
                  value={formData.receiptSubject}
                  onChange={(e) => handleChange("receiptSubject", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptMessage">Receipt Message</Label>
                <Textarea
                  id="receiptMessage"
                  placeholder="Personal message to include in the receipt..."
                  rows={3}
                  value={formData.receiptMessage}
                  onChange={(e) => handleChange("receiptMessage", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxReceiptFooter">Tax Receipt Footer</Label>
                <Textarea
                  id="taxReceiptFooter"
                  placeholder="Legal text for tax receipts..."
                  rows={2}
                  value={formData.taxReceiptFooter}
                  onChange={(e) => handleChange("taxReceiptFooter", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Campaign Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Campaign Settings
              </CardTitle>
              <CardDescription>Visibility and promotion options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Campaign</Label>
                  <p className="text-sm text-muted-foreground">Visible to all visitors</p>
                </div>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => handleChange("isPublic", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Featured Campaign</Label>
                  <p className="text-sm text-muted-foreground">Highlight on homepage</p>
                </div>
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleChange("isFeatured", checked)}
                />
              </div>

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
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/fundraising")}>
            Cancel
          </Button>
          <Button type="button" variant="outline" onClick={(e) => handleSubmit(e as any, true)}>
            Save Draft
          </Button>
          <Button type="submit">
            {isEditing ? "Update Campaign" : "Publish Campaign"}
          </Button>
        </div>
      </form>
    </div>
  );
}
