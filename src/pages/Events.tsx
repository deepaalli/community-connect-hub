import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Search, Filter, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

const events = [
  {
    id: 1,
    title: "Community Cleanup Day",
    date: "Jan 15, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "Golden Gate Park, SF",
    volunteers: 45,
    spots: 60,
    category: "Environment",
  },
  {
    id: 2,
    title: "Youth Mentorship Workshop",
    date: "Jan 22, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Community Center, Oakland",
    volunteers: 12,
    spots: 20,
    category: "Education",
  },
  {
    id: 3,
    title: "Food Bank Distribution",
    date: "Jan 25, 2025",
    time: "8:00 AM - 12:00 PM",
    location: "SF Food Bank",
    volunteers: 28,
    spots: 35,
    category: "Hunger Relief",
  },
  {
    id: 4,
    title: "Senior Tech Help Day",
    date: "Feb 1, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Public Library, Berkeley",
    volunteers: 8,
    spots: 15,
    category: "Community",
  },
  {
    id: 5,
    title: "Habitat Build Day",
    date: "Feb 8, 2025",
    time: "7:00 AM - 4:00 PM",
    location: "Daly City",
    volunteers: 20,
    spots: 25,
    category: "Housing",
  },
  {
    id: 6,
    title: "Beach Restoration Project",
    date: "Feb 15, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "Ocean Beach, SF",
    volunteers: 32,
    spots: 50,
    category: "Environment",
  },
];

const categories = ["All", "Environment", "Education", "Hunger Relief", "Community", "Housing"];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="bg-gradient-hero text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Upcoming Events
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Find volunteer opportunities and community events near you. 
              Every action makes a difference.
            </p>
          </div>
        </section>
        
        {/* Filters */}
        <section className="py-8 border-b border-border bg-card sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 bg-background"
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "secondary"}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Event Image Placeholder */}
                  <div className="h-40 bg-teal-light/50 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-primary/40" />
                  </div>
                  
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full mb-3">
                      {event.category}
                    </span>
                    
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-foreground font-medium">{event.volunteers}</span>
                        <span className="text-muted-foreground">/ {event.spots} spots</span>
                      </div>
                      <Button variant="coral" size="sm">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Events
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
