import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { expect, describe, it, vi } from "vitest";
import { SVGProps } from "react";

interface SatelliteIconProps extends SVGProps<SVGSVGElement> {}

// Mocking the SatelliteIcon from lucide-react
vi.mock("lucide-react", () => ({
  SatelliteIcon: (props: SatelliteIconProps) => <svg {...props} />,
}));

describe("<SiteFooter />", () => {
  it("should render the SiteFooter with default content", () => {
    render(<SiteFooter />);

    // Check if default branding is rendered
    expect(screen.getByText(/SDA/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();

    // Check if default links section is rendered
    expect(screen.getByText(/Add your links here/i)).toBeInTheDocument();

    // Check if default contact section is rendered
    expect(screen.getByText(/info@example.com/i)).toBeInTheDocument();
  });

  it("should render the SiteFooter with provided sections", () => {
    const brandSection = (
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">SDA</span>
        <span className="text-sm">© 2024</span>
      </div>
    );

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
        brandSection={brandSection}
        linksSection={linksSection}
        contactSection={contactSection}
      />,
    );

    // Check if custom branding is rendered
    expect(screen.getByText(/SDA/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();

    // Check if custom links are rendered
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy/i)).toBeInTheDocument();

    // Check if custom contact is rendered
    expect(screen.getByText(/support@customdomain.com/i)).toBeInTheDocument();
  });

  it("should render correctly without brandSection, linksSection, and contactSection", () => {
    render(<SiteFooter />);

    // Ensure the placeholder or default sections are rendered
    expect(screen.getByText(/Add your links here/i)).toBeInTheDocument();
    expect(screen.getByText(/info@example.com/i)).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const { container } = render(<SiteFooter />);
    expect(container).toMatchSnapshot();
  });
});
