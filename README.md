# 🌐 CodeCraft Landing Page

![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?style=for-the-badge&logo=astro)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![PostCSS](https://img.shields.io/badge/PostCSS-8.4-DD3A0A?style=for-the-badge&logo=postcss)

The **CodeCraft Landing Page** is the public face of the IIE HackLab's hackathon. It features a high-impact, neon-futuristic UI designed to captivate potential participants, showcase event details, and drive registrations.

---

## 🛠️ Tech Stack

- **Framework**: Astro 5 (Static Site Generation)
- **Styling**: Tailwind CSS 3 + Vanilla CSS (Custom neon effects)
- **Interactivity**: Vanilla JS (Loader, countdown, scroll reveals)
- **Optimization**: PostCSS & Autoprefixer

---

## 📂 Repository Structure

| Path | Purpose |
| :--- | :--- |
| `src/pages/` | Entry point and main page logic (`index.astro`) |
| `src/components/` | Reusable Astro components (e.g., `Navbar`) |
| `src/styles/` | Global design system and section-specific styles |
| `src/assets/` | Media assets (images, SVGs) |
| `public/` | Static public assets |

---

## 🔄 Way of Working (Logic Flow)

```mermaid
graph TD
    A[Public Visitor] --> B[Preloader Experience]
    B --> C[Hero & Countdown]
    C --> D[Timeline Discovery]
    D --> E[Prizes & Rules Nexus]
    E --> F[Organizer Showcase]
    F --> G[Registration Modal]
    G --> H[Redirect to Student Portal]
```

---

## 🚀 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Build for Production**:

   ```bash
   npm run build
   ```

4. **Preview Build**:

   ```bash
   npm run preview
   ```

---

## 📝 Content Management

Most site content is managed via constants at the top of `src/pages/index.astro`. This includes:
- Event timeline
- Prize pools
- Participation rules
- Organizer profiles
