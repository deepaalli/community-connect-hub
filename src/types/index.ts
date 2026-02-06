// Dashboard Types
export interface DashboardStats {
  title: string;
  value: string;
  change: string;
  icon: string;
}

export interface RecentEvent {
  name: string;
  date: string;
  attendees: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface RecentVolunteer {
  name: string;
  role: string;
  joinedDate: string;
}

export interface DashboardData {
  stats: DashboardStats[];
  recentEvents: RecentEvent[];
  recentVolunteers: RecentVolunteer[];
}

// Event Types
export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  volunteerSlots?: number;
  registeredAttendees?: number;
  volunteers?: number;
  capacity?: number;
  status: 'draft' | 'published' | 'completed' | 'cancelled' | 'upcoming';
  category: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  requirements?: string;
}

export interface EventFilters {
  search?: string;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Volunteer Types
export interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  skills: string[];
  eventsAttended: number;
  totalHours: number;
  hoursApproved?: number;
  hoursPending?: number;
  lastVolunteered: string | null;
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  joinedDate: string;
  availability: string;
  experience?: string;
  motivation?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  onboarding?: {
    waiverSigned: boolean;
    waiverDate?: string;
    trainingCompleted: boolean;
    trainingName?: string;
    backgroundCheck: 'pending' | 'cleared' | 'failed';
    backgroundCheckDate?: string;
  };
}

export interface VolunteerFilters {
  search?: string;
  status?: string;
  availability?: string;
  skill?: string;
}

// Donor Types
export interface Donor {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalDonated: number;
  donationCount: number;
  avgDonation?: number;
  lastDonation: string;
  firstDonation?: string;
  status: 'Active' | 'Inactive';
  type: 'Individual' | 'Corporate' | 'Foundation' | 'Anonymous';
  isRecurring?: boolean;
  recurringAmount?: number;
  notes?: string;
  communications?: string;
}

export interface DonorFilters {
  search?: string;
  status?: string;
  type?: string;
}

// Donation Types
export interface Donation {
  id: number;
  date: string;
  donor: string;
  donorId: number | null;
  email: string | null;
  amount: number;
  campaign: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  receiptSent: boolean;
  paymentMethod: string;
}

export interface DonationFilters {
  search?: string;
  campaign?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// Campaign Types
export interface Campaign {
  id: number;
  title: string;
  tagline: string;
  description?: string;
  status: 'active' | 'completed' | 'draft' | 'paused';
  goal: number;
  raised: number;
  donors: number;
  startDate: string;
  endDate: string;
  daysLeft: number | null;
  featured: boolean;
  whereFundsGo?: string;
  whoBenefits?: string;
  expectedOutcomes?: string;
  isPublic?: boolean;
  showGoalMeter?: boolean;
}

export interface CampaignFilters {
  status?: string;
}

// Sponsor Types
export interface Sponsor {
  id: number;
  name: string;
  type: 'organization' | 'individual';
  contactName: string;
  email: string;
  phone: string;
  address: string;
  donationType: 'cash' | 'item' | 'service';
  totalContribution: number;
  eventsSponsored: number;
  status: 'active' | 'inactive';
  notes?: string;
}

export interface SponsorFilters {
  search?: string;
  donationType?: string;
  type?: string;
}

export interface CashDonation {
  id: number;
  amount: number;
  date: string;
  event: string;
  paymentMode: string;
  receiptUploaded: boolean;
}

export interface ItemDonation {
  id: number;
  item: string;
  quantity: number;
  event: string;
  usage: string;
  value: number;
}

// Service Request Types
export interface ServiceRequest {
  id: string;
  listingId?: string;
  vendorName: string;
  offerType?: string;
  offerValue: string;
  status: 'draft' | 'submitted' | 'pending_review' | 'approved' | 'declined' | 'expired';
  createdAt: string;
  updatedAt: string;
  requestedBy?: string;
  organizationName?: string;
  description?: string;
  attachments?: { name: string; size: string }[];
  timeline?: {
    date: string | null;
    event: string;
    actor: string;
    status: 'completed' | 'current' | 'pending';
  }[];
  messages?: {
    id: string;
    sender: string;
    senderType: 'vendor' | 'organization';
    message: string;
    timestamp: string;
  }[];
}

export interface ServiceRequestFilters {
  search?: string;
  status?: string;
}

// Marketplace Types
export interface MarketplaceListing {
  id: string;
  vendorName: string;
  vendorLogo: string | null;
  offerType: 'Discount' | 'Grant' | 'Free Service' | 'Donation';
  offerValue: string;
  category: string;
  eligibility: string;
  description: string;
  expiresAt: string | null;
  featured: boolean;
}

export interface MarketplaceFilters {
  search?: string;
  category?: string;
  offerType?: string;
}

// Item Master Types
export interface Item {
  id: number;
  name: string;
  category: 'Food' | 'Equipment' | 'Supplies' | 'Other';
  description: string;
  unit: string;
  defaultQty: number;
  defaultPrice: number;
  isReusable: boolean;
  status: 'active' | 'archived';
}

export interface ItemFilters {
  search?: string;
  category?: string;
}

// Hours Approval Types
export interface PendingHours {
  id: number;
  volunteer: string;
  volunteerEmail: string;
  event: string;
  shift: string;
  date: string;
  checkIn: string;
  checkOut: string;
  calculatedHours: number;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface HoursFilters {
  event?: string;
  date?: string;
}

// Event Operations Types
export interface OperationsItem {
  id: number;
  name: string;
  category: string;
  plannedQty: number;
  actualQty: number;
  status: 'Planned' | 'Ordered' | 'Delivered' | 'Used' | 'Returned';
  lead: string;
  billUploaded: boolean;
  escalation: boolean;
}

// Event Check-in Types
export interface Attendee {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'checked-in' | 'checked-out' | 'registered' | 'no-show';
  checkInTime: string | null;
  checkOutTime?: string;
}

export interface EventCheckinInfo {
  id: number;
  title: string;
  date: string;
  time: string;
  registered: number;
  checkedIn: number;
  noShow: number;
}

// Event Lead Types
export interface EventLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  event: string;
  eventDate: string;
  managedItems: {
    name: string;
    status: string;
    qty: number;
  }[];
  status: 'active' | 'completed';
}

// Registered Volunteer Types
export interface RegisteredVolunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  registeredAt: string;
}

// Shift History Types
export interface ShiftHistory {
  id: number;
  event: string;
  date: string;
  shift: string;
  checkIn: string;
  checkOut: string;
  hours: number;
  status: 'approved' | 'pending' | 'rejected';
  role: string;
}

// Document Types
export interface Document {
  id: number;
  name: string;
  type: string;
  uploadedDate: string;
  size: string;
}

// Note Types
export interface Note {
  id: number;
  date: string;
  author: string;
  content: string;
}

// Upcoming Event Types
export interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
  role: string;
}

// Attendee Detail Types
export interface AttendeeDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  signupMethod: 'google' | 'email' | 'phone';
  registeredAt: string;
  eventsAttended: number;
  status: 'active' | 'inactive';
  linkedSponsorship?: {
    id: number;
    name: string;
    role: string;
  };
  assignedItems?: {
    id: number;
    name: string;
    event: string;
    qty: number;
    status: string;
  }[];
}

// Organization Types
export interface Organization {
  id: number;
  name: string;
  website: string;
  mission: string;
  email: string;
  phone: string;
  address: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// Settings Types
export interface NotificationSettings {
  emailNotifications: boolean;
  donationAlerts: boolean;
  eventReminders: boolean;
  weeklyReports: boolean;
}

export interface PrivacySettings {
  publicProfile: boolean;
  showVolunteerCount: boolean;
  showDonationProgress: boolean;
}

export interface Settings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

// Public Events Types
export interface PublicEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  volunteers: number;
  spots: number;
  category: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
