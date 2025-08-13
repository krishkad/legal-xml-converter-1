import { FileText, Edit, FileCheck, Clipboard } from "lucide-react";

const AcceptedFormatsSection = () => {
  const formats = [
    {
      icon: FileText,
      title: "Scanned Legal Notices",
      description: "PDF and image scans of official notices"
    },
    {
      icon: Edit,
      title: "Handwritten Affidavits",
      description: "Handwritten legal statements and declarations"
    },
    {
      icon: FileCheck,
      title: "Typed Agreements",
      description: "Contracts and agreements in PDF/JPG/PNG"
    },
    {
      icon: Clipboard,
      title: "Signed Contracts",
      description: "Standard legal forms and documents"
    }
  ];

  return (
    <section className="py-20 bg-corporate-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-corporate-grey mb-6">
            We Support Common Legal Document Types
          </h2>
          <p className="text-xl text-corporate-grey-light max-w-3xl mx-auto">
            Convert all major legal document formats into clean XML effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {formats.map((format, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group border border-corporate-border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-corporate-red rounded-xl flex items-center justify-center mb-6 group-hover:bg-corporate-red-dark transition-colors duration-300">
                  <format.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-corporate-grey mb-3">
                  {format.title}
                </h3>
                <p className="text-corporate-grey-light leading-relaxed">
                  {format.description}
                </p>
                <div className="mt-4 flex items-center text-green-600 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Supported
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcceptedFormatsSection;