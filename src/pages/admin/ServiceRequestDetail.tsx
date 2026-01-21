import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Paperclip,
  Send,
  User,
  XCircle,
} from "lucide-react";

const requestData = {
  id: "REQ-001",
  listingId: "1",
  vendorName: "Office Depot",
  offerType: "Discount",
  offerValue: "25% off office supplies",
  status: "pending_review",
  createdAt: "2024-01-15",
  updatedAt: "2024-01-16",
  requestedBy: "John Smith",
  organizationName: "Community Helpers Inc",
  description: "We are requesting this discount to purchase supplies for our upcoming community outreach program. We expect to serve 500+ community members and need various office supplies for documentation and event coordination.",
  attachments: [
    { name: "501c3_certificate.pdf", size: "245 KB" },
    { name: "organization_budget.xlsx", size: "128 KB" },
  ],
  timeline: [
    { date: "2024-01-15 10:30 AM", event: "Request submitted", actor: "John Smith", status: "completed" },
    { date: "2024-01-15 02:15 PM", event: "Request received by vendor", actor: "System", status: "completed" },
    { date: "2024-01-16 09:00 AM", event: "Under review", actor: "Office Depot", status: "current" },
    { date: null, event: "Vendor decision", actor: "Office Depot", status: "pending" },
    { date: null, event: "Offer activated", actor: "System", status: "pending" },
  ],
  messages: [
    {
      id: "1",
      sender: "Office Depot",
      senderType: "vendor",
      message: "Thank you for your request. We are reviewing your organization's eligibility. Could you provide more details about the expected order size?",
      timestamp: "2024-01-16 09:30 AM",
    },
    {
      id: "2",
      sender: "John Smith",
      senderType: "organization",
      message: "We expect to order approximately $2,000 worth of supplies including paper, folders, pens, and presentation materials for our Q1 outreach events.",
      timestamp: "2024-01-16 10:15 AM",
    },
  ],
};

const statusConfig: Record<string, { label: string; variant: string; icon: any }> = {
  draft: { label: "Draft", variant: "secondary", icon: Circle },
  submitted: { label: "Submitted", variant: "default", icon: Clock },
  pending_review: { label: "Pending Review", variant: "outline", icon: Clock },
  approved: { label: "Approved", variant: "default", icon: CheckCircle2 },
  declined: { label: "Declined", variant: "destructive", icon: XCircle },
  expired: { label: "Expired", variant: "secondary", icon: XCircle },
};

export default function ServiceRequestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");

  const status = statusConfig[requestData.status] || statusConfig.draft;
  const StatusIcon = status.icon;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Would send message to API
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/marketplace/requests")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Request {requestData.id}</h1>
            <Badge variant={status.variant as any} className="flex items-center gap-1">
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {requestData.offerValue} from {requestData.vendorName}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Details */}
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{requestData.vendorName}</h3>
                  <p className="text-primary font-medium">{requestData.offerValue}</p>
                  <Badge variant="secondary" className="mt-1">{requestData.offerType}</Badge>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Request Description</h4>
                <p className="text-muted-foreground">{requestData.description}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Attachments</h4>
                <div className="space-y-2">
                  {requestData.attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messaging Thread */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages
              </CardTitle>
              <CardDescription>Communication with the vendor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {requestData.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.senderType === "organization" ? "flex-row-reverse" : ""}`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      {msg.senderType === "vendor" ? (
                        <Building2 className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.senderType === "organization"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <span className="font-medium text-sm">{msg.sender}</span>
                        <span className={`text-xs ${msg.senderType === "organization" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4">
                {requestData.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          item.status === "completed"
                            ? "bg-primary text-primary-foreground"
                            : item.status === "current"
                            ? "bg-primary/20 text-primary border-2 border-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : item.status === "current" ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      {idx < requestData.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-full min-h-[24px] ${
                            item.status === "completed" ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className={`font-medium ${item.status === "pending" ? "text-muted-foreground" : ""}`}>
                        {item.event}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.actor}</p>
                      {item.date && <p className="text-xs text-muted-foreground">{item.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Request Info */}
          <Card>
            <CardHeader>
              <CardTitle>Request Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Requested by</p>
                  <p className="font-medium">{requestData.requestedBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-medium">{requestData.organizationName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium">{requestData.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{requestData.updatedAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Actions (for vendor view) */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Vendor decision actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve Request
              </Button>
              <Button className="w-full" variant="outline">
                <XCircle className="mr-2 h-4 w-4" />
                Decline Request
              </Button>
              <Separator />
              <Button variant="ghost" className="w-full" onClick={() => navigate("/admin/marketplace")}>
                Back to Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
