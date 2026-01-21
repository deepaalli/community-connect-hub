import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ArrowLeft, Building2, CheckCircle2, Clock, Search, XCircle } from "lucide-react";

const requests = [
  {
    id: "REQ-001",
    vendorName: "Office Depot",
    offerValue: "25% off office supplies",
    status: "pending_review",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
  },
  {
    id: "REQ-002",
    vendorName: "TechForGood Foundation",
    offerValue: "Up to $5,000 technology grant",
    status: "approved",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-14",
  },
  {
    id: "REQ-003",
    vendorName: "PrintPro Services",
    offerValue: "40% off printing services",
    status: "declined",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-12",
  },
  {
    id: "REQ-004",
    vendorName: "CloudHost Inc",
    offerValue: "Free website hosting for 1 year",
    status: "submitted",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-17",
  },
];

const statusConfig: Record<string, { label: string; variant: string; icon: any }> = {
  draft: { label: "Draft", variant: "secondary", icon: Clock },
  submitted: { label: "Submitted", variant: "default", icon: Clock },
  pending_review: { label: "Pending Review", variant: "outline", icon: Clock },
  approved: { label: "Approved", variant: "default", icon: CheckCircle2 },
  declined: { label: "Declined", variant: "destructive", icon: XCircle },
};

export default function ServiceRequests() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.offerValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/marketplace")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Requests</h1>
          <p className="text-muted-foreground">Track your marketplace service requests</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Service Requests</CardTitle>
              <CardDescription>View and manage your submitted requests</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-[250px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Offer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => {
                const status = statusConfig[req.status] || statusConfig.draft;
                const StatusIcon = status.icon;
                return (
                  <TableRow
                    key={req.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/admin/marketplace/requests/${req.id}`)}
                  >
                    <TableCell className="font-medium">{req.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        {req.vendorName}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{req.offerValue}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant as any} className="flex w-fit items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{req.createdAt}</TableCell>
                    <TableCell>{req.updatedAt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">No requests found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
