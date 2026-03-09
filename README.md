# Finance Tracker

A personal finance tracking web application built with Vue 3 and TypeScript. Track your income and expenses, visualise your spending by category, set budgets, and manage savings targets — all from a clean, responsive interface.

![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss) ![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6e9f18?logo=vitest)

🚀 **[Live Demo](https://robert-finance-tracker.vercel.app/)**

---

## Features

- **Transaction management** — add, edit, and delete transactions with a category, amount, and date
- **Recurring expenses** — configure monthly recurring expenses with automatic transaction generation
- **Expense distribution** — pie chart breaking down spending by category with remaining budget visualised
- **Budget screen** — configure monthly earnings and fixed/variable recurring expenses
- **Savings targets** — set a savings goal with a target date and starting amount, track contributions with a dynamic progress bar
- **Edit functionality** — edit transactions, recurring expenses, and savings contributions in place
- **Dark mode** — full dark mode support, persisted across sessions
- **Multi-currency support** — switch between Pound Sterling, Romanian Leu, and Euro
- **Multilingual** — full English and Romanian language support including category translations
- **Persistent data** — all data is saved to localStorage and survives page refreshes
- **Active route highlighting** — navigation bar highlights the current page

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Vue 3 (Composition API)             |
| Language         | TypeScript                          |
| State management | Pinia + pinia-plugin-persistedstate |
| Styling          | Tailwind CSS v4                     |
| Routing          | Vue Router                          |
| Charts           | Chart.js                            |
| Testing          | Vitest                              |
| Build tool       | Vite                                |
| Deployment       | Vercel                              |

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
├── components/       # Reusable Vue components
│   ├── add-savings-contribution-form.vue
│   ├── clear-all-transactions-modal.vue
│   ├── edit-contribution-modal.vue
│   ├── edit-recurring-expense-modal.vue
│   ├── edit-transaction-modal.vue
│   ├── expense-pie-chart.vue
│   ├── monthly-earnings-form.vue
│   ├── navigation-bar.vue
│   ├── recurring-expenses-table.vue
│   ├── recurring-transaction-form.vue
│   ├── rent-expense-form.vue
│   ├── savings-progress-bar.vue
│   ├── savings-target-form.vue
│   ├── savings-tracker-table.vue
│   ├── summary-bar.vue
│   ├── transaction-form.vue
│   └── transactions-table.vue
├── composables/      # Reusable composition functions
│   ├── useCategory.ts
│   ├── useCurrency.ts
│   └── useDate.ts
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
│   ├── globals-store.ts
│   └── savings-store.ts
├── views/            # Page-level components
│   ├── budget-screen.vue
│   ├── home-screen.vue
│   ├── savings-targets-screen.vue
│   └── settings-screen.vue
├── enums.ts          # Shared enums
├── types.ts          # Shared TypeScript types
└── App.vue           # Root component
```

---

## Data Persistence

This app has no backend. All data is persisted locally in the browser using `localStorage` via `pinia-plugin-persistedstate`. Data will persist indefinitely across sessions until browser storage is manually cleared. As a result, data is browser and device specific and will not sync across devices.

---

## What's Built

All core features are complete and functional:

- Transaction management with full CRUD
- Recurring expense automation
- Savings targets with contribution tracking and progress visualisation
- Dark mode, multi-currency, and bilingual (EN/RO) support
- Persistent local storage across sessions
