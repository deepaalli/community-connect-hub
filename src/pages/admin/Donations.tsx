import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DollarSign,
  Download,
  MoreHorizontal,
  Search,
  TrendingUp,
  Users,
  Receipt,
} from "lucide-react";

const donations = [
  {
    id: 1,
    date: "Jan 20, 2026",
    donor: "Sarah Johnson",
    donorId: 1,
    email: "sarah.j@email.com",
    amount: 500,
    campaign: "Winter Shelter Initiative",
    status: "succeeded",
    receiptSent: true,
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    date: "Jan 19, 2026",
    donor: "Corporate Partner Inc.",
    donorId: 2,
    email: "donations@corppartner.com",
    amount: 5000,
    campaign: "Youth Education Fund",
    status: "succeeded",
    receiptSent: true,
    paymentMethod: "Bank Transfer",
  },
  {
    id: 3,
    date: "Jan 18, 2026",
    donor: "Michael Chen",
    donorId: 3,
    email: "m.chen@email.com",
    amount: 100,
    campaign: "Winter Shelter Initiative",
    status: "succeeded",
    receiptSent: true,
    paymentMethod: "Credit Card",
  },
  {
    id: 4,
    date: "Jan 17, 2026",
    donor: "Anonymous",
    donorId: null,
    email: null,
    amount: 250,
    campaign: "Community Garden Project",
    status: "succeeded",
    receiptSent: false,
    paymentMethod: "Credit Card",
  },
  {
    id: 5,
    date: "Jan 16, 2026",
    donor: "Emily Davis",
    donorId: 4,
    email: "emily.d@email.com",
    amount: 75,
    campaign: "Youth Education Fund",
    status: "pending",
    receiptSent: false,
    paymentMethod: "ACH",
  },
  {
    id: 6,
    date: "Jan 15, 2026",
    donor: "James Wilson",
    donorId: 5,
    email: "j.wilson@email.com",
    amount: 150,
    campaign: "Winter Shelter Initiative",
    status: "failed",
    receiptSent: false,
    paymentMethod: "Credit Card",
  },
  {
    id: 7,
    date: "Jan 14, 2026",
    donor: "Lisa Martinez",
    donorId: 6,
    email: "lisa.m@email.com",
    amount: 1000,
    campaign: "Community Garden Project",
    status: "refunded",
    receiptSent: true,
    paymentMethod: "Credit Card",
  },
];

const campaigns = [
  { id: "all", name: "All Campaigns" },
  { id: "1", name: "Winter Shelter Initiative" },
  { id: "2", name: "Youth Education Fund" },
  { id: "3", name: "Community Garden Project" },
];

const statuses = [
  { id: "all", name: "All Statuses" },
  { id: "succeeded", name: "Succeeded" },
  { id: "pending", name: "Pending" },
  { id: "failed", name: "Failed" },
  { id: "refunded", name: "Refunded" },
];

export default function Donations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredDonations = donations.filter((donation) => {
    if (searchQuery && !donation.donor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (campaignFilter !== "all" && !donation.campaign.includes(campaigns.find(c => c.id === campaignFilter)?.name || "")) {
      return false;
    }
    if (statusFilter !== "all" && donation.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const totalAmount = filteredDonations
    .filter((d) => d.status === "succeeded")
    .reduce((sum, d) => sum + d.amount, 0);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; label: string }> = {
      succeeded: { variant: "default", label: "Succeeded" },
      pending: { variant: "secondary", label: "Pending" },
      failed: { variant: "destructive", label: "Failed" },
      refunded: { variant: "outline", label: "Refunded" },
    };
    const { variant, label } = config[status] || { variant: "outline", label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const handleExportCSV = () => {
    console.log("Export CSV");
  };

  const handleSendReceipt = (donationId: number) => {
    console.log("Send receipt:", donationId);
  };

  const handleRefund = (donationId: number) => {
    console.log("Refund:", donationId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Donations</h1>
          <p className="text-muted-foreground">Track and manage all donations</p>
        </div>
        <Button variant="outline" onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
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
                <p className="text-2xl font-bold text-foreground">${totalAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Received</p>
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
                <p className="text-2xl font-bold text-foreground">{filteredDonations.length}</p>
                <p className="text-sm text-muted-foreground">Total Donations</p>
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
                <p className="text-2xl font-bold text-foreground">
                  ${filteredDonations.length > 0 ? Math.round(totalAmount / filteredDonations.filter(d => d.status === "succeeded").length) : 0}
                </p>
                <p className="text-sm text-muted-foreground">Avg. Donation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {filteredDonations.filter((d) => d.receiptSent).length}
                </p>
                <p className="text-sm text-muted-foreground">Receipts Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by donor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Campaign" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start date"
              className="w-full md:w-auto"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End date"
              className="w-full md:w-auto"
            />
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="text-muted-foreground">{donation.date}</TableCell>
                  <TableCell>
                    <div>
                      <p
                        className={`font-medium ${donation.donorId ? "text-primary cursor-pointer hover:underline" : "text-foreground"}`}
                        onClick={() => donation.donorId && navigate(`/admin/donors/${donation.donorId}`)}
                      >
                        {donation.donor}
                      </p>
                      {donation.email && (
                        <p className="text-xs text-muted-foreground">{donation.email}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-foreground">${donation.amount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{donation.campaign}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(donation.status)}</TableCell>
                  <TableCell>
                    {donation.receiptSent ? (
                      <Badge variant="secondary">Sent</Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {donation.donorId && (
                          <DropdownMenuItem onClick={() => navigate(`/admin/donors/${donation.donorId}`)}>
                            View Donor
                          </DropdownMenuItem>
                        )}
                        {!donation.receiptSent && donation.status === "succeeded" && (
                          <DropdownMenuItem onClick={() => handleSendReceipt(donation.id)}>
                            Send Receipt
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        {donation.status === "succeeded" && (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleRefund(donation.id)}
                          >
                            Refund
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
