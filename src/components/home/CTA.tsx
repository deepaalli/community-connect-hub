import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-coral-light/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-card rounded-3xl shadow-elevated p-12 md:p-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-light rounded-full text-coral text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Free for small organizations
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Amplify Your Impact?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 500+ non-profits already using ImpactHub to engage volunteers, 
            manage events, and grow their community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Free for organizations under 100 members
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
