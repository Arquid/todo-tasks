function TodoInput({ input, setInput, addTodo }) {
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
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default TodoInput;