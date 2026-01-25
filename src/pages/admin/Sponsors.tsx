import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Filter,
  Heart,
  DollarSign,
  Package,
  Briefcase,
  Eye,
  Mail,
  Phone,
} from "lucide-react";

// Mock data
const sponsors = [
  {
    id: 1,
    name: "ABC Corporation",
    type: "organization",
    contactName: "John Smith",
    email: "john@abccorp.com",
    phone: "(555) 123-4567",
    address: "123 Business Ave, New York, NY",
    donationType: "cash",
    totalContribution: 15000,
    eventsSponsored: 5,
    status: "active",
  },
  {
    id: 2,
    name: "Jane Wilson",
    type: "individual",
    contactName: "Jane Wilson",
    email: "jane.wilson@email.com",
    phone: "(555) 234-5678",
    address: "456 Oak Street, Brooklyn, NY",
    donationType: "item",
    totalContribution: 2500,
    eventsSponsored: 3,
    status: "active",
  },
  {
    id: 3,
    name: "Tech Solutions Inc",
    type: "organization",
    contactName: "Michael Brown",
    email: "m.brown@techsolutions.com",
    phone: "(555) 345-6789",
    address: "789 Tech Park, San Francisco, CA",
    donationType: "service",
    totalContribution: 8000,
    eventsSponsored: 2,
    status: "active",
  },
  {
    id: 4,
    name: "Green Foods Co",
    type: "organization",
    contactName: "Sarah Green",
    email: "sarah@greenfoods.com",
    phone: "(555) 456-7890",
    address: "321 Farm Road, Austin, TX",
    donationType: "item",
    totalContribution: 5000,
    eventsSponsored: 4,
    status: "active",
  },
  {
    id: 5,
    name: "Robert Martinez",
    type: "individual",
    contactName: "Robert Martinez",
    email: "r.martinez@email.com",
    phone: "(555) 567-8901",
    address: "654 Pine Ave, Miami, FL",
    donationType: "cash",
    totalContribution: 3500,
    eventsSponsored: 2,
    status: "inactive",
  },
];

const donationTypes = ["All", "Cash", "Item", "Service"];
const sponsorTypes = ["All", "Organization", "Individual"];

export default function Sponsors() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [donationFilter, setDonationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredSponsors = sponsors.filter((sponsor) => {
    const matchesSearch =
      sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sponsor.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sponsor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDonation =
      donationFilter === "All" ||
      sponsor.donationType.toLowerCase() === donationFilter.toLowerCase();
    const matchesType =
      typeFilter === "All" ||
      sponsor.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesDonation && matchesType;
  });

  const getDonationIcon = (type: string) => {
    switch (type) {
      case "cash":
        return <DollarSign className="h-4 w-4" />;
      case "item":
        return <Package className="h-4 w-4" />;
      case "service":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  const getDonationBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      cash: "default",
      item: "secondary",
      service: "outline",
    };
    return (
      <Badge variant={variants[type]} className="gap-1 capitalize">
        {getDonationIcon(type)}
        {type}
      </Badge>
    );
  };

  const totalContributions = sponsors.reduce((sum, s) => sum + s.totalContribution, 0);
  const activeSponsors = sponsors.filter((s) => s.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sponsors & Donations</h1>
          <p className="text-muted-foreground">Manage sponsors and their contributions</p>
        </div>
        <Button onClick={() => navigate("/admin/sponsors/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sponsor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsors.length}</div>
            <p className="text-xs text-muted-foreground">{activeSponsors} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalContributions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All-time value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sponsors.filter((s) => s.donationType === "cash").length}
            </div>
            <p className="text-xs text-muted-foreground">Sponsors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Item Donations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sponsors.filter((s) => s.donationType === "item").length}
            </div>
            <p className="text-xs text-muted-foreground">Sponsors</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sponsors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={donationFilter} onValueChange={setDonationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Donation Type" />
              </SelectTrigger>
              <SelectContent>
                {donationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sponsor Type" />
              </SelectTrigger>
              <SelectContent>
                {sponsorTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sponsors Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sponsor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Donation Type</TableHead>
                <TableHead className="text-right">Total Contribution</TableHead>
                <TableHead>Events</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSponsors.map((sponsor) => (
                <TableRow key={sponsor.id} className="cursor-pointer" onClick={() => navigate(`/admin/sponsors/${sponsor.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {sponsor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{sponsor.name}</p>
                        <p className="text-sm text-muted-foreground">{sponsor.address}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {sponsor.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {sponsor.email}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {sponsor.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getDonationBadge(sponsor.donationType)}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${sponsor.totalContribution.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{sponsor.eventsSponsored} events</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); navigate(`/admin/sponsors/${sponsor.id}`); }}>
                      <Eye className="h-4 w-4" />
                    </Button>
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
