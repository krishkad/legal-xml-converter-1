import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "10 conversions/month",
        "Access to all features",
        "Basic email support",
        "No credit card required"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For individual professionals",
      features: [
        "Unlimited conversions",
        "Priority processing",
        "Conversion history and export",
        "24/7 support",
        "API access"
      ],
      cta: "Subscribe",
      popular: true
    },
    {
      name: "Agency", 
      price: "$49",
      period: "/month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Bulk conversion (up to 50 files at once)",
        "API access & team login",
        "CSV export & reporting",
        "Custom integrations",
        "Dedicated account manager"
      ],
      cta: "Subscribe",
      popular: false
    }
  ];

  return (
    <section id="pricing-section" className="py-20 bg-corporate-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-grey mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-corporate-grey-light max-w-3xl mx-auto">
            Choose the plan that fits your legal document processing needs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-xl p-8 transition-all duration-300 hover:scale-105 border ${
                plan.popular 
                  ? 'bg-white border-corporate-red shadow-2xl' 
                  : 'bg-white border-corporate-border shadow-lg hover:shadow-xl hover:border-corporate-red'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-corporate-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-corporate-grey">
                  {plan.name}
                </h3>
                <p className="mb-4 text-corporate-grey-light">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-corporate-grey">
                    {plan.price}
                  </span>
                  <span className="text-lg text-corporate-grey-light">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 mr-3 text-green-500" />
                    <span className="text-corporate-grey-light">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full py-3 rounded-lg font-semibold transition-all duration-300 bg-corporate-red hover:bg-corporate-red-dark text-white"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto border border-corporate-border">
            <h3 className="text-2xl font-bold text-corporate-grey mb-4">
              Cancel anytime. No hidden fees.
            </h3>
            <p className="text-corporate-grey-light">
              30-day money-back guarantee. Not satisfied? Get a full refund, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;