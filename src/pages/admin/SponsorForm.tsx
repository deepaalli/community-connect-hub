import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

export default function SponsorForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/sponsors")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Edit Sponsor" : "Add New Sponsor"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update sponsor information" : "Register a new sponsor"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Sponsor name and type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Sponsor Name *</Label>
              <Input id="name" placeholder="e.g., ABC Corporation" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Sponsor Type *</Label>
              <Select defaultValue="organization">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="donationType">Primary Donation Type</Label>
              <Select defaultValue="cash">
                <SelectTrigger>
                  <SelectValue placeholder="Select donation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash Donation</SelectItem>
                  <SelectItem value="item">Item Donation</SelectItem>
                  <SelectItem value="service">Service Donation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Primary contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input id="contactName" placeholder="e.g., John Smith" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>Sponsor location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="street">Street Address</Label>
              <Input id="street" placeholder="123 Business Ave" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="New York" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="NY" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" placeholder="10001" />
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Notes and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about the sponsor..."
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/admin/sponsors")}>
          Cancel
        </Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? "Save Changes" : "Create Sponsor"}
        </Button>
      </div>
    </div>
  );
}
