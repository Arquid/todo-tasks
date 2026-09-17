# React Todo Tasks App

![CI](https://github.com/Arquid/todo-tasks/actions/workflows/ci.yml/badge.svg)

A small, focused todo app built with React and Vite — no backend, no accounts, just a fast local task list that remembers what you gave it.

## Features

**Task management**
- Add, edit (double-click or ✏️), complete, and delete tasks
- Prevents duplicate task names (case-insensitive)
- Delete and "Clear completed" both require confirmation

**Organization**
- Priority levels (Low / Normal / High) with a color-coded indicator, settable and editable, sorted high-first
- Due dates, editable inline, with a visual "overdue" state for incomplete tasks past their date
- Filter by All / Active / Completed, with an empty-state message when a filter has nothing to show

**Reliability**
- Persists to `localStorage`, with debounced writes and graceful recovery from corrupted data
- Every task gets a stable `crypto.randomUUID()` id

**Accessibility**
- Checkbox-based completion toggle with descriptive `aria-label`s
- `aria-pressed` on filter buttons
- Priority and due-date controls are native, labeled form elements — fully keyboard operable

## Tech Stack

| | |
|---|---|
| UI | React 19 |
| Build tool | Vite |
| Language | JavaScript (JSX) |
| Styling | Plain CSS |
| Testing | Vitest + React Testing Library |
| CI | GitHub Actions |

## Getting Started

```bash
git clone https://github.com/Arquid/todo-tasks.git
cd todo-tasks
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build a production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |
| `npm run test` | Run the test suite once |
| `npm run test:watch` | Re-run tests on file changes |
| `npm run test:coverage` | Run tests and print a coverage report |

## Testing

Tests use [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react), exercising the app the way a user would rather than mocking internals. Coverage includes adding, editing, completing, deleting, filtering, prioritizing, setting due dates, and persisting tasks (including debounced writes), plus error and empty-state cases.

```bash
npm run test
npm run test:coverage
```

CI enforces minimum coverage thresholds (90% statements/functions/lines, 80% branches) so coverage can't silently regress.

## CI

Every push and pull request runs lint, tests with coverage, and a production build via [GitHub Actions](.github/workflows/ci.yml) — nothing broken merges quietly. The coverage report is uploaded as a build artifact for inspection.

Dependency updates (npm packages and GitHub Actions) are proposed weekly via [Dependabot](.github/dependabot.yml).

## Project Structure

```
src/
├── App.jsx                 # App state and top-level logic
├── App.css                 # Styles
├── App.test.jsx            # App-level test suite
├── components/
│   ├── TodoInput.jsx       # Add-task form (text, priority, due date)
│   ├── TodoList.jsx        # List rendering + empty state
│   ├── TodoItem.jsx        # Single task row (edit, toggle, priority, due date)
│   ├── TodoFilters.jsx     # All / Active / Completed filter buttons
│   └── ConfirmDialog.jsx   # Reusable confirmation modal
└── test/
    └── setup.js             # Test environment setup (jest-dom matchers)
```
