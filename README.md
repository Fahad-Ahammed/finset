# FinSight Dashboard

**Live Demo:** [https://finset-five.vercel.app/](https://finset-five.vercel.app/)

A frontend-only financial tracking dashboard built with Next.js, React, Redux Toolkit, and Recharts. Track income, expenses, budgets, and insights with role-based access control.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Redux Toolkit** for state management
- **Recharts** for data visualizations
- **Tailwind CSS 4** for styling
- **Lucide React** for icons

## Features

- Summary cards with month-over-month trends (balance, income, expense, savings)
- Money flow bar chart and budget donut chart
- Transaction table with search, filters, sorting, and pagination
- Add/edit transactions (admin mode)
- Viewer/Admin role toggle
- Responsive layout with collapsible sidebar

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start dev server           |
| `npm run build` | Production build           |
| `npm run start` | Serve production build     |
| `npm run lint`  | Run ESLint                 |

## Project Structure

```
src/
├── app/                  # Pages (dashboard, transactions)
├── components/           # UI components (charts, header, sidebar, transaction list)
├── data/data.json        # Seed data (categories, transactions, insights)
├── store/                # Redux store, slices, selectors, typed hooks
├── styles/globals.css    # Tailwind import
└── types/finance.ts      # TypeScript interfaces
```

## Roles

- **Viewer** — read-only access to dashboard and transactions
- **Admin** — can add and edit transactions
