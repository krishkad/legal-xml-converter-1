"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Code, FileText, Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

const HeroSection = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    console.log("Files dropped:", e.dataTransfer.files);

    // const uploadDocs = async () => {
    // const file = fileInputRef.current?.files?.[0];
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/convert-to-xml", {
      method: "POST",
      body: formData,
    });

    // const result = await res.json();
    // console.log("Server Response:", result);
    // console.log({ result: result.text });

    const blob = await res.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    window.URL.revokeObjectURL(url);

    // };
    // uploadDocs();
  };

  const scrollToPricing = () => {
    document
      .getElementById("pricing-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log({ files });

    const uploadDocs = async () => {
      const file = fileInputRef.current?.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/convert-to-xml", {
        method: "POST",
        body: formData,
      });

      // const result = await res.json();
      // console.log("Server Response:", result);
      const blob = await res.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "output.xml";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(url);
    };
    uploadDocs();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            {/* <h1 className="text-5xl md:text-7xl font-bold text-corporate-grey mb-6 leading-tight">
              Convert Scanned & 
              <span className="block text-corporate-red">
                Handwritten Legal Documents
              </span>
              to Structured XML — 
              <span className="text-corporate-red">Instantly.</span>
            </h1> */}
            <h1 className="text-4xl md:text-6xl font-bold text-corporate-grey mb-6 leading-snug">
              Turn{" "}
              <span className="text-corporate-red">Scanned & Handwritten</span>
              <br />
              Legal Docs into{" "}
              <span className="text-corporate-red">Structured XML</span>
              <br />
              <span className="block">in Seconds.</span>
            </h1>

            <p className="text-xl md:text-2xl text-corporate-grey-light mb-12 max-w-4xl mx-auto leading-relaxed">
              AI-powered legal document transformation designed for law firms,
              courts, and legal tech providers.
            </p>
          </div>

          {/* Upload Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 cursor-pointer text-center transition-all duration-300  ${
                isDragOver
                  ? "border-corporate-red bg-corporate-muted scale-105"
                  : "border-corporate-border bg-white hover:bg-corporate-muted hover:border-corporate-red"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpeg,.png,.docx,.txt"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <Upload className="w-16 h-16 text-corporate-red" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-corporate-grey mb-2">
                    Drop your legal documents here
                  </h3>
                  <p className="text-corporate-grey-light mb-6">
                    or click to browse files
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-corporate-grey-light">
                    <span className="bg-corporate-muted px-3 py-1 rounded-full border border-corporate-border">
                      .pdf
                    </span>
                    <span className="bg-corporate-muted px-3 py-1 rounded-full border border-corporate-border">
                      .jpeg
                    </span>
                    <span className="bg-corporate-muted px-3 py-1 rounded-full border border-corporate-border">
                      .png
                    </span>
                    <span className="bg-corporate-muted px-3 py-1 rounded-full border border-corporate-border">
                      .docx
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Supported documents note */}
            <div className="text-center mt-6">
              <p className="text-corporate-grey-light">
                <FileText className="w-5 h-5 inline mr-2" />
                Supported: Legal Notices, Affidavits, Agreements
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={scrollToPricing}
              className="bg-corporate-red hover:bg-corporate-red-dark text-white text-lg px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Free Trial
            </Button>
            <Button
              variant="ghost"
              onClick={scrollToPricing}
              className="text-corporate-red hover:text-corporate-red-dark text-lg px-8 py-4 rounded-lg font-semibold"
            >
              View Pricing
            </Button>
          </div>

          {/* Process Preview */}
          <div className="flex justify-center items-center space-x-8 text-corporate-grey-light">
            <div className="flex flex-col items-center">
              <FileText className="w-12 h-12 mb-2 text-corporate-red" />
              <span className="text-xs sm:text-sm font-medium text-center">
                Upload Document
              </span>
            </div>
            <ArrowDown className="w-6 h-6 -rotate-90 text-corporate-red" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-corporate-red rounded-full flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-white">AI</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-center">
                Process with AI
              </span>
            </div>
            <ArrowDown className="w-6 h-6 -rotate-90 text-corporate-red" />
            <div className="flex flex-col items-center">
              <Code className="w-12 h-12 mb-2 text-corporate-red" />
              <span className="text-xs sm:text-sm font-medium text-center">
                Get Clean XML
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
