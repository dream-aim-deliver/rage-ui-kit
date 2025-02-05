import React from "react";
import { cn } from "@/utils/utils";
import { SatelliteIcon } from "lucide-react"; // Import SatelliteIcon

interface SiteFooterProps {
  brandSection?: React.ReactNode;
  linksSection?: React.ReactNode;
  contactSection?: React.ReactNode;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  linksSection,
  contactSection,
}) => {
  return (
    <footer
      className={cn(
        "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-white shadow-lg mt-auto",
      )}
    >
      <div className="w-full px-4 py-6 flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Brand Section */}
        <div className="flex items-center gap-2">
          <SatelliteIcon
            size={20}
            className="text-neutral-800 dark:text-white"
          />
          <span className="text-xl font-bold text-neutral-800 dark:text-white">
            SkyPulse
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            © 2024
          </span>
        </div>

        {/* Links Section */}
        <nav className="flex flex-wrap justify-center lg:justify-start w-full lg:w-auto text-sm space-x-6 lg:space-x-8">
          {
            linksSection // Here your links will appear
          }
        </nav>

        {/* Contact Section */}
        <div className="text-sm text-center lg:text-left">{contactSection}</div>
      </div>

      {/* Bottom Border for Aesthetic Similarity to Header */}
      <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
    </footer>
  );
};
