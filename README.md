# 🌐 CodeCraft Landing Page

![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?style=for-the-badge&logo=astro)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![PostCSS](https://img.shields.io/badge/PostCSS-8.4-DD3A0A?style=for-the-badge&logo=postcss)

The **CodeCraft Landing Page** is the public face of the IIE HackLab's hackathon. It features a high-impact, neon-futuristic UI designed to captivate potential participants, showcase event details, and drive registrations.

---

## 🛠️ Tech Stack

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
