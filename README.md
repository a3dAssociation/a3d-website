\# A3D — The Association for Democratic Discourse and Discussion



\*\*Monochrome academic site (React + Vite + Tailwind + Framer Motion)\*\*  

Badge: \*\*A3D\*\* — Full name centered on site. Mission line: “state is welfare?”



This repository contains the single-file React prototype for A3D (see `src/App.jsx` / `src/App.tsx`). The site is designed to be deployed as a static site (Vite build) and served via Vercel (recommended) or Netlify / GitHub Pages.



---



\## Quick links

\- Tech stack: React (Vite) · Tailwind CSS · Framer Motion · React Router · Lucide icons  

\- Recommended host: \*\*Vercel\*\* (auto deploy from GitHub, PR previews, HTTPS, easy domain setup)  

\- Alternative hosts: Netlify (good forms support), GitHub Pages (basic static hosting)



---



\## Local development (setup)



1\. Ensure Node.js (v18+) and npm/yarn installed.



2\. Create a new Vite React project (if you started from the single-file code, skip to step 4):



```bash

\# JavaScript template (recommended)

npm create vite@latest a3d -- --template react

cd a3d



\# OR TypeScript

npm create vite@latest a3d -- --template react-ts

cd a3d



