import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

describe("adding tasks", () => {
  it("adds a task and clears the input", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Buy milk");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add task...")).toHaveValue("");
  });

  it("adds a task by pressing Enter", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Buy eggs{Enter}");

    expect(screen.getByText("Buy eggs")).toBeInTheDocument();
  });

  it("does not add an empty or whitespace-only task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "   ");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("No tasks here")).toBeInTheDocument();
  });

  it("rejects duplicate task names (case-insensitive)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Buy milk{Enter}");
    await user.type(screen.getByPlaceholderText("Add task..."), "buy milk{Enter}");

    expect(screen.getAllByText(/buy milk/i)).toHaveLength(1);
    expect(screen.getByText("Task already exists!")).toBeInTheDocument();
  });

  it("assigns the selected priority to a new task and sorts high priority first", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Normal task{Enter}");

    await user.selectOptions(screen.getByLabelText("Task priority"), "high");
    await user.type(screen.getByPlaceholderText("Add task..."), "Urgent task{Enter}");

    const items = screen.getAllByRole("listitem");
    expect(within(items[0]).getByText("Urgent task")).toBeInTheDocument();
    expect(within(items[1]).getByText("Normal task")).toBeInTheDocument();
  });
});

describe("completing and deleting tasks", () => {
  it("toggles a task as completed", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Buy milk{Enter}");
    const checkbox = screen.getByRole("checkbox", { name: /mark task as complete: buy milk/i });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText("0 tasks left")).toBeInTheDocument();
  });

  it("deletes a task only after confirming the dialog", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Buy milk{Enter}");
    await user.click(screen.getByRole("button", { name: "Delete task: Buy milk" }));

    expect(screen.getByText("Are you sure you want to delete this task?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Delete task: Buy milk" }));
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
    expect(screen.getByText("No tasks here")).toBeInTheDocument();
  });
});

describe("editing tasks", () => {
  it("edits a task's text via the edit button", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Buy milk{Enter}");
    await user.click(screen.getByRole("button", { name: "Edit task: Buy milk" }));

    const editInput = screen.getByDisplayValue("Buy milk");
    await user.clear(editInput);
    await user.type(editInput, "Buy oat milk{Enter}");

    expect(screen.getByText("Buy oat milk")).toBeInTheDocument();
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
  });

  it("cancels editing on Escape without saving changes", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Buy milk{Enter}");
    await user.click(screen.getByRole("button", { name: "Edit task: Buy milk" }));

    const editInput = screen.getByDisplayValue("Buy milk");
    await user.clear(editInput);
    await user.type(editInput, "Something else{Escape}");

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("changes a task's priority after creation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Buy milk{Enter}");

    const prioritySelect = screen.getByLabelText("Priority for task: Buy milk");
    await user.selectOptions(prioritySelect, "high");

    expect(prioritySelect).toHaveValue("high");
  });
});

describe("filtering", () => {
  it("filters tasks by Active and Completed", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Task A{Enter}");
    await user.type(screen.getByPlaceholderText("Add task..."), "Task B{Enter}");
    await user.click(screen.getByRole("checkbox", { name: /mark task as complete: task a/i }));

    await user.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.queryByText("Task A")).not.toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.queryByText("Task B")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
  });

  it("shows the empty state when the current filter matches nothing", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Task A{Enter}");
    await user.click(screen.getByRole("button", { name: "Completed" }));

    expect(screen.getByText("No tasks here")).toBeInTheDocument();
  });
});

describe("clear completed", () => {
  it("does nothing when there are no completed tasks", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Task A{Enter}");
    await user.click(screen.getByRole("button", { name: "Clear completed" }));

    expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
  });

  it("removes only completed tasks after confirmation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText("Add task..."), "Task A{Enter}");
    await user.type(screen.getByPlaceholderText("Add task..."), "Task B{Enter}");
    await user.click(screen.getByRole("checkbox", { name: /mark task as complete: task a/i }));

    await user.click(screen.getByRole("button", { name: "Clear completed" }));
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("Task A")).not.toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
  });
});

describe("persistence", () => {
  it("loads tasks from localStorage on mount", () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([{ id: "1", text: "Existing task", completed: false, priority: "normal" }])
    );

    render(<App />);

    expect(screen.getByText("Existing task")).toBeInTheDocument();
  });

  it("falls back to an empty list when localStorage data is corrupted", () => {
    localStorage.setItem("todos", "{ not valid json");

    render(<App />);

    expect(screen.getByText("No tasks here")).toBeInTheDocument();
  });

  it("sorts a legacy task without a priority field as normal priority", () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([
        { id: "1", text: "Legacy task", completed: false },
        { id: "2", text: "High task", completed: false, priority: "high" },
        { id: "3", text: "Low task", completed: false, priority: "low" },
      ])
    );

    render(<App />);

    const items = screen.getAllByRole("listitem");
    expect(within(items[0]).getByText("High task")).toBeInTheDocument();
    expect(within(items[1]).getByText("Legacy task")).toBeInTheDocument();
    expect(within(items[2]).getByText("Low task")).toBeInTheDocument();
  });
});
