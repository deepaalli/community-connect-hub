import { Calendar, Users, Heart, Zap, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    description: "Create, manage, and promote events with built-in registration, ticketing, and attendee tracking.",
    color: "bg-teal-light text-primary",
  },
  {
    icon: Users,
    title: "Volunteer Coordination",
    description: "Recruit, schedule, and communicate with volunteers effortlessly through our intuitive platform.",
    color: "bg-coral-light text-coral",
  },
  {
    icon: Heart,
    title: "Fundraising Tools",
    description: "Launch campaigns, accept donations, and track progress with transparent reporting.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Save time with automated reminders, thank-you emails, and volunteer hour tracking.",
    color: "bg-teal-light text-primary",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security to protect your community's data and donations.",
    color: "bg-coral-light text-coral",
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description: "Measure and showcase your organization's community impact with beautiful reports.",
    color: "bg-secondary text-secondary-foreground",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-gradient-hero">Make a Difference</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful tools designed specifically for non-profits and volunteer organizations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
