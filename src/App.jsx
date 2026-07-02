import { useState, useEffect } from "react";
import "./App.css";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import ConfirmDialog from "./components/ConfirmDialog";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  const addTodo = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    if (todos.some(todo => todo.text.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMessage("Task already exists!");
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

  const editTodo = (id, newText) => {
    const trimmed = newText.trim();
    
    if (!trimmed) return;
    
    const isDuplicate = todos.some(
      todo => todo.id !== id && todo.text.toLowerCase() === trimmed.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage("Task already exists!");
      return;
    }

    setTodos(
      todos.map(todo =>
        todo.id === id ? {...todo, text: trimmed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    setTodos(todos.filter(todo => todo.id !== pendingDeleteId));
    setPendingDeleteId(null);
  }

  const cancelDelete = () => {
    setPendingDeleteId(null);
  }

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
          editTodo={editTodo}
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

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {pendingDeleteId !== null && (
        <ConfirmDialog
          message={"Are you sure you want to delete this task?"}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default App;
