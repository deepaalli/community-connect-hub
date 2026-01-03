import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "ImpactHub transformed how we manage our community events. We've doubled our volunteer participation in just 6 months.",
    author: "Sarah Chen",
    role: "Executive Director",
    org: "Bay Area Food Bank",
  },
  {
    quote: "The fundraising tools are incredible. We raised 40% more than our goal and the donor management is so intuitive.",
    author: "Marcus Johnson",
    role: "Development Manager",
    org: "Youth Empowerment Project",
  },
  {
    quote: "Our volunteers love the scheduling system. No more endless email chains - everything is organized in one place.",
    author: "Emily Rodriguez",
    role: "Volunteer Coordinator",
    org: "Habitat for Humanity SF",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Trusted by Community Leaders
          </h2>
          <p className="text-xl text-primary-foreground/80">
            See how organizations like yours are making a bigger impact.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-coral mb-4 opacity-80" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-coral text-coral" />
                ))}
              </div>
              
              <p className="text-primary-foreground/90 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20" />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-primary-foreground/70">
                    {testimonial.role} • {testimonial.org}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
