function TodoFilters({ setFilter, filter }) {
  return (
    <div className="filters">
      <button
        onClick={() => setFilter("all")}
        className={filter === "all" ? "active" : ""}
        aria-pressed={filter === "all"}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={filter === "active" ? "active" : ""}
        aria-pressed={filter === "active"}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={filter === "completed" ? "active" : ""}
        aria-pressed={filter === "completed"}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;