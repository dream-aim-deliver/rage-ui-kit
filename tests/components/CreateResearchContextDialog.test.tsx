import { expect, describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateResearchContextDialog } from "@/components/dialog/CreateResearchContextDialog";
import { act } from "react-dom/test-utils";

describe("<CreateResearchContextDialog/>", () => {
  it("should render the trigger of the dialog", () => {
    render(<CreateResearchContextDialog onSubmit={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render the dialog when the trigger is clicked", () => {
    render(<CreateResearchContextDialog onSubmit={() => {}} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should pass the correct values to the buttonAction function when the create button is clicked", async () => {
    const testName = "Test Name";
    const testDescription = "Test description for a test research context";

    const onSubmit = () => {};
    const mockFunction = vi.fn().mockImplementation(onSubmit);

    // Render the component with the mock alert function as the buttonAction prop
    render(<CreateResearchContextDialog onSubmit={mockFunction} />);
    const triggerButton = screen.getByRole("button");
    fireEvent.click(triggerButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Simulate user input
    const nameInput = screen.getByLabelText("Name *");
    const descriptionInput = screen.getByLabelText("Description *");
    fireEvent.input(nameInput, { target: { value: `${testName}` } });
    fireEvent.input(descriptionInput, {
      target: { value: `${testDescription}` },
    });

    // Simulate button click
    const button = screen.getByText("Create new research context");
    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1));
    // expect(mock).toHaveBeenCalledWith();
    // Check if mockButtonAction has been called
    await waitFor(() => expect(mockFunction).toHaveBeenCalledTimes(1));

    // Check if the inputs passed to the button action are correct
    expect(mockFunction).toHaveBeenCalledWith({
      researchContextName: testName,
      researchContextDescription: testDescription,
    });

    expect(mockFunction).not.toHaveBeenCalledWith({
      researchContextName: `${testName} different`,
      researchContextDescription: `${testDescription} different`,
    });
  });

  it('should show "Required Field" in the screen if any of the input values is empty', async () => {
    const onSubmit = () => {};
    const mockFunction = vi.fn().mockImplementation(onSubmit);

    // Render the component with the mock alert function as the buttonAction prop
    render(<CreateResearchContextDialog onSubmit={mockFunction} />);
    const triggerButton = screen.getByRole("button");
    fireEvent.click(triggerButton);

    // Simulate user input
    const nameInput = screen.getByLabelText("Name *");
    const descriptionInput = screen.getByLabelText("Description *");
    fireEvent.input(nameInput, { target: { value: `` } });
    fireEvent.input(descriptionInput, { target: { value: `` } });

    // Simulate button click
    const button = screen.getByText("Create new research context");
    act(() => {
      fireEvent.click(button);
    });

    // Check if mockButtonAction has been called
    await waitFor(() => expect(mockFunction).not.toHaveBeenCalled());

    const errorMessages = screen.queryAllByText(/characters long/i);
    expect(errorMessages).toHaveLength(2);

    // Test for empty "Description"
    fireEvent.input(nameInput, { target: { value: `Test Name` } });
    fireEvent.input(descriptionInput, { target: { value: `` } });

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => expect(mockFunction).not.toHaveBeenCalled());
    const errorMessages2 = screen.queryAllByText(/characters long/i);
    expect(errorMessages2).toHaveLength(1);

    // Test for empty "Name"
    fireEvent.input(nameInput, { target: { value: `` } });
    fireEvent.input(descriptionInput, {
      target: { value: `Test description for a test research context` },
    });

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => expect(mockFunction).not.toHaveBeenCalled());
    const errorMessages3 = screen.queryAllByText(/characters long/i);
    expect(errorMessages3).toHaveLength(1);
  });
});
