# Practical 6: Todo List Application with Zustand

## Overview

This practical implements a Todo List application using React and Zustand for state management. Instead of prop drilling or complex Context setups, Zustand provides a simple centralized store that any component can access directly.

## Prerequisites

- Node.js installed
- Basic knowledge of React

## Installation

### 1. Create the Project

```bash
npm create vite@latest todo-zustand
cd todo-zustand
npm install
```

Select **React** and **JavaScript** when prompted.

### 2. Install Zustand

```bash
npm install zustand
```

---

## Project Structure

```
src/
├── components/
│   ├── TodoInput.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── store/
│   └── todoStore.js
└── App.jsx
```

---

## Setup Instructions

### Step 1: Create the Zustand Store (`src/store/todoStore.js`)

```js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],

      addTodo: (text) => set((state) => ({
        todos: [...state.todos, { id: Date.now(), text, completed: false }]
      })),

      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),

      removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),

      clearCompleted: () => set((state) => ({
        todos: state.todos.filter(todo => !todo.completed)
      }))
    }),
    { name: 'todo-storage' }
  )
)

export default useTodoStore
```

### Step 2: Create TodoInput (`src/components/TodoInput.jsx`)

```jsx
import React, { useState } from 'react'
import useTodoStore from '../store/todoStore'

function TodoInput() {
  const [text, setText] = useState('')
  const addTodo = useTodoStore(state => state.addTodo)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoInput
```

### Step 3: Create TodoItem (`src/components/TodoItem.jsx`)

```jsx
import React from 'react'
import useTodoStore from '../store/todoStore'

function TodoItem({ todo }) {
  const toggleTodo = useTodoStore(state => state.toggleTodo)
  const removeTodo = useTodoStore(state => state.removeTodo)

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => removeTodo(todo.id)}>Delete</button>
    </li>
  )
}

export default TodoItem
```

### Step 4: Create TodoList (`src/components/TodoList.jsx`)

```jsx
import React from 'react'
import useTodoStore from '../store/todoStore'
import TodoItem from './TodoItem'

function TodoList() {
  const todos = useTodoStore(state => state.todos)
  const clearCompleted = useTodoStore(state => state.clearCompleted)

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {todos.length > 0 && (
        <button onClick={clearCompleted}>Clear Completed</button>
      )}
    </div>
  )
}

export default TodoList
```

### Step 5: Update App (`src/App.jsx`)

```jsx
import React from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import useTodoStore from './store/todoStore'

function App() {
  const todoCount = useTodoStore(state => state.todos.length)
  const completedCount = useTodoStore(
    state => state.todos.filter(todo => todo.completed).length
  )

  return (
    <div className="App">
      <h1>Todo List with Zustand</h1>
      <TodoInput />
      <div>
        <p>Total todos: {todoCount}</p>
        <p>Completed: {completedCount}</p>
      </div>
      <TodoList />
    </div>
  )
}

export default App
```

---

## Running the App

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Testing

### Test 1 — Add a Todo
Type in the input field and click **Add**. The todo appears in the list and the total count increases.

### Test 2 — Complete a Todo
Click the checkbox on a todo. The text gets a strikethrough and the completed count increases.

### Test 3 — Delete a Todo
Click **Delete** on any todo. It is removed from the list.

### Test 4 — Clear Completed
Mark some todos as done, then click **Clear Completed**. Only incomplete todos remain.

### Test 5 — Persistence
Add some todos, then **refresh the page**. All todos are still there (saved via localStorage).

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `npx create vite@latest` gives an error | Use `npm create vite@latest` instead |
| Default Vite template still showing | Replace contents of `src/App.jsx` with the App code above |
| Zustand not found | Run `npm install zustand` inside the project folder |
| Todos disappear on refresh | Make sure you are using the `persist` version of `todoStore.js` |

---

## Reflection

### Concepts Applied

- **Zustand Store** — A single `create()` call sets up both state and actions in one place, no Provider needed
- **Selectors** — Each component subscribes only to the slice of state it needs (e.g. `state => state.todos`), so only that component re-renders on change
- **Immutable Updates** — The `set()` function always returns a new state object instead of mutating the existing one
- **Persist Middleware** — Wrapping the store with `persist` from `zustand/middleware` automatically saves and restores state from localStorage

### What I Learned

Zustand is significantly simpler than other state management solutions like Redux. There are no reducers, action types, or Provider wrappers required. Any component can directly read or update the shared store. Using selector functions also taught me how targeted re-rendering works — a component only updates when the exact piece of state it uses changes.

The `persist` middleware made it clear how real applications keep user data alive between sessions by simply reading and writing to localStorage under the hood.

### Challenges

**1. Wrong Vite setup command**

Running `npx create vite@latest todo-zustand` produced an error:

> You just ran `npx create`, which installs and runs this npm package named 'create'. You likely want `npm create`.

**Fix:** Use the correct command:
```bash
npm create vite@latest todo-zustand
```

**2. Default Vite page showing instead of the Todo app**

After running `npm run dev`, the browser showed the default Vite "Get started" page. The issue was that `src/App.jsx` still contained the original boilerplate code.

**Fix:** Open `src/App.jsx` in VS Code and replace all its contents with the App component code from Step 5 above.

---

## References

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zustand Persist Middleware](https://github.com/pmndrs/zustand#persist-middleware)
- [Vite Documentation](https://vitejs.dev/)
- [React Hooks — useState](https://react.dev/reference/react/useState)