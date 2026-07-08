import { useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
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
        <span className={`priority-dot priority-${todo.priority || "normal"}`} aria-hidden="true" />
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
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