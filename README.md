# DevPortfolios

> Discover and browse over 2,000+ curated software engineer and developer portfolios worldwide with smart lazy-loaded live previews, A–Z letter filtering, and client-side persistence.

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github)](https://Aman22kr.github.io/dev-portfolios/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Highlights & Features

- **2,050+ Developer Portfolios**: Comprehensive directory parsed from the developer portfolios open-source catalog.
- **Smart Concurrent Iframe Queue**:
  - Cards start with an elegant skeleton placeholder.
  - Intersection Observer ensures iframes load only when visible in the viewport.
  - Active iframes are strictly limited to **4–6 concurrent frames** to maintain 60 FPS scrolling and low memory usage.
  - Automatic fallback to an initials monogram avatar if an iframe is blocked by `X-Frame-Options` or `Content-Security-Policy`.
- **Consistent Card Structure**:
  - Clean layout showing **Name + Link**, domain badge, and preview frame.
  - Includes dedicated square space for YouTube/video thumbnail showcase.
- **Modern Dark Theme**:
  - Deep space aesthetic (`#080a0f`) with radial gradient ambient mesh, crisp borders, and subtle glassmorphic navigation.
- **Client-Side Persistence (`localStorage`)**:
  - **Bookmarks / Favorites**: Save favorite portfolios across sessions with JSON export option.
  - **Search History**: Instant recall of previous search terms.
  - **View Mode**: Switch between interactive Grid preview cards and compact streamlined list.
- **Multi-Page Static Architecture**:
  - `/#/` - Home catalog with A–Z letter filters, search, platform filters, and infinite load.
  - `/#/portfolio/:slug` - Individual portfolio detail view with responsive desktop/tablet/mobile device simulator frames, prev/next navigation, copy URL, and share.
  - `/#/search` - Dedicated full-text search with platform filtering.
  - `/#/bookmarks` - Saved portfolios with batch export and management.
  - `/#/about` - Dataset origin, technical architecture, and maintainer credits.
  - `/#/contact` - Broken link reporting, update requests, and developer FAQ.
  - `/#/404` - Not Found fallback page.
- **Sponsor & Ad Section**: Dedicated bottom sponsorship banner on all pages.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Animations**: Framer Motion (Normal speed, strong easing)
- **Routing**: React Router (HashRouter for zero-config GitHub Pages compatibility)
- **Hosting**: GitHub Pages via GitHub Actions

---

## 🚀 Local Development

1. Clone repository:
   ```bash
   git clone https://github.com/Aman22kr/dev-portfolios.git
   cd dev-portfolios
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 GitHub Pages Deployment Guide

This project is configured for automated deployment to GitHub Pages under username **`Aman22kr`**:

1. Push this repository to your GitHub account: `https://github.com/Aman22kr/dev-portfolios`
2. Navigate to repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site at:
   `https://Aman22kr.github.io/dev-portfolios/`

---

## 📄 Attributions & Data Source

- **Original Dataset**: [Emma Bostian's developer-portfolios repository](https://github.com/emmabostian/developer-portfolios)
- **Reference Site**: [Developer Portfolios Directory](https://6e87v.hatchboxapp.com/portfolios)
- **Project Maintainer**: [Aman22kr](https://github.com/Aman22kr)
