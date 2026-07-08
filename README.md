# React Todo Tasks App

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

## Installation

```bash
git clone https://github.com/Arquid/todo-tasks.git
cd todo-tasks
npm install
npm run dev
