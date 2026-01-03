import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Users, Award, Clock, ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Make Real Impact",
    description: "Your time directly helps communities in need",
  },
  {
    icon: Users,
    title: "Build Connections",
    description: "Meet like-minded people passionate about change",
  },
  {
    icon: Award,
    title: "Earn Recognition",
    description: "Track hours and receive certificates for your service",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Choose opportunities that fit your availability",
  },
];

const interests = [
  "Environment & Conservation",
  "Education & Youth",
  "Hunger Relief",
  "Housing & Shelter",
  "Health & Wellness",
  "Animal Welfare",
  "Arts & Culture",
  "Seniors & Elderly",
];

const Volunteer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 bg-gradient-warm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral-light/30 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Become a <span className="text-gradient-coral">Volunteer</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join our community of changemakers. Whether you have an hour or a day, 
                your contribution makes a lasting difference.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>10,000+ active volunteers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>500+ partner organizations</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-center text-foreground mb-12">
              Why Volunteer With Us?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-teal-light flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Registration Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Register as a Volunteer
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll match you with perfect opportunities.
                </p>
              </div>
              
              <form className="bg-card rounded-2xl shadow-elevated p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">City / Location</Label>
                  <Input id="location" placeholder="San Francisco, CA" />
                </div>
                
                <div className="space-y-4">
                  <Label>Areas of Interest</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox id={interest} />
                        <label
                          htmlFor={interest}
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Why do you want to volunteer? (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your motivation and any relevant experience..."
                    rows={4}
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    I agree to the Terms of Service and Privacy Policy, and consent to 
                    receive communications about volunteer opportunities.
                  </label>
                </div>
                
                <Button variant="hero" size="xl" className="w-full">
                  Submit Application
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Volunteer;
