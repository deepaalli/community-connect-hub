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
import { Search, Filter, Building2, Gift, Percent, Tag, MapPin, Clock, ExternalLink } from "lucide-react";

const listings = [
  {
    id: "1",
    vendorName: "Office Depot",
    vendorLogo: null,
    offerType: "Discount",
    offerValue: "25% off office supplies",
    category: "Office Supplies",
    eligibility: "All registered nonprofits",
    description: "Get 25% off all office supplies including paper, pens, and organizational tools.",
    expiresAt: "2024-12-31",
    featured: true,
  },
  {
    id: "2",
    vendorName: "TechForGood Foundation",
    vendorLogo: null,
    offerType: "Grant",
    offerValue: "Up to $5,000 technology grant",
    category: "Technology",
    eligibility: "501(c)(3) organizations with budget under $500k",
    description: "Technology grants for qualifying nonprofits to upgrade their digital infrastructure.",
    expiresAt: "2024-06-30",
    featured: true,
  },
  {
    id: "3",
    vendorName: "PrintPro Services",
    vendorLogo: null,
    offerType: "Discount",
    offerValue: "40% off printing services",
    category: "Marketing",
    eligibility: "All nonprofits",
    description: "Discounted printing for brochures, flyers, banners, and event materials.",
    expiresAt: null,
    featured: false,
  },
  {
    id: "4",
    vendorName: "CloudHost Inc",
    vendorLogo: null,
    offerType: "Free Service",
    offerValue: "Free website hosting for 1 year",
    category: "Technology",
    eligibility: "New nonprofits (under 2 years old)",
    description: "Free professional website hosting including SSL certificate and 24/7 support.",
    expiresAt: "2024-09-30",
    featured: false,
  },
  {
    id: "5",
    vendorName: "Volunteer Management Co",
    vendorLogo: null,
    offerType: "Discount",
    offerValue: "50% off annual subscription",
    category: "Software",
    eligibility: "Organizations with 50+ volunteers",
    description: "Premium volunteer management software at half price for qualifying organizations.",
    expiresAt: null,
    featured: true,
  },
  {
    id: "6",
    vendorName: "Community Foundation",
    vendorLogo: null,
    offerType: "Grant",
    offerValue: "Capacity building grants up to $10,000",
    category: "Funding",
    eligibility: "Nonprofits serving underserved communities",
    description: "Grants focused on organizational capacity building and sustainability.",
    expiresAt: "2024-08-15",
    featured: false,
  },
];

const categories = ["All", "Office Supplies", "Technology", "Marketing", "Software", "Funding"];
const offerTypes = ["All", "Discount", "Grant", "Free Service", "Donation"];

export default function MarketplaceListings() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [offerTypeFilter, setOfferTypeFilter] = useState("All");

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.offerValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || listing.category === categoryFilter;
    const matchesOfferType = offerTypeFilter === "All" || listing.offerType === offerTypeFilter;
    return matchesSearch && matchesCategory && matchesOfferType;
  });

  const featuredListings = filteredListings.filter((l) => l.featured);
  const regularListings = filteredListings.filter((l) => !l.featured);

  const getOfferTypeIcon = (type: string) => {
    switch (type) {
      case "Discount":
        return <Percent className="h-4 w-4" />;
      case "Grant":
        return <Gift className="h-4 w-4" />;
      case "Free Service":
        return <Tag className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const getOfferTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Discount":
        return "secondary";
      case "Grant":
        return "default";
      case "Free Service":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">
            Discover special offers, grants, and services for nonprofits
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/marketplace/requests")}>
          My Requests
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search vendors, offers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={offerTypeFilter} onValueChange={setOfferTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Offer Type" />
                </SelectTrigger>
                <SelectContent>
                  {offerTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-yellow-500">★</span> Featured Offers
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="border-2 border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{listing.vendorName}</CardTitle>
                        <Badge variant={getOfferTypeBadgeVariant(listing.offerType) as any} className="mt-1">
                          {getOfferTypeIcon(listing.offerType)}
                          <span className="ml-1">{listing.offerType}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-semibold text-primary">{listing.offerValue}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    <span>{listing.category}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Eligibility:</strong> {listing.eligibility}
                  </div>
                  {listing.expiresAt && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Expires: {listing.expiresAt}</span>
                    </div>
                  )}
                  <Button className="w-full" onClick={() => navigate(`/admin/marketplace/request/new?listing=${listing.id}`)}>
                    Request Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Listings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Offers ({regularListings.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {regularListings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{listing.vendorName}</CardTitle>
                      <Badge variant={getOfferTypeBadgeVariant(listing.offerType) as any} className="mt-1">
                        {getOfferTypeIcon(listing.offerType)}
                        <span className="ml-1">{listing.offerType}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-semibold">{listing.offerValue}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Tag className="h-3 w-3" />
                  <span>{listing.category}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <strong>Eligibility:</strong> {listing.eligibility}
                </div>
                {listing.expiresAt && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Expires: {listing.expiresAt}</span>
                  </div>
                )}
                <Button variant="outline" className="w-full" onClick={() => navigate(`/admin/marketplace/request/new?listing=${listing.id}`)}>
                  Request Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredListings.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No listings found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
