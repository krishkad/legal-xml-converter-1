import { Search, Shield, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Search,
      title: "Accurate AI OCR & Legal Parsing",
      description: "Advanced AI detects document structure, legal terminology, and hierarchical relationships with 99.7% accuracy."
    },
    {
      icon: Shield,
      title: "End-to-End Encrypted & Compliant",
      description: "All data is encrypted and processed securely. SOC 2 Type II certified with zero data retention policy."
    },
    {
      icon: Users,
      title: "Fast Turnaround with Clean XML Output",
      description: "Get structured, properly formatted XML documents ready for your legal systems and workflows."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-grey mb-6">
            Built for Legal Professionals
          </h2>
          <p className="text-xl text-corporate-grey-light max-w-3xl mx-auto">
            Purpose-built for the demanding requirements of legal document processing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-corporate-red rounded-xl flex items-center justify-center mx-auto mb-8 group-hover:bg-corporate-red-dark transition-colors duration-300">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-corporate-grey mb-4">
                {feature.title}
              </h3>
              <p className="text-corporate-grey-light leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-20 text-center">
          <div className="bg-corporate-muted rounded-xl p-8 max-w-2xl mx-auto border border-corporate-border">
            <h3 className="text-2xl font-bold text-corporate-grey mb-4">
              Trusted by 120+ Legal Teams
            </h3>
            <p className="text-corporate-grey-light">
              Join law firms, courts, and legal tech providers who trust our AI-powered document conversion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;