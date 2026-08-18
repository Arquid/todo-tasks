function TodoInput({ input, setInput, priority, setPriority, dueDate, setDueDate, addTodo }) {
  return (
    <div className="input-row">
      <input
        className="text-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.trim() !== "") {
            addTodo();
          }
        }}
        placeholder="Add task..."
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Task priority"
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
        className="due-date-input"
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default TodoInput;