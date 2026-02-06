import {
  Attendee,
  AttendeeDetail,
  Campaign,
  CashDonation,
  DashboardData,
  Donation,
  Donor,
  Event,
  EventCheckinInfo,
  EventFilters,
  EventLead,
  Item,
  ItemDonation,
  MarketplaceFilters,
  MarketplaceListing,
  PendingHours,
  PublicEvent,
  RegisteredVolunteer,
  ServiceRequest,
  ServiceRequestFilters,
  Sponsor,
  Volunteer,
  VolunteerFilters,
  DonationFilters,
  DonorFilters,
  CampaignFilters,
  ItemFilters,
  HoursFilters,
  OperationsItem,
} from '@/types';
import {
  attendees,
  attendeeDetail,
  campaigns,
  campaignDonations,
  campaignDonors,
  cashDonations,
  dashboardData,
  donationHistory,
  donations,
  donationTiers,
  eventCheckinInfo,
  eventDetail,
  eventHistory,
  eventLeads,
  events,
  eventsFilterOptions,
  items,
  itemDonations,
  listings,
  notes,
  operationsItems,
  operationsStatusOptions,
  organization,
  pendingHours,
  publicEvents,
  recentCheckins,
  registeredVolunteers,
  serviceRequestDetail,
  serviceRequests,
  settings,
  shiftHistory,
  sponsors,
  upcomingEvents,
  volunteers,
  documents,
} from '@/mocks/data';
import { apiGet, apiPost, apiPut } from '@/lib/api';

const defaultPageParams = '?page=1&pageSize=50';

// Dashboard
export const fetchDashboard = () => apiGet<DashboardData>('/dashboard', dashboardData);

// Events
export const fetchEvents = (_filters?: EventFilters) => apiGet<Event[]>(`/events${defaultPageParams}`, events);
export const fetchEvent = (id: number) => apiGet<Event>(`/events/${id}`, eventDetail);

// Volunteers
export const fetchVolunteers = (_filters?: VolunteerFilters) => apiGet<Volunteer[]>(`/volunteers${defaultPageParams}`, volunteers);
export const fetchVolunteer = (id: number) => apiGet<Volunteer>(`/volunteers/${id}`, volunteers[0]);

// Donors
export const fetchDonors = (_filters?: DonorFilters) => apiGet<Donor[]>(`/donors${defaultPageParams}`, donors);
export const fetchDonor = (id: number) => apiGet<Donor>(`/donors/${id}`, donors[0]);
export const fetchDonorHistory = (id: number) => apiGet<typeof donationHistory>(`/donors/${id}/history`, donationHistory);

// Donations
export const fetchDonations = (_filters?: DonationFilters) => apiGet<Donation[]>(`/donations${defaultPageParams}`, donations);
export const sendReceipt = (id: number) => apiPost(`/donations/${id}/receipt`, {}, { success: true } as any);
export const refundDonation = (id: number) => apiPost(`/donations/${id}/refund`, {}, { success: true } as any);

// Campaigns
export const fetchCampaigns = (_filters?: CampaignFilters) => apiGet<Campaign[]>(`/campaigns${defaultPageParams}`, campaigns);
export const fetchCampaign = (id: number) => apiGet<Campaign>(`/campaigns/${id}`, campaigns[0]);
export const fetchCampaignDonations = (id: number) => apiGet<typeof campaignDonations>(`/campaigns/${id}/donations`, campaignDonations);
export const fetchCampaignDonors = (id: number) => apiGet<typeof campaignDonors>(`/campaigns/${id}/donors`, campaignDonors);
export const fetchDonationTiers = () => apiGet<typeof donationTiers>('/campaigns/tiers', donationTiers);

// Sponsors
export const fetchSponsors = () => apiGet<Sponsor[]>(`/sponsors${defaultPageParams}`, sponsors);
export const fetchSponsor = (id: number) => apiGet<Sponsor>(`/sponsors/${id}`, sponsors[0]);
export const fetchCashDonations = (sponsorId: number) => apiGet<CashDonation[]>(`/sponsors/${sponsorId}/cash-donations`, cashDonations);
export const fetchItemDonations = (sponsorId: number) => apiGet<ItemDonation[]>(`/sponsors/${sponsorId}/item-donations`, itemDonations);

// Marketplace
export const fetchMarketplaceListings = (_filters?: MarketplaceFilters) => apiGet<MarketplaceListing[]>(`/marketplace/listings${defaultPageParams}`, listings);
export const fetchMarketplaceListing = (id: string) => apiGet<MarketplaceListing>(`/marketplace/listings/${id}`, listings[0]);

// Service Requests
export const fetchServiceRequests = (_filters?: ServiceRequestFilters) => apiGet<ServiceRequest[]>(`/marketplace/requests${defaultPageParams}`, serviceRequests);
export const fetchServiceRequest = (id: string) => apiGet<ServiceRequest>(`/marketplace/requests/${id}`, serviceRequestDetail);

// Items
export const fetchItems = (_filters?: ItemFilters) => apiGet<Item[]>(`/items${defaultPageParams}`, items);
export const fetchItem = (id: number) => apiGet<Item>(`/items/${id}`, items[0]);

// Hours approval
export const fetchPendingHours = (_filters?: HoursFilters) => apiGet<PendingHours[]>(`/hours/pending${defaultPageParams}`, pendingHours);

// Operations
export const fetchOperations = (eventId: number) => apiGet<OperationsItem[]>(`/events/${eventId}/operations`, operationsItems);

// Event check-in
export const fetchEventCheckinInfo = (eventId: number) => apiGet<EventCheckinInfo>(`/events/${eventId}/checkin`, eventCheckinInfo);
export const fetchAttendees = (eventId: number) => apiGet<Attendee[]>(`/events/${eventId}/attendees`, attendees);
export const fetchRecentCheckins = (eventId: number) => apiGet<typeof recentCheckins>(`/events/${eventId}/recent-checkins`, recentCheckins);

// Event leads
export const fetchEventLeads = () => apiGet<EventLead[]>(`/events/leads${defaultPageParams}`, eventLeads);

// Event detail volunteers/items
export const fetchRegisteredVolunteers = (eventId: number) => apiGet<RegisteredVolunteer[]>(`/events/${eventId}/volunteers`, registeredVolunteers);
export const fetchEventItems = (eventId: number) => apiGet<OperationsItem[]>(`/events/${eventId}/items`, operationsItems);

// Volunteer detail
export const fetchVolunteerShiftHistory = (id: number) => apiGet<typeof shiftHistory>(`/volunteers/${id}/shifts`, shiftHistory);
export const fetchVolunteerDocuments = (id: number) => apiGet<typeof documents>(`/volunteers/${id}/documents`, documents);
export const fetchVolunteerNotes = (id: number) => apiGet<typeof notes>(`/volunteers/${id}/notes`, notes);
export const fetchVolunteerUpcomingEvents = (id: number) => apiGet<typeof upcomingEvents>(`/volunteers/${id}/upcoming-events`, upcomingEvents);

// Attendee detail
export const fetchAttendeeDetail = (id: number) => apiGet<AttendeeDetail>(`/attendees/${id}`, attendeeDetail);
export const fetchAttendeeEventHistory = (id: number) => apiGet<typeof eventHistory>(`/attendees/${id}/events`, eventHistory);

// Organization and settings
export const fetchOrganization = () => apiGet('/organization', organization);
export const fetchSettings = () => apiGet('/settings', settings);

// Public events
export const fetchPublicEvents = () => apiGet<PublicEvent[]>(`/public/events${defaultPageParams}`, publicEvents);

// Generic update functions (optimistic; use fallback passthrough)
export const updateOrganization = (payload: any) => apiPut('/organization', payload, organization);
export const updateSettings = (payload: any) => apiPut('/settings', payload, settings);

// Exports for options
export const fetchEventFilters = () => Promise.resolve(eventsFilterOptions);
export const fetchOperationStatusOptions = () => Promise.resolve(operationsStatusOptions);
