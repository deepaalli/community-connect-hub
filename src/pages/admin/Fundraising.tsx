import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, DollarSign, TrendingUp, Users, Target } from "lucide-react";

const campaigns = [
  {
    id: 1,
    title: "Winter Shelter Initiative",
    goal: 25000,
    raised: 18750,
    donors: 142,
    daysLeft: 15,
  },
  {
    id: 2,
    title: "Youth Education Fund",
    goal: 15000,
    raised: 12300,
    donors: 89,
    daysLeft: 30,
  },
  {
    id: 3,
    title: "Community Garden Project",
    goal: 8000,
    raised: 8000,
    donors: 67,
    daysLeft: 0,
  },
];

const recentDonations = [
  { donor: "Anonymous", amount: 500, campaign: "Winter Shelter Initiative", date: "2 hours ago" },
  { donor: "John D.", amount: 100, campaign: "Youth Education Fund", date: "5 hours ago" },
  { donor: "Sarah M.", amount: 250, campaign: "Winter Shelter Initiative", date: "1 day ago" },
  { donor: "Corporate Partner", amount: 2000, campaign: "Youth Education Fund", date: "2 days ago" },
];

export default function AdminFundraising() {
  const navigate = useNavigate();
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalGoal = campaigns.reduce((sum, c) => sum + c.goal, 0);
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donors, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fundraising</h1>
          <p className="text-muted-foreground">Track campaigns and donations</p>
        </div>
        <Button onClick={() => navigate("/admin/fundraising/campaigns/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalRaised.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">of ${totalGoal.toLocaleString()} goal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalDonors}</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{campaigns.filter(c => c.daysLeft > 0).length}</div>
            <p className="text-xs text-muted-foreground">{campaigns.filter(c => c.daysLeft === 0).length} completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Donation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${Math.round(totalRaised / totalDonors)}</div>
            <p className="text-xs text-muted-foreground">Per donor</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Track your fundraising progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {campaigns.map((campaign) => {
              const progress = Math.round((campaign.raised / campaign.goal) * 100);
              return (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{campaign.title}</h4>
                    {campaign.daysLeft > 0 ? (
                      <span className="text-xs text-muted-foreground">{campaign.daysLeft} days left</span>
                    ) : (
                      <span className="text-xs text-primary font-medium">Completed</span>
                    )}
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}
                    </span>
                    <span className="font-medium text-foreground">{progress}%</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Latest contributions received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDonations.map((donation, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-foreground">{donation.donor}</p>
                    <p className="text-sm text-muted-foreground">{donation.campaign}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${donation.amount}</p>
                    <p className="text-xs text-muted-foreground">{donation.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
