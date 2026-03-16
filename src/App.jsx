import { useState, useEffect } from "react";
import "./App.css";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
  const trimmed = input.trim();

  if (!trimmed) return;

  if (todos.some(todo => todo.text.toLowerCase() === trimmed.toLowerCase())) {
    alert("Task already exists!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: trimmed,
    completed: false
  };

  setTodos([...todos, newTodo]);
  setInput("");
};

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="container">
      <div className="todo-card">
        <h1>Todo App</h1>
        <TodoInput
          input={input}
          setInput={setInput}
          addTodo={addTodo}
        />
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
        <p>{activeCount} tasks left</p>
        <TodoFilters setFilter={setFilter} filter={filter} />
        <button
          className="clear"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default App;
