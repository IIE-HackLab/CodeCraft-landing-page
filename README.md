# 🌐 CodeCraft Landing Page

# CodeCraft Landing Page

The public landing page for the IIE Tech Club's CODECRAFT 2026 hackathon. It is built as a static Astro site with an interactive React page island, shared CSS, and responsive navigation.

## Stack

- Astro 7 with static output
- React 19 and Framer Motion for interactive sections
- Tailwind CSS 4 through the Vite plugin
- TypeScript for the React island and Astro type checking

## Development

```bash
npm install
npm run dev
```

Build and preview the production output with:

```bash
npm run build
npm run preview
```

## Structure

- `src/pages/`: Astro route entrypoints and page-level data
- `src/components/`: reusable navigation, footer, loader, cursor, and React UI
- `src/lib/siteConfig.ts`: shared canonical URL and SEO metadata
- `src/styles/global.css`: global design system and section styles
- `src/assets/`: optimized source images and icons
- `public/`: browser and crawler-facing static files
- Organizer profiles
