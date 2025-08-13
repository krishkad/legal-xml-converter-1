import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 z-10 w-full border-b border-gray-200 bg-white">
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between
      "
      >
        {/* LOGO */}
        <h1 className="text-2xl font-bold text-corporate-red">LegaltoXml</h1>

        {/* LINKS */}
        <div className="w-max hidden md:flex items-center-justify-center gap-8">
          <Link href={"#"} className="hover:text-primary transition-all">
            Features
          </Link>
          <Link href={"#"} className="hover:text-primary transition-all">
            How It Works
          </Link>
          <Link href={"#"} className="hover:text-primary transition-all">
            Pricing
          </Link>
          <Link href={"#"} className="hover:text-primary transition-all">
            FAQ&apos;s
          </Link>
        </div>

        {/* BUTTONS */}
        <div className="w-max flex items-center justify-center gap-6">
          <Link href={"#"} className="hover:text-primary transition-all max-sm:hidden">
            Log-in
          </Link>
          <Button className="bg-corporate-red hover:bg-corporate-red-dark text-white text-lg px-4 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Start Free Trial
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
