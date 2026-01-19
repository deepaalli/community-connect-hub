import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Eye, Pencil, Trash2, DollarSign, Users, TrendingUp, Heart } from "lucide-react";

const donors = [
  {
    id: 1,
    name: "John Davidson",
    email: "john.davidson@email.com",
    phone: "(555) 123-4567",
    totalDonated: 2500,
    donationCount: 8,
    lastDonation: "2024-01-15",
    status: "Active",
    type: "Individual",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    email: "sarah.m@email.com",
    phone: "(555) 234-5678",
    totalDonated: 5000,
    donationCount: 12,
    lastDonation: "2024-01-18",
    status: "Active",
    type: "Individual",
  },
  {
    id: 3,
    name: "Tech Solutions Inc.",
    email: "giving@techsolutions.com",
    phone: "(555) 345-6789",
    totalDonated: 15000,
    donationCount: 4,
    lastDonation: "2024-01-10",
    status: "Active",
    type: "Corporate",
  },
  {
    id: 4,
    name: "Anonymous Donor",
    email: "private@email.com",
    phone: "",
    totalDonated: 1000,
    donationCount: 2,
    lastDonation: "2024-01-05",
    status: "Active",
    type: "Anonymous",
  },
  {
    id: 5,
    name: "Community Foundation",
    email: "grants@communityfdn.org",
    phone: "(555) 456-7890",
    totalDonated: 25000,
    donationCount: 3,
    lastDonation: "2023-12-20",
    status: "Inactive",
    type: "Foundation",
  },
];

export default function AdminDonors() {
  const navigate = useNavigate();
  const totalDonors = donors.length;
  const totalDonated = donors.reduce((sum, d) => sum + d.totalDonated, 0);
  const activeDonors = donors.filter(d => d.status === "Active").length;
  const avgDonation = Math.round(totalDonated / donors.reduce((sum, d) => sum + d.donationCount, 0));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Individual":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Corporate":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Foundation":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "Anonymous":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Donors</h1>
          <p className="text-muted-foreground">Manage your donor relationships</p>
        </div>
        <Button onClick={() => navigate("/admin/donors/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Donor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalDonors}</div>
            <p className="text-xs text-muted-foreground">{activeDonors} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalDonated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime contributions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Donation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${avgDonation}</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recurring Donors</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground">Monthly contributors</p>
          </CardContent>
        </Card>
      </div>

      {/* Donors Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Donors</CardTitle>
              <CardDescription>View and manage donor information</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search donors..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Total Donated</TableHead>
                <TableHead>Donations</TableHead>
                <TableHead>Last Donation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium">{donor.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getTypeColor(donor.type)}>
                      {donor.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{donor.email}</div>
                    <div className="text-xs text-muted-foreground">{donor.phone}</div>
                  </TableCell>
                  <TableCell className="font-medium">${donor.totalDonated.toLocaleString()}</TableCell>
                  <TableCell>{donor.donationCount}</TableCell>
                  <TableCell>{new Date(donor.lastDonation).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(donor.status)}>
                      {donor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem onClick={() => navigate(`/admin/donors/${donor.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/donors/${donor.id}/edit`)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
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
