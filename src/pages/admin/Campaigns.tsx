import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  DollarSign,
  Target,
  TrendingUp,
  Calendar,
  LayoutGrid,
  List,
} from "lucide-react";

const campaigns = [
  {
    id: 1,
    title: "Winter Shelter Initiative",
    tagline: "Providing warmth and safety for those in need",
    status: "active",
    goal: 25000,
    raised: 18750,
    donors: 142,
    startDate: "Dec 1, 2025",
    endDate: "Feb 28, 2026",
    daysLeft: 39,
    featured: true,
  },
  {
    id: 2,
    title: "Youth Education Fund",
    tagline: "Empowering the next generation through education",
    status: "active",
    goal: 15000,
    raised: 12300,
    donors: 89,
    startDate: "Jan 1, 2026",
    endDate: "Mar 31, 2026",
    daysLeft: 70,
    featured: false,
  },
  {
    id: 3,
    title: "Community Garden Project",
    tagline: "Growing together, feeding our community",
    status: "completed",
    goal: 8000,
    raised: 8000,
    donors: 67,
    startDate: "Oct 1, 2025",
    endDate: "Dec 31, 2025",
    daysLeft: 0,
    featured: false,
  },
  {
    id: 4,
    title: "Emergency Relief Fund",
    tagline: "Rapid response for community emergencies",
    status: "draft",
    goal: 50000,
    raised: 0,
    donors: 0,
    startDate: "Feb 1, 2026",
    endDate: "Apr 30, 2026",
    daysLeft: null,
    featured: false,
  },
  {
    id: 5,
    title: "Senior Care Program",
    tagline: "Supporting our elderly community members",
    status: "paused",
    goal: 12000,
    raised: 4500,
    donors: 38,
    startDate: "Nov 15, 2025",
    endDate: "Jan 31, 2026",
    daysLeft: 11,
    featured: false,
  },
];

const statuses = [
  { id: "all", name: "All Statuses" },
  { id: "active", name: "Active" },
  { id: "completed", name: "Completed" },
  { id: "draft", name: "Draft" },
  { id: "paused", name: "Paused" },
];

export default function Campaigns() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (statusFilter !== "all" && campaign.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalGoal = campaigns.reduce((sum, c) => sum + c.goal, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground">Manage your fundraising campaigns</p>
        </div>
        <Button onClick={() => navigate("/admin/fundraising/campaigns/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
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
                <p className="text-2xl font-bold text-foreground">${totalRaised.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Raised</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${totalGoal.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Combined Goals</p>
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
                <p className="text-2xl font-bold text-foreground">{Math.round((totalRaised / totalGoal) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
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
                <p className="text-2xl font-bold text-foreground">{activeCampaigns}</p>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign List */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => {
            const progress = Math.round((campaign.raised / campaign.goal) * 100);
            return (
              <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/admin/fundraising/campaigns/${campaign.id}`)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      <CardDescription>{campaign.tagline}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {campaign.featured && <Badge variant="secondary">Featured</Badge>}
                      {getStatusBadge(campaign.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-foreground">${campaign.raised.toLocaleString()}</span>
                      <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{campaign.donors} donors</span>
                    {campaign.daysLeft !== null && campaign.daysLeft > 0 && (
                      <span>{campaign.daysLeft} days left</span>
                    )}
                    {campaign.daysLeft === 0 && <span>Ended</span>}
                    {campaign.daysLeft === null && <span>Not started</span>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Raised</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => {
                  const progress = Math.round((campaign.raised / campaign.goal) * 100);
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{campaign.title}</p>
                          <p className="text-xs text-muted-foreground">{campaign.tagline}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell className="text-foreground">${campaign.goal.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold text-foreground">${campaign.raised.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={progress} className="w-20 h-2" />
                          <span className="text-sm text-muted-foreground">{progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{campaign.endDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/admin/fundraising/campaigns/${campaign.id}`)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/admin/fundraising/campaigns/${campaign.id}/edit`)}>
                              Edit Campaign
                            </DropdownMenuItem>
                            {campaign.status === "draft" && (
                              <DropdownMenuItem>Publish</DropdownMenuItem>
                            )}
                            {campaign.status === "active" && (
                              <DropdownMenuItem>Pause</DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
