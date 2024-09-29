import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorPage } from "@/components/error-page/ErrorPage";
import { expect, describe, it, vi } from "vitest";
import { ButtonProps } from "@/components/button";
import { SVGProps } from "react";

interface AlertTriangleIconProps extends SVGProps<SVGSVGElement> {}

// Mock the lucide-react icon and the custom Button component
vi.mock("lucide-react", () => ({
  AlertTriangleIcon: (props: AlertTriangleIconProps) => <svg {...props} />,
}));

vi.mock("@/components/button", () => ({
  Button: (props: ButtonProps) => <button {...props}>{props.label}</button>,
}));

describe("<ErrorPage />", () => {
  it("should render the ErrorPage with default error code and message", () => {
    render(<ErrorPage />);

    // Check if the default error code and message are rendered
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();

    // Check if the Go back to Homepage button is rendered
    expect(
      screen.getByRole("button", { name: /Go back to Homepage/i }),
    ).toBeInTheDocument();
  });

  it("should render the ErrorPage with custom error code and message", () => {
    render(<ErrorPage errorCode={500} errorMessage="Internal Server Error" />);

    // Check if the custom error code and message are rendered
    expect(screen.getByText(/500/i)).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();

    // Check if the Go back to Homepage button is rendered
    expect(
      screen.getByRole("button", { name: /Go back to Homepage/i }),
    ).toBeInTheDocument();
  });

  it("should render children content passed to ErrorPage", () => {
    render(
      <ErrorPage>
        <p>Custom child content here</p>
      </ErrorPage>,
    );

    // Check if the custom child content is rendered
    expect(screen.getByText(/Custom child content here/i)).toBeInTheDocument();
  });

  it("should navigate to the homepage when the button is clicked", () => {
    // Mock the window.location.href property
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
    });

    render(<ErrorPage />);

    // Simulate button click
    const button = screen.getByRole("button", { name: /Go back to Homepage/i });
    fireEvent.click(button);

    // Check if the button click triggers the correct navigation
    expect(window.location.href).toBe("/");
  });
});
