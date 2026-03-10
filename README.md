# النون | Anoon

> *"We don't just build software  we build the human spirit."*

**Anoon** is a Palestinian tech company and social impact organization built by and for a generation rebuilding itself from the ground up. This repository is the official website  a bilingual (Arabic / English), RTL-aware platform that showcases Anoon's programs, impact, team, and tech services.

---

## What Is Anoon?

Anoon operates at the intersection of **technology**, **education**, and **social resilience**. Formed in the aftermath of conflict in Palestine and Gaza, it empowers students, freelancers, and communities with practical tech skills and a platform to grow  because knowledge is the one thing that can never be taken away.

### Programs

| Program | Description |
|---|---|
| **Tamkeen** | Empowering freelancers and students with skills, tools, and a network to rebuild their livelihoods |
| **Noon Hub** | A creative space for learning, collaboration, and professional development |
| **Space Noon Training** | Tech training programs (graphic design, web, and more) for students and young professionals in Gaza |
| **Tech Agency** | Professional software and tech solutions offered to clients regionally |
| **Tech Blog** | Articles, guides, and insights from the Anoon community |

### Impact (2+ Years)
- **11,000+** freelancers and students reached
- **50%** freelancer success rate
- **3** technical training courses
- **400** students trained per year

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + React 19 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Database | [Supabase](https://supabase.com) (PostgreSQL) |
| Rich Text | [TipTap](https://tiptap.dev) editor |
| Animations | [GSAP](https://gsap.com) |
| Image Uploads | [Cloudinary](https://cloudinary.com) |
| AI Chat | [Groq SDK](https://groq.com) |
| Caching | [TanStack Query v5](https://tanstack.com/query) + IndexedDB |
| i18n | [i18next](https://www.i18next.com)  Arabic (RTL) & English |
| Email | [Nodemailer](https://nodemailer.com) |
| Font | [Alexandria](https://fonts.google.com/specimen/Alexandria) via `next/font` |
| Deployment | [Vercel](https://vercel.com) |

---

## Features

- **Fully bilingual**  Arabic (RTL) and English with seamless language switching
- **Admin dashboard**  manage training programs, courses, and blog articles with a rich text editor
- **AI chat widget**  powered by Groq for real-time visitor assistance
- **Tech Blog**  full CRUD with slug-based routing, likes, views, and comments
- **Contact form**  with Google reCAPTCHA (lazy-loaded) and email delivery
- **Performance-optimised**  self-hosted fonts, WebP images, dynamic imports, composited animations, bfcache-compatible headers

---

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io) (recommended)

### Install & Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GROQ_API_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
EMAIL_USER=
EMAIL_PASS=
```

### Build

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
src/
 app/                   # Next.js App Router pages & API routes
    api/               # REST API (auth, articles, chat, contact, upload)
    dashboard/         # Admin dashboard
    tamkeen/           # Tamkeen program page
    noonHub/           # Noon Hub page
    spaceNoonTraining/ # Space Noon Training page
    techAgency/        # Tech Agency page
    techBlog/          # Blog listing + [slug] detail
 components/
    common/            # Shared sections (Hero, Impact, Partners)
    home/              # Home page sections
    layout/            # Navbar, Footer, PageWrapper
    ui/                # Design system primitives (Button, Card)
 hooks/                 # useRTL, useAnimation, useArticles
 lib/                   # Supabase clients, i18n, cache, utils
 models/                # Mongoose models (legacy)
public/
 locales/
     en/common.json     # English translations
     ar/common.json     # Arabic translations
```

---

## License

Private  all rights reserved  Anoon LLC.
