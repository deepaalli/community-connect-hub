import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Edit,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  MoreHorizontal,
  Download,
  Search,
  Share2,
  Pause,
  Play,
} from "lucide-react";

const campaign = {
  id: 1,
  title: "Winter Shelter Initiative",
  tagline: "Providing warmth and safety for those in need",
  description: "This campaign aims to provide emergency shelter, warm meals, and essential supplies to homeless individuals during the harsh winter months.",
  status: "active",
  goal: 25000,
  raised: 18750,
  donors: 142,
  startDate: "Dec 1, 2025",
  endDate: "Feb 28, 2026",
  daysLeft: 39,
  featured: true,
  whereFundsGo: "70% goes to shelter operations, 20% to food and supplies, 10% to outreach programs.",
  whoBenefits: "Homeless individuals and families in the downtown area.",
  expectedOutcomes: "Provide shelter for 200+ individuals and serve 5,000+ meals.",
  isPublic: true,
  showGoalMeter: true,
};

const donations = [
  { id: 1, date: "Jan 20, 2026", donor: "Sarah Johnson", amount: 500, status: "succeeded" },
  { id: 2, date: "Jan 19, 2026", donor: "Corporate Partner Inc.", amount: 5000, status: "succeeded" },
  { id: 3, date: "Jan 18, 2026", donor: "Michael Chen", amount: 100, status: "succeeded" },
  { id: 4, date: "Jan 17, 2026", donor: "Anonymous", amount: 250, status: "succeeded" },
  { id: 5, date: "Jan 16, 2026", donor: "Emily Davis", amount: 75, status: "succeeded" },
];

const donors = [
  { id: 1, name: "Corporate Partner Inc.", totalDonated: 5000, donations: 1, lastDonation: "Jan 19, 2026" },
  { id: 2, name: "Sarah Johnson", totalDonated: 1500, donations: 3, lastDonation: "Jan 20, 2026" },
  { id: 3, name: "Michael Chen", totalDonated: 400, donations: 4, lastDonation: "Jan 18, 2026" },
  { id: 4, name: "Anonymous (Multiple)", totalDonated: 750, donations: 5, lastDonation: "Jan 17, 2026" },
  { id: 5, name: "Emily Davis", totalDonated: 225, donations: 3, lastDonation: "Jan 16, 2026" },
];

const donationTiers = [
  { amount: 25, label: "Supporter", impact: "Provides one warm meal", count: 45 },
  { amount: 50, label: "Helper", impact: "Provides overnight shelter for one person", count: 38 },
  { amount: 100, label: "Champion", impact: "Covers one week of supplies", count: 32 },
  { amount: 500, label: "Hero", impact: "Sponsors a family for a month", count: 15 },
  { amount: 1000, label: "Guardian", impact: "Fully funds emergency response kit", count: 8 },
];

export default function CampaignDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const progress = Math.round((campaign.raised / campaign.goal) * 100);

  const filteredDonations = donations.filter((d) =>
    d.donor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; label: string }> = {
      active: { variant: "default", label: "Active" },
      completed: { variant: "secondary", label: "Completed" },
      draft: { variant: "outline", label: "Draft" },
      paused: { variant: "destructive", label: "Paused" },
    };
    const { variant, label } = config[status] || { variant: "outline", label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/fundraising/campaigns")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{campaign.title}</h1>
              {getStatusBadge(campaign.status)}
              {campaign.featured && <Badge variant="secondary">Featured</Badge>}
            </div>
            <p className="text-muted-foreground">{campaign.tagline}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          {campaign.status === "active" ? (
            <Button variant="outline">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          ) : campaign.status === "paused" ? (
            <Button variant="outline">
              <Play className="h-4 w-4 mr-2" />
              Resume
            </Button>
          ) : null}
          <Button onClick={() => navigate(`/admin/fundraising/campaigns/${id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Campaign
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${campaign.raised.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Raised</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{campaign.donors}</p>
                <p className="text-sm text-muted-foreground">Donors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{progress}%</p>
                <p className="text-sm text-muted-foreground">Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{campaign.daysLeft}</p>
                <p className="text-sm text-muted-foreground">Days Left</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">${campaign.raised.toLocaleString()}</span>
              <span className="text-muted-foreground">Goal: ${campaign.goal.toLocaleString()}</span>
            </div>
            <Progress value={progress} className="h-4" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{campaign.donors} donors</span>
              <span>{campaign.daysLeft} days remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="donors">Donors</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Campaign Details */}
            <Card>
              <CardHeader>
                <CardTitle>About This Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{campaign.description}</p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground">Where Funds Go</h4>
                    <p className="text-sm text-muted-foreground">{campaign.whereFundsGo}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Who Benefits</h4>
                    <p className="text-sm text-muted-foreground">{campaign.whoBenefits}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Expected Outcomes</h4>
                    <p className="text-sm text-muted-foreground">{campaign.expectedOutcomes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Donation Tiers</CardTitle>
                <CardDescription>Popular giving levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationTiers.map((tier) => (
                    <div key={tier.amount} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">${tier.amount}</span>
                          <Badge variant="outline">{tier.label}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tier.impact}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{tier.count} donors</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Chart Placeholder */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Fundraising Progress</CardTitle>
                <CardDescription>Daily donations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Progress Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Donations</CardTitle>
                  <CardDescription>All donations to this campaign</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search donors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="text-muted-foreground">{donation.date}</TableCell>
                      <TableCell className="font-medium text-foreground">{donation.donor}</TableCell>
                      <TableCell className="font-semibold text-foreground">${donation.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="default">Succeeded</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Refund</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donors">
          <Card>
            <CardHeader>
              <CardTitle>Top Donors</CardTitle>
              <CardDescription>Contributors to this campaign</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Total Donated</TableHead>
                    <TableHead>Donations</TableHead>
                    <TableHead>Last Donation</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donors.map((donor) => (
                    <TableRow key={donor.id}>
                      <TableCell className="font-medium text-foreground">{donor.name}</TableCell>
                      <TableCell className="font-semibold text-foreground">${donor.totalDonated.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{donor.donations}</TableCell>
                      <TableCell className="text-muted-foreground">{donor.lastDonation}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/donors/${donor.id}`)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Configuration and visibility options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium text-foreground">Visibility</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {campaign.isPublic ? "Public - Anyone can view and donate" : "Private - Invite only"}
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium text-foreground">Goal Meter</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {campaign.showGoalMeter ? "Visible to donors" : "Hidden from public"}
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium text-foreground">Start Date</h4>
                  <p className="text-sm text-muted-foreground mt-1">{campaign.startDate}</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium text-foreground">End Date</h4>
                  <p className="text-sm text-muted-foreground mt-1">{campaign.endDate}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => navigate(`/admin/fundraising/campaigns/${id}/edit`)}>
                Edit Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
