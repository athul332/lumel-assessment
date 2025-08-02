# 🧩 React + Vite Hierarchical Table

A modern React + Vite application featuring a hierarchical (nested) table with allocation and variance logic, error feedback via Toaster, and beautiful SCSS styling. Built for maintainability and developer experience with TypeScript, ESLint, and Prettier.

## 🚀 Features

- Hierarchical table with expandable/collapsible rows
- Allocation by percentage or value, with automatic distribution to child rows
- Variance calculation and display
- Error feedback using a Toaster component
- Modern SCSS modules with BEM naming
- TypeScript for type safety
- ESLint & Prettier for code quality

## 🛠️ Technologies Used

<div style="display: flex; gap: 8px; flex-wrap: wrap;">
  <span style="background: #e0e7ff; color: #333; border-radius: 16px; padding: 6px 16px; font-weight: 500; font-size: 1em; margin: 2px;">React</span>
  <span style="background: #e0e7ff; color: #333; border-radius: 16px; padding: 6px 16px; font-weight: 500; font-size: 1em; margin: 2px;">Vite</span>
  <span style="background: #e0e7ff; color: #333; border-radius: 16px; padding: 6px 16px; font-weight: 500; font-size: 1em; margin: 2px;">TypeScript</span>
  <span style="background: #e0e7ff; color: #333; border-radius: 16px; padding: 6px 16px; font-weight: 500; font-size: 1em; margin: 2px;">SCSS Modules</span>
  <span style="background: #e0e7ff; color: #333; border-radius: 16px; padding: 6px 16px; font-weight: 500; font-size: 1em; margin: 2px;">BEM</span>
  <span style="background: #e0e7ff; color: #333; border-radius: 16px; padding: 6px 16px; font-weight: 500; font-size: 1em; margin: 2px;">ESLint</span>
  <span style="background: #e0e7ff; color: #333; border-radius: 16px; padding: 6px 16px; font-weight: 500; font-size: 1em; margin: 2px;">Prettier</span>
</div>

## 📦 Setup Instructions

### Prerequisites

- **Node.js v20** (required)
- **npm** (comes with Node.js)

### Install & Run Locally

```bash
# Clone the repository
$ git clone <your-repo-url>
$ cd assessment

# Install dependencies
$ npm install

# Start the development server
$ npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Lint & Format

```bash
# Lint code
$ npm run lint

# Format code (if Prettier is set up)
$ npx prettier --write .
```

## 📚 Project Structure

```
src/
  components/
    HierarchialTable/
      HierarchicalTable.tsx
      HierarchicalTable.module.scss
      messages.ts
    Toaster.tsx
    Toaster.module.scss
  App.tsx
  main.tsx
  index.css
```

## 📝 License

MIT
