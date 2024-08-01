import { expect, describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateConversationDialog } from "@/components/dialog/CreateConversationDialog";
import { act } from "react-dom/test-utils";

describe("<CreateConversationDialog/>", () => {
  it("should render the trigger of the dialog", () => {
    render(<CreateConversationDialog buttonAction={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render the dialog when the trigger is clicked", () => {
    render(<CreateConversationDialog buttonAction={() => {}} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should pass the correct values to the buttonAction function when the create button is clicked", async () => {
    const testTitle = "Test title for a test conversation dialog";

    const buttonAction = () => {};
    const mockFunction = vi.fn().mockImplementation(buttonAction);

    // Render the component with the mock alert function as the buttonAction prop
    render(<CreateConversationDialog buttonAction={mockFunction} />);
    const triggerButton = screen.getByRole("button");
    fireEvent.click(triggerButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Simulate user input
    const titleInput = screen.getByLabelText("Conversation title *");
    fireEvent.input(titleInput, { target: { value: `${testTitle}` } });

    // Simulate button click
    const button = screen.getByText("Create new conversation");
    act(() => {
      fireEvent.click(button);
    });

    // Check if mockButtonAction has been called
    await waitFor(() => expect(mockFunction).toHaveBeenCalledTimes(1));

    // Check if the inputs passed to the button action are correct
    expect(mockFunction).toHaveBeenCalledWith({
      conversationTitle: testTitle,
    });

    expect(mockFunction).not.toHaveBeenCalledWith({
      conversationTitle: `${testTitle} different`,
    });
  });

  it("should show an error message in the screen if the input value is empty", async () => {
    const buttonAction = () => {};
    const mockFunction = vi.fn().mockImplementation(buttonAction);

    // Render the component with the mock alert function as the buttonAction prop
    render(<CreateConversationDialog buttonAction={mockFunction} />);
    const triggerButton = screen.getByRole("button");
    fireEvent.click(triggerButton);

    // Simulate user input
    const titleInput = screen.getByLabelText("Conversation title *");
    fireEvent.input(titleInput, { target: { value: `` } });

    // Simulate button click
    const button = screen.getByText("Create new conversation");
    act(() => {
      fireEvent.click(button);
    });

    // Check if mockButtonAction has been called
    await waitFor(() => expect(mockFunction).not.toHaveBeenCalled());

    const errorMessages = screen.queryAllByText(/is required/i);
    expect(errorMessages).toHaveLength(1);

    // Test for empty "Title"
    fireEvent.input(titleInput, { target: { value: `` } });
  });
});
