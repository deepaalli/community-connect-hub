import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Create Your Organization",
    description: "Set up your non-profit profile in minutes. Add your mission, team, and branding.",
    items: ["Quick setup wizard", "Custom branding", "Team invitations"],
  },
  {
    number: "02",
    title: "Launch Events & Campaigns",
    description: "Create events, volunteer opportunities, or fundraising campaigns with our easy tools.",
    items: ["Event templates", "Donation pages", "Volunteer shifts"],
  },
  {
    number: "03",
    title: "Engage Your Community",
    description: "Attract participants, manage registrations, and communicate effortlessly.",
    items: ["Email automation", "Registration forms", "Volunteer matching"],
  },
  {
    number: "04",
    title: "Measure Your Impact",
    description: "Track metrics, generate reports, and showcase your community contribution.",
    items: ["Impact dashboards", "Donor reports", "Volunteer hours"],
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gradient-coral">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Get your organization up and running in four simple steps.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex gap-8 pb-12 last:pb-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center text-primary-foreground font-serif font-bold text-xl shadow-teal">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-4" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="coral" size="xl" asChild>
            <Link to="/register">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
