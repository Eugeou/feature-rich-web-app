import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryProvider } from "@/providers/QueryProvider";

const mockSignIn = jest.fn();
const mockSignInWithOAuth = jest.fn();

jest.mock("@/contexts/AuthContext", () => ({
  ...jest.requireActual("@/contexts/AuthContext"),
  useAuth: () => ({
    signIn: mockSignIn,
    signInWithOAuth: mockSignInWithOAuth,
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryProvider>
      <AuthProvider>{component}</AuthProvider>
    </QueryProvider>
  );
};

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form correctly", () => {
    renderWithProviders(
      <LoginForm onSwitchToSignUp={jest.fn()} onForgotPassword={jest.fn()} />
    );

    expect(screen.getByText("Log in to Beincom")).toBeTruthy();
    expect(screen.getByPlaceholderText("Your email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Your password")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Log In" })).toBeTruthy();
  });

  it("shows OAuth provider buttons", () => {
    renderWithProviders(
      <LoginForm onSwitchToSignUp={jest.fn()} onForgotPassword={jest.fn()} />
    );

    expect(screen.getByText("Continue with Google")).toBeTruthy();
    expect(screen.getByText("Continue with Facebook")).toBeTruthy();
    expect(screen.getByText("Continue with Twitter")).toBeTruthy();
  });

  it("handles form submission with valid data", async () => {
    mockSignIn.mockResolvedValueOnce(undefined);

    renderWithProviders(
      <LoginForm onSwitchToSignUp={jest.fn()} onForgotPassword={jest.fn()} />
    );

    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const submitButton = screen.getByRole("button", { name: "Log In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  it("shows validation errors for invalid email", async () => {
    renderWithProviders(
      <LoginForm onSwitchToSignUp={jest.fn()} onForgotPassword={jest.fn()} />
    );

    const emailInput = screen.getByPlaceholderText("Your email");
    const submitButton = screen.getByRole("button", { name: "Log In" });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email")).toBeTruthy();
    });
  });

  it("shows validation errors for empty password", async () => {
    renderWithProviders(
      <LoginForm onSwitchToSignUp={jest.fn()} onForgotPassword={jest.fn()} />
    );

    const emailInput = screen.getByPlaceholderText("Your email");
    const submitButton = screen.getByRole("button", { name: "Log In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeTruthy();
    });
  });

  it("calls onSwitchToSignUp when sign up link is clicked", () => {
    const mockOnSwitchToSignUp = jest.fn();

    renderWithProviders(
      <LoginForm
        onSwitchToSignUp={mockOnSwitchToSignUp}
        onForgotPassword={jest.fn()}
      />
    );

    const signUpLink = screen.getByText("Sign up");
    fireEvent.click(signUpLink);

    expect(mockOnSwitchToSignUp).toHaveBeenCalled();
  });

  it("calls onForgotPassword when forgot password link is clicked", () => {
    const mockOnForgotPassword = jest.fn();

    renderWithProviders(
      <LoginForm
        onSwitchToSignUp={jest.fn()}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const forgotPasswordLink = screen.getByText("Forgot password?");
    fireEvent.click(forgotPasswordLink);

    expect(mockOnForgotPassword).toHaveBeenCalled();
  });

  it("toggles password visibility", () => {
    renderWithProviders(
      <LoginForm onSwitchToSignUp={jest.fn()} onForgotPassword={jest.fn()} />
    );

    const passwordInput = screen.getByPlaceholderText("Your password");
    const toggleButton = screen.getByRole("button", { name: "" }); // Eye icon button

    expect(passwordInput).toHaveProperty("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveProperty("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveProperty("type", "password");
  });
});
