# My Portfolio

![My Portfolio](https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=300&fit=crop&auto=format,compress)

A stunning developer portfolio built with **Next.js 16** and **Cosmic CMS**. Showcase your projects, skills, and work experience with a modern, responsive design that makes a lasting impression.

## Features

- 🚀 **Next.js 16 App Router** — Server-side rendering for blazing fast performance
- 🎨 **Modern UI Design** — Clean, professional aesthetic with smooth animations
- 📱 **Fully Responsive** — Pixel-perfect on mobile, tablet, and desktop
- 🛠️ **Project Showcase** — Filterable grid with screenshots, tech stacks, and links
- 💡 **Skills Display** — Categorized skills with proficiency indicators
- 💼 **Work Timeline** — Professional experience with company details
- 🔍 **SEO Optimized** — Proper meta tags and semantic HTML
- ⚡ **TypeScript** — Full type safety throughout the application
- 🎯 **Cosmic CMS** — Dynamic content management with real-time updates

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a4f5259421a15035097547&clone_repository=69a4f6719421a150350975d8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a developer portfolio with projects (including screenshots, tech stack, and live URLs), skills, and work experience."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'My Portfolio'. The content is managed in Cosmic CMS with the following object types: projects, skills, work-experience. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Inter Font](https://fonts.google.com/specimen/Inter) — Modern sans-serif typeface

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the portfolio content models

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file with your Cosmic credentials:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Skills by Category
```typescript
const { objects: skills } = await cosmic.objects
  .find({ type: 'skills' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Work Experience
```typescript
const { objects: experiences } = await cosmic.objects
  .find({ type: 'work-experience' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three content types from Cosmic:

| Content Type | Slug | Fields |
|---|---|---|
| Projects | `projects` | description, screenshot, tech_stack, live_url, source_url, featured |
| Skills | `skills` | name, category, proficiency, icon |
| Work Experience | `work-experience` | company, role, start_date, end_date, currently_working, description |

All content is fetched server-side using the Cosmic SDK, ensuring fast load times and SEO-friendly rendering.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables in the Netlify dashboard
5. Deploy!

<!-- README_END -->