function TodoInput({ input, setInput, priority, setPriority, addTodo }) {
  return (
    <div className="input-row">
      <input
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
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default TodoInput;