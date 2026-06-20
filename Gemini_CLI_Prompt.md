Create a fully immersive, 3D cinematic, modern, and highly engaging scroll-driven landing page using an ultra-premium Glassmorphism design language. The website should feel alive, futuristic, and stimulate dopamine through beautiful micro-interactions, smooth scroll-triggered animations, and vibrant visual aesthetics.

### 1. DESIGN SYSTEM & VISUAL AESTHETICS (Glassmorphism & Depth)

- **Background**: Dark mode by default. Deep space backdrop with dynamic, floating colorful mesh gradients (aurora borealis effect in neon hues like Electric Purple, Cyber Pink, and Emerald Teal) that slowly shift or drift.
- **Glassmorphism Panels**: UI cards must feature frosted glass effects: `backdrop-blur-md`, semi-transparent white fills (`bg-white/10` or `bg-slate-900/40`), and thin, glowing borders (`border border-white/20` or gradient borders) with a subtle drop shadow (`shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]`).
- **Typography**: Editorial, high-contrast typography. Use a futuristic/geometric font pairing (e.g., Syne or Outfit for massive bold headings, Inter for clean readable body copy). Headings should feature glowing text-shadows or metallic gradient fills.
- **3D Cinematic feel**: Simulate physical depth. Background elements should move slower than foreground glass cards (parallax scrolling). Elements should float gently with keyframe animations.

### 2. HERO SECTION (The Dopamine Hook)

- A gigantic, center-stage Glassmorphism console or floating card with a subtle 3D hover rotation (tilt effect using CSS transforms).
- A magnetic main Call-to-Action button that pulls toward the cursor, with a neon-glowing border and a sweeping light-streak reflection animation across the face of the button on hover.
- Background: Glowing particle systems floating around the card.
- Text: Bold, cinematic headline that reveals itself with a typewriter or character-by-character slide-up fade-in animation on load.

### 3. INTERACTIVE BENTO GRID SECTION (Sleek Dashboards)

- A modern Bento Grid layout showcasing features or stats.
- **Interactive Widgets**:
  1. **Dynamic Stats Tracker**: A panel showing key numbers (e.g. users, operations, uptime) with animated count-ups, accompanied by a glowing sparkline mini-graph that updates dynamically.
  2. **Active Dial Card**: An interactive circular progress dial or glowing radar chart that responds dynamically when hovered.
  3. **Live Tech Stack Terminal**: A miniature terminal panel that simulates real-time console logging/compiling on hover.
- Every card in the grid must zoom slightly and increase its glow/blur on hover.

### 4. CINEMATIC FEATURE SHOWCASE (Scroll-Driven Journey)

- As the user scrolls, a series of floating glass layers slide from the sides, stacking on top of each other.
- Implement tabbed feature-cards where switching tabs triggers a smooth, morphing transition of the content panel with a particle blast effect (using a CSS particle effect or subtle SVG animations).
- Use rich icons from Lucide React, colored in matching neon gradients.

### 5. INTERACTIVE GLASSMORPHIC CONTACT & ENGAGEMENT

- A futuristic contact form with floating label inputs styled in glassmorphism (glass backgrounds, glowing focus rings).
- Upon submission, trigger an immediate dopamine-inducing feedback loop: a smooth checkmark animation, a confetti burst (created with HTML5 canvas or simple CSS animations), and a glowing success modal that slides down.

### 6. TECHNICAL SPECIFICATION & PERFORMANCE

- Built with React, Tailwind CSS, and Lucide React icons.
- Ensure ultra-smooth scrolling using standard CSS scroll-behavior or framer-motion-like hooks.
- Code should be clean, modular, and optimized (avoiding heavy canvas loops that freeze browsers by using hardware-accelerated CSS transforms and transitions).
- Fully responsive on mobile, desktop, and tablets (collapsing bento grid grids into single columns beautifully, keeping backdrop blurs lightweight).

start building it, then after verification deploy it to the production.

Push latest changes to production:-
https://github.com/Warriorlegacy/sewarthpathsansthanam.git

https://sewarthpathsansthanam.vercel.app/
