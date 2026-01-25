import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Package,
  Briefcase,
  Calendar,
  Upload,
  FileText,
  Heart,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const sponsor = {
  id: 1,
  name: "ABC Corporation",
  type: "organization",
  contactName: "John Smith",
  email: "john@abccorp.com",
  phone: "(555) 123-4567",
  address: "123 Business Ave, New York, NY 10001",
  donationType: "cash",
  totalContribution: 15000,
  eventsSponsored: 5,
  status: "active",
  notes: "Long-term corporate partner. Prefers quarterly sponsorship meetings.",
};

const cashDonations = [
  { id: 1, amount: 5000, date: "Jan 10, 2026", event: "Community Cleanup Day", paymentMode: "Bank Transfer", receiptUploaded: true },
  { id: 2, amount: 3000, date: "Dec 15, 2025", event: "Holiday Food Drive", paymentMode: "Check", receiptUploaded: true },
  { id: 3, amount: 4000, date: "Nov 1, 2025", event: "Fall Festival", paymentMode: "Credit Card", receiptUploaded: false },
  { id: 4, amount: 3000, date: "Sep 20, 2025", event: "Back to School Event", paymentMode: "Bank Transfer", receiptUploaded: true },
];

const itemDonations = [
  { id: 1, item: "Food Packets", quantity: 200, event: "Holiday Food Drive", usage: "Volunteer meals", value: 1000 },
  { id: 2, item: "Water Bottles", quantity: 500, event: "Community Cleanup Day", usage: "Hydration supplies", value: 750 },
];

const linkedEvents = [
  { id: 1, name: "Community Cleanup Day", date: "Jan 15, 2026", contribution: 5000, type: "cash" },
  { id: 2, name: "Holiday Food Drive", date: "Dec 20, 2025", contribution: 3000, type: "cash" },
  { id: 3, name: "Fall Festival", date: "Oct 15, 2025", contribution: 4000, type: "cash" },
  { id: 4, name: "Back to School Event", date: "Sep 5, 2025", contribution: 3000, type: "cash" },
];

export default function SponsorDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const getDonationIcon = (type: string) => {
    switch (type) {
      case "cash": return <DollarSign className="h-4 w-4" />;
      case "item": return <Package className="h-4 w-4" />;
      case "service": return <Briefcase className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/sponsors")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{sponsor.name}</h1>
              <Badge variant={sponsor.status === "active" ? "default" : "secondary"}>
                {sponsor.status}
              </Badge>
            </div>
            <p className="text-muted-foreground capitalize">{sponsor.type} Sponsor</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/admin/sponsors/${id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Sponsor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contribution</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${sponsor.totalContribution.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Sponsored</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsor.eventsSponsored}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cashDonations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Item Donations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{itemDonations.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cash">Cash Donations</TabsTrigger>
          <TabsTrigger value="items">Item Donations</TabsTrigger>
          <TabsTrigger value="events">Linked Events</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {sponsor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{sponsor.contactName}</p>
                    <p className="text-sm text-muted-foreground">Primary Contact</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{sponsor.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{sponsor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{sponsor.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contribution Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Contribution Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Cash Donations</span>
                  </div>
                  <span className="font-medium">${cashDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Item Donations</span>
                  </div>
                  <span className="font-medium">${itemDonations.reduce((sum, d) => sum + d.value, 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="font-medium text-foreground">Total Value</span>
                  <span className="text-lg font-bold text-primary">${sponsor.totalContribution.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{sponsor.notes}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash Donations</CardTitle>
              <CardDescription>All monetary contributions from this sponsor</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="text-muted-foreground">{donation.date}</TableCell>
                      <TableCell className="font-medium text-foreground">{donation.event}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{donation.paymentMode}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">${donation.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        {donation.receiptUploaded ? (
                          <Button variant="ghost" size="sm" className="gap-1">
                            <FileText className="h-4 w-4" />
                            View
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Upload className="h-4 w-4" />
                            Upload
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Donations</CardTitle>
              <CardDescription>In-kind contributions from this sponsor</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead className="text-right">Est. Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium text-foreground">{donation.item}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>{donation.event}</TableCell>
                      <TableCell className="text-muted-foreground">{donation.usage}</TableCell>
                      <TableCell className="text-right font-medium">${donation.value.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Linked Events</CardTitle>
              <CardDescription>Events this sponsor has contributed to</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Contribution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkedEvents.map((event) => (
                    <TableRow key={event.id} className="cursor-pointer" onClick={() => navigate(`/admin/events/${event.id}`)}>
                      <TableCell className="font-medium text-foreground">{event.name}</TableCell>
                      <TableCell className="text-muted-foreground">{event.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1 capitalize">
                          {getDonationIcon(event.type)}
                          {event.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">${event.contribution.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
