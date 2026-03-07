# Finance Tracker

A personal finance tracking web application built with Vue 3 and TypeScript. Track your income and expenses, visualise your spending by category, set budgets, and manage savings targets — all from a clean, responsive interface.

![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss) ![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6e9f18?logo=vitest)

---

## Features

- **Transaction management** — add and delete transactions with a category, amount, and date
- **Expense distribution** — pie chart breaking down spending by category with remaining budget visualised
- **Summary bar** — at-a-glance view of total income, total expenses, and current balance
- **Budget screen** — configure monthly earnings and recurring expenses (e.g. rent) with automatic transaction generation
- **Savings targets** — set and track progress toward personal savings goals
- **Multi-currency support** — switch between currencies in settings
- **Multilingual** — full English and Romanian language support
- **Dark mode** — toggle between light and dark themes
- **Persistent data** — all data is saved to localStorage and survives page refreshes

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Vue 3 (Composition API)             |
| Language         | TypeScript                          |
| State management | Pinia + pinia-plugin-persistedstate |
| Styling          | Tailwind CSS                        |
| Routing          | Vue Router                          |
| Charts           | Chart.js                            |
| Testing          | Vitest                              |
| Build tool       | Vite                                |

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Robert-Pavaloiu/finance-app.git

# Navigate into the project
cd finance-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Running tests

```bash
npm run test
```

### Building for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── __tests__/        # Vitest test files
├── assets/           # Static assets
├── components/       # Reusable Vue components
├── router/           # Vue Router configuration
├── stores/           # Pinia store (globals-store.ts)
├── views/            # Page-level components
├── enums.ts          # Shared enums
├── types.ts          # Shared TypeScript types
└── App.vue           # Root component
```

---

## Data Persistence

This app has no backend. All data is persisted locally in the browser using `localStorage` via `pinia-plugin-persistedstate`. Data will persist indefinitely across sessions until browser storage is manually cleared. As a result, data is browser and device specific and will not sync across devices.

---

## Roadmap

- [ ] Edit existing transactions
- [ ] Savings Targets
- [ ] CSV export
- [ ] Mobile responsive polish
