# For Raji - A Love Story in Chapters

A dreamy, cinematic scrollytelling experience built with Next.js 14, Framer Motion, Lenis, and React Three Fiber.

## Getting Started

```bash
npm run dev
```

Open http://localhost:3000 to preview.

## Adding Midjourney Images

Drop your 8 background images into `public/images/` with these exact filenames:

```
public/images/01-hero.jpg
public/images/02-food-court.jpg
public/images/03-college-gate.jpg
public/images/04-coconut-pudding.jpg
public/images/05-endless-talks.jpg
public/images/06-bus-ride.jpg
public/images/07-us.jpg
public/images/08-stars.jpg
```

Then open `src/components/Stage.tsx` and update each layer's style from `background: grad` to:

```tsx
style={{
  backgroundImage: `url('/images/01-hero.jpg')`,  // use the matching filename
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: activeScene === i ? 1 : 0,
  transitionDuration: "1.4s",
  transitionTimingFunction: "ease-in-out",
}}
```

Tip: keep the gradients as fallbacks by combining both properties.

## Adding Music

Place your audio file at:

```
public/audio/song.mp3
```

The music toggle button (top-right) will pick it up automatically. It loops and is off by default.

## Deploy to Vercel

1. Push to a GitHub repo
2. Go to vercel.com/new and import the repo
3. No special config needed - it deploys as a static Next.js site
4. Custom domain optional

Or via CLI:

```bash
npx vercel --prod
```

## Tech Stack

- **Next.js 14** App Router
- **Framer Motion** scroll-tied animations (useScroll + useTransform)
- **Lenis** smooth scrolling
- **React Three Fiber** particle field (150 particles, mouse-reactive)
- **Tailwind CSS** styling
- **next/font** with Fraunces (display) + Inter (body)
