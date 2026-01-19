import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Pencil, Mail, Phone, DollarSign, Calendar, Heart, TrendingUp } from "lucide-react";

const donorData = {
  id: 1,
  name: "John Davidson",
  email: "john.davidson@email.com",
  phone: "(555) 123-4567",
  address: "123 Main Street, Springfield, IL 62701",
  type: "Individual",
  status: "Active",
  totalDonated: 2500,
  donationCount: 8,
  avgDonation: 312.5,
  firstDonation: "2022-03-15",
  lastDonation: "2024-01-15",
  isRecurring: true,
  recurringAmount: 50,
  notes: "Prefers to donate to education-related campaigns. Very responsive to email outreach.",
  communications: "Email preferred",
};

const donationHistory = [
  { id: 1, date: "2024-01-15", amount: 500, campaign: "Winter Shelter Initiative", method: "Credit Card" },
  { id: 2, date: "2023-12-01", amount: 50, campaign: "Monthly Giving", method: "Recurring" },
  { id: 3, date: "2023-11-01", amount: 50, campaign: "Monthly Giving", method: "Recurring" },
  { id: 4, date: "2023-10-15", amount: 250, campaign: "Youth Education Fund", method: "Credit Card" },
  { id: 5, date: "2023-10-01", amount: 50, campaign: "Monthly Giving", method: "Recurring" },
  { id: 6, date: "2023-09-01", amount: 50, campaign: "Monthly Giving", method: "Recurring" },
  { id: 7, date: "2023-08-20", amount: 1000, campaign: "Summer Camp Fundraiser", method: "Bank Transfer" },
  { id: 8, date: "2023-05-10", amount: 500, campaign: "Community Garden Project", method: "Credit Card" },
];

export default function DonorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Individual":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Corporate":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Foundation":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/donors")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{donorData.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className={getTypeColor(donorData.type)}>
              {donorData.type}
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {donorData.status}
            </Badge>
            {donorData.isRecurring && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Recurring Donor
              </Badge>
            )}
          </div>
        </div>
        <Button onClick={() => navigate(`/admin/donors/${id}/edit`)}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Donor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${donorData.totalDonated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime contributions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{donorData.donationCount}</div>
            <p className="text-xs text-muted-foreground">Total transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Donation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${donorData.avgDonation}</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Recurring</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${donorData.recurringAmount}/mo</div>
            <p className="text-xs text-muted-foreground">Active subscription</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{donorData.email}</p>
                <p className="text-xs text-muted-foreground">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{donorData.phone}</p>
                <p className="text-xs text-muted-foreground">Phone</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">{donorData.address}</p>
              <p className="text-xs text-muted-foreground">Address</p>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm font-medium">{donorData.communications}</p>
              <p className="text-xs text-muted-foreground">Preferred communication</p>
            </div>
          </CardContent>
        </Card>

        {/* Donor Notes */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notes & Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{donorData.notes}</p>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">First Donation</p>
                <p className="font-medium">{new Date(donorData.firstDonation).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Donation</p>
                <p className="font-medium">{new Date(donorData.lastDonation).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation History */}
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>Complete record of all donations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationHistory.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">${donation.amount.toLocaleString()}</TableCell>
                  <TableCell>{donation.campaign}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{donation.method}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
