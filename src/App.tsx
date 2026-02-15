import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Volunteer from "./pages/Volunteer";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminEvents from "./pages/admin/Events";
import AdminVolunteers from "./pages/admin/Volunteers";
import AdminFundraising from "./pages/admin/Fundraising";
import AdminOrganization from "./pages/admin/Organization";
import AdminSettings from "./pages/admin/Settings";
import EventForm from "./pages/admin/EventForm";
import EventDetail from "./pages/admin/EventDetail";
import EventCheckin from "./pages/admin/EventCheckin";
import EventOperations from "./pages/admin/EventOperations";
import VolunteerForm from "./pages/admin/VolunteerForm";
import VolunteerDetail from "./pages/admin/VolunteerDetail";
import CampaignForm from "./pages/admin/CampaignForm";
import Campaigns from "./pages/admin/Campaigns";
import CampaignDetail from "./pages/admin/CampaignDetail";
import Donations from "./pages/admin/Donations";
import HoursApproval from "./pages/admin/HoursApproval";
import AdminDonors from "./pages/admin/Donors";
import DonorDetail from "./pages/admin/DonorDetail";
import DonorForm from "./pages/admin/DonorForm";
import MarketplaceListings from "./pages/admin/MarketplaceListings";
import ServiceRequests from "./pages/admin/ServiceRequests";
import ServiceRequestDetail from "./pages/admin/ServiceRequestDetail";
import ItemMaster from "./pages/admin/ItemMaster";
import Sponsors from "./pages/admin/Sponsors";
import SponsorDetail from "./pages/admin/SponsorDetail";
import SponsorForm from "./pages/admin/SponsorForm";
import EventLeads from "./pages/admin/EventLeads";
import AttendeeDetail from "./pages/admin/AttendeeDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/about" element={<About />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="events/new" element={<EventForm />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="events/:id/edit" element={<EventForm />} />
            <Route path="events/:id/checkin" element={<EventCheckin />} />
            <Route path="events/:id/operations" element={<EventOperations />} />
            <Route path="events/leads" element={<EventLeads />} />
            <Route path="volunteers" element={<AdminVolunteers />} />
            <Route path="volunteers/new" element={<VolunteerForm />} />
            <Route path="volunteers/:id" element={<VolunteerDetail />} />
            <Route path="volunteers/:id/edit" element={<VolunteerForm />} />
            <Route path="attendees/:id" element={<AttendeeDetail />} />
            <Route path="hours-approval" element={<HoursApproval />} />
            <Route path="fundraising" element={<AdminFundraising />} />
            <Route path="fundraising/campaigns" element={<Campaigns />} />
            <Route path="fundraising/campaigns/new" element={<CampaignForm />} />
            <Route path="fundraising/campaigns/:id" element={<CampaignDetail />} />
            <Route path="fundraising/campaigns/:id/edit" element={<CampaignForm />} />
            <Route path="fundraising/donations" element={<Donations />} />
            <Route path="donors" element={<AdminDonors />} />
            <Route path="donors/new" element={<DonorForm />} />
            <Route path="donors/:id" element={<DonorDetail />} />
            <Route path="donors/:id/edit" element={<DonorForm />} />
            <Route path="sponsors" element={<Sponsors />} />
            <Route path="sponsors/new" element={<SponsorForm />} />
            <Route path="sponsors/:id" element={<SponsorDetail />} />
            <Route path="sponsors/:id/edit" element={<SponsorForm />} />
            <Route path="items" element={<ItemMaster />} />
            <Route path="marketplace" element={<MarketplaceListings />} />
            <Route path="marketplace/requests" element={<ServiceRequests />} />
            <Route path="marketplace/requests/:id" element={<ServiceRequestDetail />} />
            <Route path="organization" element={<AdminOrganization />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE -1*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
