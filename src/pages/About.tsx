import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Target, Users, Sparkles, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "Every decision we make prioritizes the needs of non-profits and the communities they serve.",
  },
  {
    icon: Target,
    title: "Impact Driven",
    description: "We measure success by the positive change our platform enables in communities worldwide.",
  },
  {
    icon: Users,
    title: "Inclusive Access",
    description: "Technology should empower all organizations, regardless of size or resources.",
  },
  {
    icon: Sparkles,
    title: "Innovation for Good",
    description: "We continuously innovate to solve real challenges faced by volunteer organizations.",
  },
];

const team = [
  { name: "Sarah Chen", role: "CEO & Co-Founder", image: "" },
  { name: "Marcus Johnson", role: "CTO & Co-Founder", image: "" },
  { name: "Emily Rodriguez", role: "Head of Partnerships", image: "" },
  { name: "David Kim", role: "Lead Designer", image: "" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Empowering Communities to Create Change
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                ImpactHub was born from a simple belief: technology should make it easier 
                for people to help each other.
              </p>
            </div>
          </div>
        </section>
        
        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    In 2020, during a time when communities needed each other more than ever, 
                    we watched small non-profits struggle with outdated tools and fragmented systems 
                    while trying to mobilize volunteers and resources.
                  </p>
                  <p>
                    We knew there had to be a better way. So we built ImpactHub – a platform 
                    designed specifically for the unique challenges of volunteer-driven organizations.
                  </p>
                  <p>
                    Today, we're proud to support over 500 non-profits and have helped coordinate 
                    more than 100,000 volunteer hours. But we're just getting started.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-teal-light/30 rounded-3xl flex items-center justify-center">
                  <Heart className="w-32 h-32 text-primary/30" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-elevated p-6">
                  <div className="text-4xl font-serif font-bold text-primary mb-1">500+</div>
                  <div className="text-muted-foreground">Organizations served</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Our Values
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-card p-8 rounded-2xl shadow-soft animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-teal-light flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Passionate individuals dedicated to building tools that amplify community impact.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-32 h-32 rounded-full bg-secondary mx-auto mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-gradient-coral text-accent-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Us?
            </h2>
            <p className="text-xl text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
              Whether you're a non-profit looking for better tools or a volunteer 
              ready to make a difference, we'd love to have you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
