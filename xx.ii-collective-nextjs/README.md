# XX.II Collective - Next.js

Modern luxury fashion e-commerce built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Next.js 15** with App Router
- **React 19** for latest features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **SEO Optimized** with metadata, Open Graph, sitemap, and robots.txt
- **Smart Component Architecture** with UI, features, and layout components
- **Server Components** by default for better performance
- **Image Optimization** with Next.js Image component

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── shop/              # Shop and product pages
│   ├── cart/              # Shopping cart
│   ├── profile/           # User profile
│   ├── login/             # Authentication
│   ├── journal/           # Blog/editorial
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # robots.txt
│   └── sitemap.ts         # sitemap.xml
├── components/
│   ├── ui/               # Reusable UI components
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── icons/            # Icon components
├── lib/
│   ├── data.ts           # Mock data
│   ├── store.ts          # Zustand store
│   └── utils.ts          # Utility functions
└── types/                # TypeScript types
```

## Build

```bash
npm run build
npm start
```

## SEO

- All pages have proper metadata
- Open Graph tags for social sharing
- Dynamic sitemap generation
- Robots.txt configuration
- Semantic HTML structure
