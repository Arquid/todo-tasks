# React Todo Tasks App

![CI](https://github.com/Arquid/todo-tasks/actions/workflows/ci.yml/badge.svg)

A simple Todo tasks application built with React.

## Features

- Add tasks
- Set task priority (Low / Normal / High) with color-coded indicator and priority-based sorting
- Mark tasks as completed
- Delete tasks (with confirmation dialog)
- Edit task name (double-click or edit button, Enter to save, Escape to cancel)
- Filter tasks (All / Active / Completed)
- Clear all completed tasks (with confirmation dialog)
- LocalStorage persistence (debounced writes, resilient to corrupted data)
- Prevent duplicate tasks
- Keyboard and screen-reader accessible (checkbox toggle, labeled buttons, `aria-pressed` filters)
- Empty state message when no tasks match the current filter

## Tech Stack

- React
- JavaScript
- CSS
- Vite
- Vitest + React Testing Library (tests)

## Installation

```bash
git clone https://github.com/Arquid/todo-tasks.git
cd todo-tasks
npm install
npm run dev
```

## Testing

```bash
npm run test        # run the test suite once
npm run test:watch  # re-run tests on file changes
```

Tests cover adding, editing, completing, deleting, filtering, prioritizing and persisting tasks, including error and empty-state cases.

## CI

Every push and pull request runs lint, tests, and a production build via [GitHub Actions](.github/workflows/ci.yml).
