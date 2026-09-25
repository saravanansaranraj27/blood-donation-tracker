# Blood Donation Tracker

> A high-performance, accessible health dashboard for tracking voluntary blood donation history, haemoglobin trends, and donor analytics.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3-0088cc?logo=recharts&logoColor=white)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](#license)

### 🌐 [Live Demo](https://saravanansaranraj27.github.io/blood-donation-tracker)

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

| Area                   | Capabilities                                                                                              |
| :--------------------- | :-------------------------------------------------------------------------------------------------------- |
| **Health Dashboard**   | Real-time summary of total donations, average Hb, highest/lowest readings, and consistency status.        |
| **Data Visualization** | Interactive Area Chart for Hb trends and Bar Chart for annual donation frequency using Recharts.          |
| **Donor Analytics**    | Algorithmic calculation of average donation gaps and predictive "Next Donation" date estimation.          |
| **Section Navigation** | Sticky top bar with scroll-spy active states, smooth-scroll section links, and a collapsible mobile menu. |
| **Theming**            | Persistent light/dark mode with smooth CSS variable transitions and glassmorphism UI effects.             |
| **Accessibility**      | Full keyboard navigation support, ARIA labels for interactive elements, and reduced-motion preferences.   |
| **Responsive Design**  | Mobile-first layout ensuring readability on all device sizes.                                             |
| **Polished UX**        | Skeleton loading state on first paint and a scroll-triggered "back to top" button.                        |

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
2. **Navigation:** Use the sticky top bar (or the mobile menu on small screens) to jump between sections; the active link highlights as you scroll.
3. **Trend Analysis:** Hover over the Haemoglobin Trend chart to see specific reading details for each donation.
4. **Analytics:** Check the "Donor Analytics" section to see your donation consistency and estimated next eligible date.
5. **Rhythm Strip:** Visualize your donation timeline in the "Donation Rhythm" section. Hover over markers for quick stats.
6. **Full Record:** Scroll to the bottom for a detailed tabular view of every recorded visit.
7. **Theme Toggle:** Use the button in the top-right corner to switch between Light and Dark modes.
8. **Back to Top:** Once you scroll past the hero, a floating button appears to jump back to the top instantly.

## Technical Highlights

- **Modular Architecture:** Code is split into `pages`, `layouts`, `components`, `hooks`, `data`, and `utils` directories instead of one monolithic component. The `Dashboard` page itself is now a thin orchestrator that composes focused `components/dashboard/*` pieces (header, hero, summary, trend, analytics, rhythm strip, record table) via two dedicated hooks.
- **Custom Hooks:** `useDashboardData` derives sorted records, stats, yearly stats, average gap, next donation estimate, and consistency data in one place; `useScrollNavigation` owns scroll-spy, smooth-scroll, and "back to top" behaviour, keeping `Dashboard.jsx` free of that logic.
- **Performance Optimization:** Heavy components like `HbChart` and `YearlyChart` are wrapped in `React.memo` to prevent unnecessary re-renders during theme switches.
- **Custom Data Logic:** `utils/date.js` provides a robust `parseDate` utility, and `utils/donationAnalytics.js` builds on it to handle chronological sorting and calculate statistical averages, yearly stats, donation gaps, next-donation predictions, and consistency status.
- **Custom Icon Set:** `Icons.jsx` hand-rolls a few SVG icons (droplet, sun/moon, menu/close, back-to-top arrow) and re-exports the rest from `lucide-react`, trimming what gets bundled.
- **Advanced CSS:** Theme tokens, base styles, and keyframe animations are split across `variables.css`, `themes.css`, and `globals.css`, using CSS Custom Properties for theming, `backdrop-filter` for glassmorphism effects, and complex keyframe animations for the pulse SVG.
- **Accessibility First:** Interactive elements like the "Rhythm Strip" use `role="button"` and `tabIndex` to ensure they are reachable via keyboard and readable by screen readers.

## Project Structure

```text
src/
  App.jsx                       # Entry component, renders MainLayout
  Icons.jsx                     # Custom SVG icons + re-exported lucide-react icons
  main.jsx                      # Application entry point
  assets/
    hero.png                     # Hero artwork
    react.svg                    # React logo asset
    vite.svg                     # Vite logo asset
  layouts/
    MainLayout.jsx               # Top-level layout wrapper
  pages/
    Dashboard/Dashboard.jsx      # Page orchestrator: composes dashboard components via hooks
  components/
    charts/HbChart.jsx           # Haemoglobin trend area chart
    charts/YearlyChart.jsx       # Annual donation frequency bar chart
    common/Loader.jsx            # Skeleton loading state
    dashboard/
      DashboardHeader.jsx        # Sticky top nav bar with theme toggle and mobile menu
      DashboardHero.jsx          # Hero section with pulse SVG and quick stats
      DonationSummary.jsx        # Summary stat cards (total, average, highest/lowest)
      HemoglobinTrend.jsx        # Hb trend section wrapping HbChart
      DonorAnalytics.jsx         # Consistency status, average gap, next donation, yearly chart
      DonationRhythm.jsx         # Interactive donation timeline/rhythm strip
      DonationRecordTable.jsx    # Full tabular donation record view
      SectionHeader.jsx          # Shared section heading component
  hooks/
    useTheme.js                  # Light/dark theme state, synced to <html data-theme>
    useDashboardData.js          # Derives sorted records, stats, gaps, and consistency data
    useScrollNavigation.js       # Scroll-spy, smooth-scroll, and back-to-top behaviour
  data/
    donor.js                     # Donor profile and donation records
    navigation.js                # Section nav links
  utils/
    date.js                      # parseDate utility for chronological sorting
    donationAnalytics.js         # Stats, yearly stats, gaps, next-donation, consistency logic
  styles/
    variables.css                # Design tokens
    themes.css                   # Light/dark theme values
    globals.css                  # Global styles, layout, and animations
public/
  favicon.svg                    # Favicon asset
  icons.svg                      # Additional icon assets
index.html                       # HTML shell with Google Fonts integration
```

## Technology Stack

- [React 19](https://react.dev/) – UI library
- [Vite 7](https://vitejs.dev/) – Build tool and dev server
- [Recharts 3](https://recharts.github.io//) – Composable charting library built on React
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

- This is a frontend-only demonstration. Data is hardcoded in `src/data/donor.js` for presentation purposes.
- No backend database or user authentication is implemented.
- Designed as a personal portfolio showcase for UI/UX and React performance skills.

## License

This project is licensed under the MIT License.
