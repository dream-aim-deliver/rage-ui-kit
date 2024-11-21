import { expect, describe, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components//site-header/SiteHeader";

describe("<Header />", () => {
  it("should render the logo", () => {
    render(<Header />);
    expect(screen.getByText("SkyPulse")).toBeInTheDocument();
  });

  it("should display mobile menu on sceens width < lg, else display desktop menu", () => {
    window.innerWidth = 640;
    fireEvent(window, new Event("resize"));
    // Simulate mobile view by setting screen width
    render(
      <Header>
        <span>Test</span>
      </Header>,
    );

    const menuBars = screen.getAllByRole("menubar");
    const desktopMenu = menuBars[0];
    const mobileMenu = menuBars[1];
    // Mobile menu should not be visible
    expect(mobileMenu.classList.contains("lg:hidden")).toBe(true);
    expect(desktopMenu.classList.contains("lg:flex")).toBe(true);
  });

  it("should toggle mobile menu when button is clicked", () => {
    render(
      <Header>
        <span>Test</span>
      </Header>,
    );

    let allButtons = screen.getAllByRole("button");
    const openMenuButton = allButtons.find(
      (button) => button.id === "open-menu-button",
    );
    let closeMenuButton = allButtons.find(
      (button) => button.id === "close-menu-button",
    );
    expect(openMenuButton).toBeDefined();
    expect(closeMenuButton).toBeUndefined();

    if (!openMenuButton) {
      return;
    }
    // Open mobile menu
    fireEvent.click(openMenuButton);
    allButtons = screen.getAllByRole("button");
    closeMenuButton = allButtons.find(
      (button) => button.id === "close-menu-button",
    );
    expect(closeMenuButton).toBeDefined();
  });
});
