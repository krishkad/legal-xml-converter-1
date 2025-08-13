import { Mail, FileText, Shield } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-corporate-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 mr-3 text-corporate-red" />
              <span className="text-2xl font-bold text-corporate-grey">LegalXML Pro</span>
            </div>
            <p className="text-corporate-grey-light mb-6">
              Transform legal documents into clean XML with AI-powered precision.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:support@legalxml.pro" className="text-corporate-grey-light hover:text-corporate-red transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-corporate-grey">Product</h4>
            <ul className="space-y-2 text-corporate-grey-light">
              <li><a href="#" className="hover:text-corporate-red transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">Integrations</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-corporate-grey">Support</h4>
            <ul className="space-y-2 text-corporate-grey-light">
              <li><a href="#" className="hover:text-corporate-red transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">Status Page</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-corporate-grey">Legal</h4>
            <ul className="space-y-2 text-corporate-grey-light">
              <li><a href="#" className="hover:text-corporate-red transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-corporate-red transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-corporate-border mt-12 pt-8">
          <div className="max-w-md mx-auto text-center mb-8">
            <h4 className="text-lg font-semibold text-corporate-grey mb-4">Stay Updated</h4>
            <p className="text-corporate-grey-light mb-4">Get updates on new features & compliance updates</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-corporate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-red"
              />
              <button className="bg-corporate-red hover:bg-corporate-red-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-corporate-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-corporate-grey-light mb-4 md:mb-0">
              © {currentYear} LegalXML Pro. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-corporate-grey-light">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm">SOC 2 Type II Certified</span>
              </div>
              <div className="text-sm">
                Made for legal professionals
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-corporate-red hover:bg-corporate-red-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          <Mail className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;