import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Heart } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-teal-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral-light/40 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium animate-fade-in">
              <Heart className="w-4 h-4 text-coral" />
              <span>Built for non-profits, by community builders</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Amplify Your{" "}
              <span className="text-gradient-hero">Community</span>{" "}
              Impact
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              The all-in-one platform for event management, volunteer engagement, 
              and fundraising that helps non-profits do more with less.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Start Free Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/events">
                  Browse Events
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {[
                { value: "500+", label: "Non-Profits", icon: Heart },
                { value: "10K+", label: "Volunteers", icon: Users },
                { value: "2K+", label: "Events", icon: Calendar },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="relative lg:pl-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Main card */}
              <div className="bg-card rounded-2xl shadow-elevated p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg">Community Cleanup Day</h3>
                    <p className="text-sm text-muted-foreground">Saturday, Jan 15 • 9:00 AM</p>
                  </div>
                </div>
                <div className="h-40 bg-teal-light/50 rounded-xl flex items-center justify-center">
                  <Users className="w-16 h-16 text-primary/50" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-secondary border-2 border-card"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-coral text-accent-foreground flex items-center justify-center text-xs font-medium border-2 border-card">
                      +12
                    </div>
                  </div>
                  <Button variant="coral" size="sm">
                    Join Event
                  </Button>
                </div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-soft p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-coral-light flex items-center justify-center">
                    <Heart className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">$12,450 Raised</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-soft p-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">248 New Volunteers</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
