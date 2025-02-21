import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { expect, describe, it, vi } from "vitest";
import { SVGProps } from "react";

interface SatelliteIconProps extends SVGProps<SVGSVGElement> {}

// Mocking the SatelliteIcon from lucide-react
vi.mock("lucide-react", () => ({
  SatelliteIcon: (props: SatelliteIconProps) => (
    <svg data-testid="mock-satellite-icon" {...props} />
  ),
}));

describe("<SiteFooter />", () => {
  it("should render the default SiteFooter content", () => {
    render(<SiteFooter />);

    // Check if default branding is rendered
    expect(screen.getByText(/SkyPulse/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2025/i)).toBeInTheDocument();

    // Check if the mocked SatelliteIcon is rendered
    expect(screen.getByTestId("mock-satellite-icon")).toBeInTheDocument();
  });

  it("should render the SiteFooter with provided sections", () => {
    const linksSection = (
      <div>
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
      </div>
    );

    const contactSection = (
      <div>
        <a href="mailto:support@customdomain.com">support@customdomain.com</a>
      </div>
    );

    render(
      <SiteFooter
        linksSection={linksSection}
        contactSection={contactSection}
      />,
    );

    // Check if custom branding is rendered
    expect(screen.getByText(/SkyPulse/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2025/i)).toBeInTheDocument();

    // Check if custom links are rendered
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy/i)).toBeInTheDocument();

    // Check if custom contact is rendered
    expect(screen.getByText(/support@customdomain.com/i)).toBeInTheDocument();
  });

  it("should render the footer structure correctly", () => {
    const { container } = render(<SiteFooter />);

    // Check if a footer element exists
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();

    // Check if the flex container exists within the footer
    const flexContainer = container.querySelector("div.flex");
    expect(flexContainer).toBeInTheDocument();

    // Validate other footer elements or structure if needed
    const borderDiv = container.querySelector("div.w-full.border-t");
    expect(borderDiv).toBeInTheDocument();
  });
});
