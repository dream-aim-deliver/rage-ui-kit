import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/button";

describe("<Button />", () => {
  it("should render the button", () => {
    render(<Button label="Click Me" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });
});
