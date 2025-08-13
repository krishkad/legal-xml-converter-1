const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "LegalXML Pro has revolutionized our document processing workflow. What used to take hours now takes minutes, with incredible accuracy.",
      author: "Sarah Chen",
      title: "Senior Partner, Chen & Associates",
      company: "BigLaw Firm"
    },
    {
      quote: "The AI's understanding of legal document structure is impressive. It maintains all the important hierarchical relationships.",
      author: "Michael Rodriguez",
      title: "Legal Operations Director",
      company: "Corporate Legal Dept."
    },
    {
      quote: "Privacy and security were our top concerns. LegalXML Pro exceeded our expectations with their SOC 2 certification.",
      author: "Dr. Emily Watson",
      title: "Chief Legal Officer",
      company: "Fortune 500 Company"
    }
  ];

  const partners = [
    "Harvard Law School",
    "Baker McKenzie",
    "Legal Tech Institute",
    "American Bar Association"
  ];

  return (
    <section className="py-20 bg-legal-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-legal-primary mb-6">
            Trusted by Legal Professionals
          </h2>
          <p className="text-xl text-legal-secondary">
            Join thousands of legal professionals who trust LegalXML Pro
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className="flex text-legal-accent mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-legal-secondary italic text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="border-t border-legal-border pt-6">
                <div className="font-semibold text-legal-primary">{testimonial.author}</div>
                <div className="text-legal-secondary text-sm">{testimonial.title}</div>
                <div className="text-legal-accent text-sm font-medium">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="text-center">
          <h3 className="text-legal-secondary text-lg mb-8">Trusted by leading legal institutions</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white px-6 py-3 rounded-lg shadow text-legal-secondary font-medium hover:shadow-lg transition-shadow duration-300"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;