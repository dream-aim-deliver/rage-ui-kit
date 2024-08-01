import { expect, describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginCard } from "@/components/card/LoginCard";
import { act } from "react-dom/test-utils";

describe("<LoginCard/>", () => {
  it("should render the Login Card by default", () => {
    const mockButtonAction = vi.fn();

    render(<LoginCard buttonAction={mockButtonAction} />);
    expect(screen.getByText(/Welcome to SDA/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your username/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your password/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("should pass the correct values to the buttonAction function when the login button is clicked", async () => {
    const testUsername = "Test Username";
    const testPassword = "Test Password";

    const buttonAction = () => {};
    const mockFunction = vi.fn().mockImplementation(buttonAction);

    // Render the component with the mock function as the buttonAction prop
    render(<LoginCard buttonAction={mockFunction} />);

    // Verify that the input fields are present
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: testUsername } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    // Simulate button click
    const button = screen.getByText("Login");
    act(() => {
      fireEvent.click(button);
    });

    // Check if mockFunction has been called
    await waitFor(() => expect(mockFunction).toHaveBeenCalledTimes(1));

    // Check if the inputs passed to the button action are correct
    expect(mockFunction).toHaveBeenCalledWith({
      userName: testUsername,
      userPassword: testPassword,
    });

    expect(mockFunction).not.toHaveBeenCalledWith({
      userName: `${testUsername} different`,
      userPassword: `${testPassword} different`,
    });
  });

  it('should show "Required Field" in the screen if any of the input values is empty', async () => {
    const buttonAction = () => {};
    const mockFunction = vi.fn().mockImplementation(buttonAction);

    // Render the component with the mock alert function as the buttonAction prop
    render(<LoginCard buttonAction={mockFunction} />);

    // Simulate user input
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    fireEvent.input(usernameInput, { target: { value: `` } });
    fireEvent.input(passwordInput, { target: { value: `` } });

    // Simulate button click
    const button = screen.getByText("Login");
    act(() => {
      fireEvent.click(button);
    });

    // Check if mockButtonAction has been called
    await waitFor(() => expect(mockFunction).not.toHaveBeenCalled());

    const errorMessages = screen.queryAllByText(/is required/i);
    expect(errorMessages).toHaveLength(2);

    // Test for empty "Password"
    fireEvent.input(usernameInput, { target: { value: `Test Username` } });
    fireEvent.input(passwordInput, { target: { value: `` } });

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => expect(mockFunction).not.toHaveBeenCalled());
    const errorMessages2 = screen.queryAllByText(/is required/i);
    expect(errorMessages2).toHaveLength(1);

    // Test for empty "Username"
    fireEvent.input(usernameInput, { target: { value: `` } });
    fireEvent.input(passwordInput, { target: { value: `Test Password` } });

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => expect(mockFunction).not.toHaveBeenCalled());
    const errorMessages3 = screen.queryAllByText(/is required/i);
    expect(errorMessages3).toHaveLength(1);
  });
});
