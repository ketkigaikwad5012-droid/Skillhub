# SkillHub — Workshop Booking Platform

A modern, mobile-first React application for students to discover and book hands-on workshops.

**Live Demo:** ** https://agent-69dd1f9c2c8ff841fc3572cb--skillhubedu.netlify.app/
** Documentation:\*\*

- [Deployment Guide](./DEPLOYMENT.md) - How to deploy to GitHub & Netlify
- [Contributing Guide](./CONTRIBUTING.md) - Development guidelines
- [Design Details](#design-reasoning) - UX/UI decisions explained below

---

## Pages & Features

| Page             | Route (State)    | Description                                           |
| ---------------- | ---------------- | ----------------------------------------------------- |
| Landing Page     | `home`           | Hero, stats, why section, featured workshops, CTA     |
| Register         | `register`       | 2-step form — account info then student details       |
| Login            | `login`          | Email + password with demo login shortcut             |
| Dashboard        | `dashboard`      | Overview card, stats, progress, my bookings, upcoming |
| Profile          | `profile`        | Edit info, notification prefs, security settings      |
| Workshop Listing | `workshops`      | Search, filter by category + level, sortable grid     |
| Workshop Detail  | `workshopDetail` | Tabbed detail — overview, learn, instructor, schedule |
| Confirmation     | `confirmation`   | Animated success + booking summary + next steps       |

---

## Setup & Installation

```bash
# 1. Clone / extract the project
cd skillhub

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open in browser
http://localhost:3000
```

> **Quick test:** Use the "Continue as demo student" button on the login page to skip registration.

---

## Design Reasoning

### What Design Principles Guided These Improvements?

1. **Visual hierarchy first**
   - Every screen answers one clear question
   - Information is layered — most important visible immediately, detail available on demand
   - Example: Dashboard shows learning overview first, then stats, then my bookings

2. **Mobile-first & accessible design**
   - Base styles target 375px screens using `clamp()` for fluid scaling
   - Touch targets are 44×44px minimum (WCAG guideline)
   - All interactive elements have focus states for accessibility

3. **Colour with meaning**
   - Single accent color (violet `#6C63FF`) for CTAs and active states
   - Category colors are semantic: Design (violet), Tech (blue), Data (amber)
   - Users learn to associate colors with content type, not just decoration

4. **Typography that breathes**
   - Multiple font families: `Syne` (display), `Manrope` (body), `Poppins` (accent), `Inter` (mono)
   - Generous letter-spacing on headings (1.2px - 1.5px) prevents compressed look
   - Line-height: 1.5+ for large text ensures readability
   - Font weights: 600-700 for headings (lighter than 800) creates modern feel

5. **Performance-first approach**
   - No animation libraries (CSS animations only)
   - No image assets (SVG icons inline, avatar initials only)
   - CSS custom properties for theming (zero runtime cost)
   - Google Fonts preconnect for faster loading

6. **Motion with purpose**
   - Animations happen at 4 moments: fade-in, hover, success, and interactive reveals
   - No looping animations — every motion communicates state change
   - Spring animations for success states (celebrate the booking!)

7. **Low-friction booking flow**
   - User reaches booking CTA within 2 taps from home
   - Registration split into 2 focused steps
   - "Demo login" removes sign-up friction for first-time users
   - Sticky booking button on mobile detail pages

### How Did You Ensure Responsiveness Across Devices?

**Responsive Strategy:**

- Mobile-first CSS with `clamp()` for fluid typography
- CSS Grid with `auto-fill, minmax()` — cards reflow from 1 column (mobile) to 3 (desktop) naturally
- Flex layouts with wrap for horizontal rows
- Sticky booking bar stays accessible without scrolling on mobile
- No fixed media query breakpoints — design scales smoothly
- Touch targets: all interactive elements are ≥44×44px

**Tested Breakpoints:**

- Mobile: 375px (iPhone SE)
- Tablet: 768px
- Desktop: 1024px and up

**Example:**

```css
/* Grid reflows automatically */
display: grid;
gridtemplatecolumns: "repeat(auto-fill, minmax(300px, 1fr))";

/* Typography scales smoothly */
fontsize: "clamp(22px, 4vw, 32px)";
```

### What Trade-offs Did You Make Between Design & Performance?

| Decision                         | Why                                            | Impact                                                          |
| -------------------------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| Google Fonts (4 families)        | +~80KB but visual quality jump is significant  | Users see beautiful modern typography instead of system fonts   |
| No animation library             | CSS only (avoids Framer Motion +60KB)          | Slightly more verbose CSS but zero runtime overhead             |
| No external images               | All avatars use initials, icons are inline SVG | +0 image requests, instant render, better perceived performance |
| Inline SVG icons                 | No icon font library needed                    | Zero CLS, instant render, can animate with CSS                  |
| CSS custom properties            | Zero runtime cost vs CSS-in-JS                 | Theme switching works without JavaScript                        |
| State-based routing (no library) | Custom navigation in React Context             | Zero bundle impact, perfect for this scale                      |

**Performance Result:** ⚡ Lighthouse scores targeting 90+ across all metrics

### What Was the Most Challenging Part & How Did You Approach It?

**Challenge 1: Making cards engaging without hero images**

- Problem: Without images, cards felt sparse and uninteresting
- Solution:
  - Colored top accent bar per category
  - Semantic badge colors for level
  - Seat availability progress bar
  - Hover animations that reveal interactivity
  - Result: Cards communicate "alive & interactive" without images

**Challenge 2: Typography on mobile needed breathing room**

- Problem: Big headings looked compressed and hard to read
- Solution:
  - Reduced font-weight from 800 to 600-700 (modern, lighter weight)
  - Added generous letter-spacing: 1.2px-1.5px on headings
  - Increased line-height: 1.5+ for large text
  - Added word-spacing for longer headings
  - Result: Text feels open, modern, and highly readable

**Challenge 3: Dashboard with no data looks broken**

- Problem: Empty state discourages new users
- Solution:
  - Overview card has two states: empty (with CTA) and filled (with stats)
  - Progress bars show 0/6 as "something to work toward" not failure
  - Motivational copy: "Complete 3 more to earn certificate"
  - Result: Empty state feels intentional and encouraging

---

## Design Principles (Technical Details)

## Responsiveness Strategy

- **Mobile-first CSS** — base styles target 375px. `clamp()` handles fluid typography scaling.
- **CSS Grid with `auto-fill, minmax`** — cards reflow naturally from 1 column (mobile) to 3 columns (desktop) without media query breakpoints.
- **Flex + wrap** — horizontal rows wrap gracefully on narrow screens.
- **Sticky booking bar** — always accessible on mobile without scrolling back to top.
- **Touch targets** — all interactive elements are minimum 44×44px as per WCAG guidelines.
- **Overflow handling** — horizontal filter chips scroll natively on mobile (`overflow-x: auto`).

---

## SEO & Accessibility Enhancements

### Search Engine Optimization

- Meta description and keywords for search results
- Open Graph tags for social media sharing
- Twitter Card meta tags for Twitter preview
- Canonical URLs to prevent duplicate content
- XML Sitemap for crawler guidance
- Robots.txt for bot management
- Semantic HTML structure
- Mobile-first indexing friendly

### Accessibility (a11y)

- WCAG 2.1 Level AA compliant
- 44×44px minimum touch targets
- Semantic color usage (not color alone for information)
- Proper heading hierarchy (h1 → h6)
- Focus states on all interactive elements
- Keyboard navigation support
- Screen reader friendly text alternatives
- Sufficient color contrast ratios (4.5:1 for body text, 3:1 for large text)

---

## Performance Optimizations

| Metric                   | Target | Optimization                                  |
| ------------------------ | ------ | --------------------------------------------- |
| Lighthouse Performance   | 90+    | No render-blocking resources, optimized fonts |
| First Contentful Paint   | < 1.5s | Preconnect to fonts, inline critical CSS      |
| Largest Contentful Paint | < 2.5s | No lazy-loaded hero images                    |
| Cumulative Layout Shift  | < 0.1  | No font swapping, reserved space              |
| Time to Interactive      | < 3.5s | Small React bundle, no heavy libraries        |

---

---

## Design vs Performance Trade-offs

| Decision                      | Why                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| Google Fonts (Syne + Manrope) | +~60KB but visual quality jump vs system fonts is significant for target audience  |
| No animation library          | CSS animations only — avoids Framer Motion bundle (~60KB)                          |
| No image assets               | All avatars are initial-based, icons are inline SVG — zero external image requests |
| Inline SVG icons              | No icon font library needed, zero CLS, instant render                              |
| CSS custom properties         | Zero runtime cost for theming vs CSS-in-JS solutions                               |
| No router library             | State-based navigation — zero bundle impact, works perfectly for this scale        |

---

## Challenges & Solutions

**Challenge 1: Making workshop cards feel engaging without images**
Without hero images, cards feel sparse. Solution: coloured top accent bar per category, semantic badge colours, a seat availability progress bar, and hover animations that reveal interactivity. The card communicates "this is alive" without relying on photography.

**Challenge 2: Dashboard that's useful from day zero**
A dashboard with no data looks broken. Solution: the overview card has two states — empty (with a clear CTA to browse) and filled (showing stats). Progress bars show 0/6 progress clearly as something to work toward, not a failure state.

**Challenge 3: Mobile booking flow without a modal**
Modals on mobile are fragile. Solution: the booking CTA uses a sticky bottom bar on the detail page, stays in view regardless of scroll position, and navigates to a full confirmation page rather than a popup.

**Challenge 4: Form design for Gen Z attention spans**
Long forms get abandoned. Solution: registration is split into 2 focused steps. Step 1 handles account creation. Step 2 handles personalisation. Each step has a single clear CTA. Visual progress indicator shows completion.

---

## File Structure

```
src/
├── context/
│   └── AppContext.jsx       # Global state — navigation, auth, bookings
├── data/
│   └── workshops.js         # All workshop data + colour tokens
├── components/
│   ├── Navbar.jsx           # Sticky responsive navbar
│   └── WorkshopCard.jsx     # Reusable workshop card
├── pages/
│   ├── HomePage.jsx         # Landing page
│   ├── LoginPage.jsx        # Login form
│   ├── RegisterPage.jsx     # 2-step registration
│   ├── DashboardPage.jsx    # Student dashboard
│   ├── ProfilePage.jsx      # Profile + settings
│   ├── WorkshopsPage.jsx    # Workshop listing with filters
│   ├── WorkshopDetailPage.jsx # Workshop detail with tabs
│   └── ConfirmationPage.jsx # Booking confirmation
├── App.jsx                  # Router
├── index.js                 # Entry point
└── index.css                # Design tokens + global styles
```

---

## Design System Tokens

```css
--accent: #6c63ff /* Primary CTA, links, active states */
  --accent-light: #eef0ff /* Backgrounds, hover fills */ --accent-dark: #3d35cc
  /* Hover states on accent */ --bg: #f7f6f3 /* Page background */
  --surface: #ffffff /* Card backgrounds */ --text-primary: #14112a
  /* Headings, body */ --text-secondary: #6b6785 /* Descriptions, labels */
  --text-muted: #a09dbf /* Hints, metadata */;
```

---

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1"
}
```

No additional runtime dependencies. Fonts loaded via Google Fonts CDN.
