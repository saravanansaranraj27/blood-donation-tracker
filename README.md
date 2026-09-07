# Blood Donation Tracker

> A high-performance, accessible health dashboard for tracking voluntary blood donation history, haemoglobin trends, and donor analytics.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3-0088cc?logo=recharts&logoColor=white)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](#license)

## Overview

Blood Donation Tracker is a responsive React application designed to help voluntary donors monitor their health metrics over time. It transforms raw donation records into actionable insights, including haemoglobin stability analysis, donation frequency patterns, and predictive scheduling for future donations. The app features a sophisticated dark/light theme system, custom SVG animations, and optimized data visualization.

## Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Using the App](#using-the-app)
- [Technical Highlights](#technical-highlights)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Development Commands](#development-commands)
- [Limitations](#limitations)
- [License](#license)

## Features

| Area                   | Capabilities                                                                                            |
| :--------------------- | :------------------------------------------------------------------------------------------------------ |
| **Health Dashboard**   | Real-time summary of total donations, average Hb, highest/lowest readings, and consistency status.      |
| **Data Visualization** | Interactive Area Chart for Hb trends and Bar Chart for annual donation frequency using Recharts.        |
| **Donor Analytics**    | Algorithmic calculation of average donation gaps and predictive "Next Donation" date estimation.        |
| **Theming**            | Persistent light/dark mode with smooth CSS variable transitions and glassmorphism UI effects.           |
| **Accessibility**      | Full keyboard navigation support, ARIA labels for interactive elements, and reduced-motion preferences. |
| **Responsive Design**  | Mobile-first layout ensuring readability on all device sizes.                                           |

## Quick Start

### Requirements

- Node.js 18 or newer
- npm

### Run Locally

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To create a production build:

```sh
npm run build
```

### Deploy to GitHub Pages

Install `gh-pages` as a dev dependency (only needed once):

```sh
npm install --save-dev gh-pages
```

Then build and deploy:

```sh
npm run build
npm run deploy
```

## Using the App

1. **Dashboard:** View the hero section for a quick snapshot of total donations and current health status.
2. **Trend Analysis:** Hover over the Haemoglobin Trend chart to see specific reading details for each donation.
3. **Analytics:** Check the "Donor Analytics" section to see your donation consistency and estimated next eligible date.
4. **Rhythm Strip:** Visualize your donation timeline in the "Donation Rhythm" section. Hover over markers for quick stats.
5. **Full Record:** Scroll to the bottom for a detailed tabular view of every recorded visit.
6. **Theme Toggle:** Use the button in the top-right corner to switch between Light and Dark modes.

## Technical Highlights

- **Performance Optimization:** Heavy components like `HbChart` and `YearlyChart` are wrapped in `React.memo` to prevent unnecessary re-renders during theme switches.
- **Custom Data Logic:** Implements a robust `parseDate` utility to handle chronological sorting and calculate statistical averages and gaps between donations.
- **Advanced CSS:** Uses CSS Custom Properties (Variables) for theming, `backdrop-filter` for glassmorphism effects, and complex keyframe animations for the pulse SVG.
- **Accessibility First:** Interactive elements like the "Rhythm Strip" use `role="button"` and `tabIndex` to ensure they are reachable via keyboard and readable by screen readers.

## Project Structure

```text
src/
  App.jsx         # Main application logic, data processing, and component composition
  index.css       # Global styles, theme variables, animations, and responsive media queries
  main.jsx        # Application entry point
public/
  vite.svg        # Favicon asset
index.html        # HTML shell with Google Fonts integration
```

## Technology Stack

- [React 19](https://react.dev/) – UI library
- [Vite 7](https://vitejs.dev/) – Build tool and dev server
- [Recharts](https://recharts.github.io//) – Composable charting library built on React
- [Lucide React](https://lucide.dev/) – Beautiful & consistent icon pack
- [Google Fonts](https://fonts.google.com/) – Inter and Sora typography

## Development Commands

```sh
npm install --save-dev gh-pages   # One-time setup for GitHub Pages deployment
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run deploy    # Publish dist/ with gh-pages
```

## Limitations

- This is a frontend-only demonstration. Data is hardcoded in `App.jsx` for presentation purposes.
- No backend database or user authentication is implemented.
- Designed as a personal portfolio showcase for UI/UX and React performance skills.

## License

This project is licensed under the MIT License.
