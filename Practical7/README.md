# Practical 7 — Data Visualization Dashboard

A React-based analytics dashboard built as part of a Web Development practical exercise. The project demonstrates how to implement and integrate multiple charting libraries to display meaningful data visualizations in a responsive layout.

---

## Overview

This project implements a **Sales Analytics Dashboard** featuring four interactive charts, each built using either Recharts or Chart.js (via react-chartjs-2). The dashboard displays sales performance, product distribution, customer acquisition, and weekly visitor data in a clean two-column grid layout.

---

## Features

- Line chart showing monthly sales, profit, and target trends
- Pie chart displaying product category distribution
- Stacked bar chart for new vs returning customer acquisition
- Area chart visualizing weekly visitor traffic
- Fully responsive layout across all screen sizes
- Interactive tooltips on all charts
- Clean card-based dashboard UI

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework and build tool |
| Recharts | Line chart and Pie chart |
| Chart.js + react-chartjs-2 | Bar chart and Area chart |
| date-fns | Date formatting for chart labels |
| CSS | Dashboard layout and card styling |

---

## Project Structure

```
Practical7/
├── public/
├── src/
│   ├── components/
│   │   ├── MonthlySalesChart.jsx
│   │   ├── ProductCategoryChart.jsx
│   │   ├── customerAcquisitionChart.jsx
│   │   └── WeeklyVisitorsChart.jsx
│   ├── data/
│   │   └── salesData.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download the repository into your project folder:

```bash
cd Practical7
```

2. Install dependencies:

```bash
npm install
```

3. Install charting libraries:

```bash
npm install recharts chart.js react-chartjs-2 date-fns
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to:

```
http://localhost:5173
```

---

## Charts Implemented

### 1. Monthly Sales Chart (Recharts — Line Chart)
Displays monthly sales, profit, and target figures across a 12-month period. The target line is rendered as a dashed line to distinguish it from actual performance metrics.

### 2. Product Category Chart (Recharts — Pie Chart)
Shows the proportional breakdown of sales across five product categories: Electronics, Clothing, Food, Books, and Other. Each segment is colour-coded with percentage labels.

### 3. Customer Acquisition Chart (Chart.js — Stacked Bar Chart)
Compares new and returning customers on a monthly basis using a stacked bar format, making it easy to see both total volume and customer composition at a glance.

### 4. Weekly Visitors Chart (Chart.js — Area Chart)
Tracks weekly visitor traffic over eight weeks. The filled area beneath the line gives a stronger visual sense of traffic volume over time.

---

## Data

All chart data is stored locally in `src/data/salesData.js` and exported as named constants:

- `monthlySales` — used by MonthlySalesChart
- `productSales` — used by ProductCategoryChart
- `customerData` — used by CustomerAcquisitionChart
- `weeklyVisitors` — used by WeeklyVisitorsChart

---

## Reflection

### What I Learned

Before this practical, I had a general understanding of React components, but I had never worked with charting libraries before. This exercise gave me hands-on experience with two of the most widely used ones — Recharts and Chart.js — and helped me understand that they each have their own strengths and approaches.

Recharts felt very natural to work with in React because its charts are written as JSX components, which fits right into the way React applications are structured. I found it intuitive to pass data as props and compose charts by nesting child components like `<Line>`, `<XAxis>`, and `<Tooltip>` inside a parent chart component.

Chart.js through react-chartjs-2 required a bit more setup, particularly the need to manually register components using `ChartJS.register()` before they could be used. At first this felt like extra boilerplate, but I came to appreciate that it gives you more control over exactly what gets loaded and how the chart behaves.

### Challenges Faced

The biggest challenge I encountered was during the initial project setup. Running `npm run dev` failed with a `'vite' is not recognized` error because the project folder had not been created properly using the Vite template. I resolved this by reinitialising the project using `npm create vite@latest` with the React template, which ensured all the necessary configuration files were in place.

Another small challenge was understanding the difference between how Recharts and Chart.js handle responsive sizing. Recharts uses a `<ResponsiveContainer>` wrapper component, while Chart.js relies on `responsive: true` and `maintainAspectRatio: false` in the options object. Once I understood this pattern, applying it consistently across all four charts was straightforward.

### What I Would Do Differently

If I were to redo this practical, I would spend more time exploring the customisation options each library offers — such as adding animations, custom tooltips, or click interactions. I would also look into fetching real data from an API rather than using static local data, as that would make the dashboard much closer to a real-world application.

### Overall

This practical gave me a solid foundation in data visualization for the web. Being able to turn a plain data array into a clear, interactive chart is a genuinely useful skill, and I can see myself applying it in future projects where communicating data clearly to users is important.