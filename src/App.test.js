import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Personal Task Manager heading", () => {
  render(<App />);
  const heading = screen.getByText(/personal task manager/i);
  expect(heading).toBeInTheDocument();
});

test("adds a new task when form is submitted", () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/add a new task/i);
  const addButton = screen.getByText(/add/i);

  // Type into the input
  fireEvent.change(input, { target: { value: "Buy milk" } });

  // Click the Add button
  fireEvent.click(addButton);

  // Check if the task appears in the list
  const task = screen.getByText(/buy milk/i);
  expect(task).toBeInTheDocument();
});
