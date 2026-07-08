import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo, editTodo, changePriority }) {
  if (todos.length === 0) {
    return <p className="empty-state">No tasks here</p>
  }

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          changePriority={changePriority}
        />
      ))}
    </ul>
  );
}

export default TodoList;