import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastViewport,
} from "@/components/ui/toast";

describe("<Toast />", () => {
  it("should render the toast with the correct content", () => {
    render(
      <ToastProvider>
        <Toast>
          <ToastTitle>Test Title</ToastTitle>
          <ToastDescription>This is a test description.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test description.")).toBeInTheDocument();
  });

  it("should trigger the close button action", async () => {
    render(
      <ToastProvider>
        <Toast>
          <ToastTitle>Test Title</ToastTitle>
          <ToastDescription>This is a test description.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
      expect(
        screen.queryByText("This is a test description."),
      ).not.toBeInTheDocument();
    });
  });

  it("should trigger a custom action", async () => {
    const mockAction = vi.fn();

    render(
      <ToastProvider>
        <Toast>
          <ToastTitle>Action Test</ToastTitle>
          <ToastAction altText="Undo" onClick={mockAction}>
            Undo
          </ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const actionButton = screen.getByText("Undo");
    fireEvent.click(actionButton);

    await waitFor(() => {
      expect(mockAction).toHaveBeenCalledTimes(1);
    });
  });

  it("should apply custom styles based on variant and position", () => {
    render(
      <ToastProvider>
        <Toast variant="error" position="left" size="medium">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>An error occurred.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const toastElement = screen.getByText("Error").closest("div");
    expect(toastElement).toHaveClass("border-red-500");
    expect(toastElement).toHaveClass(
      "fixed bottom-4 left-4 sm:bottom-6 sm:left-6",
    );
  });
});
