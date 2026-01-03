import { Link } from "react-router-dom";
import { Sparkles, Heart, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-coral flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">ImpactHub</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Empowering non-profits with modern tools to amplify their community impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Platform</h4>
            <ul className="space-y-3">
              {["Events", "Volunteer", "Fundraising", "Organizations"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-background/70 hover:text-coral transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {["Help Center", "Blog", "Community", "API Docs"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-background/70 hover:text-coral transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Mail className="w-4 h-4" />
                hello@impacthub.org
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © 2025 ImpactHub. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-background/60 text-sm">
            Made with <Heart className="w-4 h-4 text-coral fill-coral" /> for communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
