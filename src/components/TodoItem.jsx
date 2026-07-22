import { useState } from "react";

function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  const today = new Date().toISOString().split("T")[0];
  return dueDate < today;
}

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo, changePriority, changeDueDate }) {
  const [isEditing, setIsediting] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const startEditing = () => {
    setDraft(todo.text);
    setIsediting(true);
  }

  const saveEdit = () => {
    editTodo(todo.id, draft);
    setIsediting(false);
  }

  const cancelEdit = () => {
    setDraft(todo.text);
    setIsediting(false);
  }

  return (
    <li className="todo-item">
      <label className="todo-label">
        <select
          className={`priority-select priority-${todo.priority || "normal"}`}
          value={todo.priority || "normal"}
          onChange={(e) => changePriority(todo.id, e.target.value)}
          aria-label={`Priority for task: ${todo.text}`}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          aria-label={`Mark task as complete: ${todo.text}`}
        />
        {isEditing ? (
          <input
            className="edit-input"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit()
            }}
          />
        ) : (
          <span
            className={todo.completed ? "completed" : ""}
            onDoubleClick={startEditing}
          >
            {todo.text}
          </span>
        )}
      </label>
      <input
        type="date"
        className={`due-date-input ${isOverdue(todo.dueDate, todo.completed) ? "overdue" : ""}`}
        value={todo.dueDate || ""}
        onChange={(e) => changeDueDate(todo.id, e.target.value)}
        aria-label={`Due date for task: ${todo.text}`}
      />
      {!isEditing && (
        <button
          className="edit-btn"
          onClick={startEditing}
          aria-label={`Edit task: ${todo.text}`}
        >
          ✏️
        </button>
      )}
      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
        aria-label={`Delete task: ${todo.text}`}
      >
        ❌
      </button>
    </li>
  );
}

export default TodoItem;