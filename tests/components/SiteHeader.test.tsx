import { expect, describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components//site-header/SiteHeader";

describe("<Header />", () => {
  it("should render the logo", () => {
    render(<Header />);
    expect(screen.getByText("SDA")).toBeInTheDocument();
  });

  it("should display mobile menu button initially and desktop menu should be hidden", () => {
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'));
    render(<Header />);
    
    // Mobile menu button (hamburger menu) should be visible
    expect(screen.getByRole("button")).toBeInTheDocument();
    
    // Mobile menu should not be visible
    expect(screen.queryAllByText("Home")[0]).not.toBeVisible();
  });

  // it("should toggle mobile menu when button is clicked", () => {
  //   render(<Header />);
    
  //   const menuButton = screen.getByRole("button");
    
  //   // Mobile menu should be closed initially
  //   expect(screen.queryAllByText("Home")[1]).not.toBeVisible();
    
  //   // Open mobile menu
  //   fireEvent.click(menuButton);
  //   const HomeElements = screen.getAllByText("Home")
  //   expect(HomeElements[1]).toBeVisible();
    
  //   // Close mobile menu
  //   fireEvent.click(menuButton);
  //   expect(HomeElements[1]).not.toBeVisible();
  // });

  // it("should trigger alert when clicking a navigation link", () => {
  //   const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

  //   render(<Header />);
    
  //   // Open mobile menu
  //   const menuButton = screen.getByRole("button");
  //   fireEvent.click(menuButton);
    
  //   // Click "Home" link
  //   const homeLink = screen.getAllByText("Home");
  //   fireEvent.click(homeLink[1]);
    
  //   // Check if alert is called with the correct argument
  //   expect(alertMock).toHaveBeenCalledWith("You clicked on Home");

  //   // Cleanup mock
  //   alertMock.mockRestore();
  // });

  // it("should render all navigation links in desktop mode", () => {
  //   render(<Header />);

  //   // Simulate desktop view by setting screen width
  //   global.innerWidth = 1024;
  //   global.dispatchEvent(new Event('resize'));

  //   // Check if desktop links are visible
  //   expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
  //   expect(screen.getAllByText("Source")[0]).toBeInTheDocument();
  //   expect(screen.getAllByText("Research Context")[0]).toBeInTheDocument();
  //   expect(screen.getAllByText("Documentation")[0]).toBeInTheDocument();
  // });
});
