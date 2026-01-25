import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Upload,
  FileText,
  RefreshCw,
  Truck,
  Box,
  AlertCircle,
} from "lucide-react";
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

// Mock data
const event = {
  id: 1,
  title: "Community Cleanup Day",
  date: "Jan 15, 2026",
  time: "9:00 AM - 2:00 PM",
};

const operationsItems = [
  {
    id: 1,
    name: "Food Packets",
    category: "Food",
    plannedQty: 100,
    actualQty: 95,
    status: "Delivered",
    lead: "Sarah Johnson",
    billUploaded: true,
    escalation: false,
  },
  {
    id: 2,
    name: "Folding Tables",
    category: "Equipment",
    plannedQty: 10,
    actualQty: 10,
    status: "Delivered",
    lead: "Michael Chen",
    billUploaded: true,
    escalation: false,
  },
  {
    id: 3,
    name: "Tents",
    category: "Equipment",
    plannedQty: 4,
    actualQty: 4,
    status: "Used",
    lead: "Michael Chen",
    billUploaded: false,
    escalation: false,
  },
  {
    id: 4,
    name: "Water Bottles",
    category: "Supplies",
    plannedQty: 200,
    actualQty: 150,
    status: "Delivered",
    lead: "Sarah Johnson",
    billUploaded: true,
    escalation: true,
  },
  {
    id: 5,
    name: "Wristbands",
    category: "Supplies",
    plannedQty: 500,
    actualQty: 0,
    status: "Ordered",
    lead: "Emily Davis",
    billUploaded: false,
    escalation: true,
  },
  {
    id: 6,
    name: "First Aid Kit",
    category: "Equipment",
    plannedQty: 5,
    actualQty: 5,
    status: "Used",
    lead: "James Wilson",
    billUploaded: true,
    escalation: false,
  },
];

const statusOptions = ["Planned", "Ordered", "Delivered", "Used", "Returned"];

export default function EventOperations() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [items, setItems] = useState(operationsItems);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      Planned: "outline",
      Ordered: "secondary",
      Delivered: "default",
      Used: "default",
      Returned: "outline",
    };
    const icons: Record<string, React.ReactNode> = {
      Planned: <Clock className="h-3 w-3" />,
      Ordered: <Truck className="h-3 w-3" />,
      Delivered: <CheckCircle2 className="h-3 w-3" />,
      Used: <CheckCircle2 className="h-3 w-3" />,
      Returned: <Box className="h-3 w-3" />,
    };
    return (
      <Badge variant={variants[status]} className="gap-1">
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const toggleCheck = (itemId: number) => {
    setCheckedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const updateStatus = (itemId: number, status: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status } : item))
    );
  };

  const updateQuantity = (itemId: number, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, actualQty: qty } : item))
    );
  };

  const deliveredCount = items.filter((i) => i.status === "Delivered" || i.status === "Used").length;
  const escalationCount = items.filter((i) => i.escalation).length;
  const missingBillsCount = items.filter((i) => !i.billUploaded && (i.status === "Delivered" || i.status === "Used")).length;
  const progress = (deliveredCount / items.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/events/${id}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Event Operations</h1>
            <p className="text-muted-foreground">{event.title} • {event.date}</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Status
        </Button>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Operations Progress</CardTitle>
          <CardDescription>Track item delivery and usage status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Items Delivered/Used</span>
              <span className="font-medium">{deliveredCount} of {items.length}</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{deliveredCount} Items Ready</p>
                  <p className="text-xs text-muted-foreground">Delivered or used</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-sm font-medium">{escalationCount} Escalations</p>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{missingBillsCount} Missing Bills</p>
                  <p className="text-xs text-muted-foreground">Need upload</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Items Checklist</CardTitle>
          <CardDescription>Mark items as delivered, update quantities, upload bills</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">✓</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Planned</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bill</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const variance = item.actualQty - item.plannedQty;
                const variancePercent = ((variance / item.plannedQty) * 100).toFixed(0);
                return (
                  <TableRow key={item.id} className={item.escalation ? "bg-destructive/5" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={checkedItems.includes(item.id)}
                        onCheckedChange={() => toggleCheck(item.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.escalation && (
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.lead}</TableCell>
                    <TableCell>{item.plannedQty}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.actualQty}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${variance < 0 ? "text-destructive" : variance > 0 ? "text-primary" : "text-muted-foreground"}`}>
                        {variance > 0 ? "+" : ""}{variance} ({variancePercent}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select value={item.status} onValueChange={(v) => updateStatus(item.id, v)}>
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {item.billUploaded ? (
                        <Button variant="ghost" size="sm" className="gap-1 h-8">
                          <FileText className="h-4 w-4" />
                          View
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="gap-1 h-8">
                          <Upload className="h-4 w-4" />
                          Upload
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.escalation && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Alert
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Bulk Upload Bills
        </Button>
        <Button className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Mark Selected as Delivered
        </Button>
      </div>
    </div>
  );
}
