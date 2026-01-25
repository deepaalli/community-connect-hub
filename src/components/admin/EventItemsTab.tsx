import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Package,
  Edit,
  Trash2,
  Upload,
  FileText,
  Heart,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
} from "lucide-react";

// Mock data
const eventItems = [
  {
    id: 1,
    item: "Food Packets",
    category: "Food",
    requiredQty: 100,
    actualQty: 95,
    requiredDate: "Jan 15, 2026",
    requiredTime: "8:00 AM",
    dropoffLocation: "Main Gate",
    assignedLead: "Sarah Johnson",
    estimatedCost: 500,
    actualCost: 475,
    status: "Delivered",
    isSponsoredItem: true,
    sponsor: "Green Foods Co",
    billUploaded: true,
    notes: "Vegetarian options included",
  },
  {
    id: 2,
    item: "Folding Tables",
    category: "Equipment",
    requiredQty: 10,
    actualQty: 10,
    requiredDate: "Jan 14, 2026",
    requiredTime: "6:00 PM",
    dropoffLocation: "Registration Area",
    assignedLead: "Michael Chen",
    estimatedCost: 200,
    actualCost: 200,
    status: "Delivered",
    isSponsoredItem: false,
    sponsor: null,
    billUploaded: true,
    notes: "",
  },
  {
    id: 3,
    item: "Wristbands",
    category: "Supplies",
    requiredQty: 500,
    actualQty: 0,
    requiredDate: "Jan 15, 2026",
    requiredTime: "7:00 AM",
    dropoffLocation: "Check-in Booth",
    assignedLead: "Emily Davis",
    estimatedCost: 125,
    actualCost: 0,
    status: "Ordered",
    isSponsoredItem: true,
    sponsor: "ABC Corporation",
    billUploaded: false,
    notes: "500 blue, event branded",
  },
  {
    id: 4,
    item: "First Aid Kit",
    category: "Equipment",
    requiredQty: 5,
    actualQty: 5,
    requiredDate: "Jan 15, 2026",
    requiredTime: "8:00 AM",
    dropoffLocation: "Medical Tent",
    assignedLead: "James Wilson",
    estimatedCost: 125,
    actualCost: 125,
    status: "Used",
    isSponsoredItem: false,
    sponsor: null,
    billUploaded: true,
    notes: "",
  },
];

const itemMasterOptions = [
  { id: 1, name: "Food Packets", category: "Food", unit: "packets" },
  { id: 2, name: "Folding Tables", category: "Equipment", unit: "pieces" },
  { id: 3, name: "Wristbands", category: "Supplies", unit: "pieces" },
  { id: 4, name: "Water Bottles", category: "Supplies", unit: "pieces" },
  { id: 5, name: "Tents", category: "Equipment", unit: "pieces" },
];

const leads = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Michael Chen" },
  { id: 3, name: "Emily Davis" },
  { id: 4, name: "James Wilson" },
];

export function EventItemsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; icon: React.ReactNode }> = {
      Planned: { variant: "outline", icon: <Clock className="h-3 w-3" /> },
      Ordered: { variant: "secondary", icon: <Truck className="h-3 w-3" /> },
      Delivered: { variant: "default", icon: <CheckCircle2 className="h-3 w-3" /> },
      Used: { variant: "default", icon: <CheckCircle2 className="h-3 w-3" /> },
      Returned: { variant: "outline", icon: <Package className="h-3 w-3" /> },
    };
    const { variant, icon } = config[status] || { variant: "outline", icon: null };
    return (
      <Badge variant={variant} className="gap-1">
        {icon}
        {status}
      </Badge>
    );
  };

  const totalEstimated = eventItems.reduce((sum, i) => sum + i.estimatedCost, 0);
  const totalActual = eventItems.reduce((sum, i) => sum + i.actualCost, 0);
  const sponsoredItems = eventItems.filter((i) => i.isSponsoredItem).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEstimated.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actual Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActual.toLocaleString()}</div>
            <p className={`text-xs ${totalActual <= totalEstimated ? "text-primary" : "text-destructive"}`}>
              {totalActual <= totalEstimated ? "Under budget" : "Over budget"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsored Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsoredItems}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Item Dialog */}
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Event Item</DialogTitle>
              <DialogDescription>
                Attach an item from the master list to this event.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Item *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemMasterOptions.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name} ({item.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Required Quantity *</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Required Date *</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>Required Time *</Label>
                  <Input type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Drop-off Location</Label>
                <Input placeholder="e.g., Main Gate, Registration Area" />
              </div>
              <div className="grid gap-2">
                <Label>Assigned Lead</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {leads.map((lead) => (
                      <SelectItem key={lead.id} value={lead.id.toString()}>
                        {lead.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Estimated Cost ($)</Label>
                  <Input type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select defaultValue="Planned">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="Ordered">Ordered</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                      <SelectItem value="Returned">Returned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Notes</Label>
                <Textarea placeholder="Additional notes..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Event Items</CardTitle>
          <CardDescription>All items attached to this event</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Drop-off</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Cost (Est/Act)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bill</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventItems.map((item) => {
                const variance = item.actualQty - item.requiredQty;
                const hasVariance = item.actualQty > 0 && variance !== 0;
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium text-foreground">{item.item}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                        {item.isSponsoredItem && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <Heart className="h-3 w-3" />
                            {item.sponsor}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{item.requiredQty}</p>
                        <p className="text-xs text-muted-foreground">{item.requiredDate} {item.requiredTime}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{item.actualQty}</span>
                        {hasVariance && (
                          <span className={`text-xs ${variance < 0 ? "text-destructive" : "text-primary"}`}>
                            ({variance > 0 ? "+" : ""}{variance})
                          </span>
                        )}
                        {variance < 0 && <AlertTriangle className="h-3 w-3 text-destructive" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.dropoffLocation}</TableCell>
                    <TableCell className="text-muted-foreground">{item.assignedLead}</TableCell>
                    <TableCell>
                      <div>
                        <p>${item.estimatedCost} / ${item.actualCost}</p>
                        {item.actualCost > item.estimatedCost && (
                          <p className="text-xs text-destructive">+${item.actualCost - item.estimatedCost}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      {item.billUploaded ? (
                        <Button variant="ghost" size="sm" className="gap-1 h-7">
                          <FileText className="h-3 w-3" />
                          View
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="gap-1 h-7">
                          <Upload className="h-3 w-3" />
                          Upload
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
