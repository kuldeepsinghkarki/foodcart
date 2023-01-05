import { render, screen } from "@testing-library/react";
import App from "./App";
describe("Login Page Tests", () => {
  test("renders browse from Desktop", () => {
    render(<App />);
    const linkElement = screen.getByText("Browsing from Desktop", { exact: false });
    expect(linkElement).toBeInTheDocument();
  });

  test("renders Your Email", () => {
    render(<App />);
    const linkElement = screen.getByText("Your email", { exact: false });
    expect(linkElement).toBeInTheDocument();
  });
});
