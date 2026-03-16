function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="todo-item">
      <span
        onClick={() => toggleTodo(todo.id)}
        className={todo.completed ? "completed" : ""}
      >
        {todo.text}
      </span>

      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </li>
  );
}

export default TodoItem;