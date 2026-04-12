# Contributing to SkillHub

We welcome contributions! Here are some guidelines:

## Code Style

- **React Components:** Use functional components with hooks
- **Folder Structure:** Group by feature (pages, components, context)
- **Naming:**
  - Components: PascalCase (e.g., `WorkshopCard.jsx`)
  - Functions: camelCase (e.g., `handleBooking`)
  - Constants: UPPER_SNAKE_CASE or define in data files

## Accessibility Standards

All contributions must meet WCAG 2.1 Level AA:
- ✅ Minimum touch targets: 44×44px
- ✅ Color contrast: 4.5:1 for body text, 3:1 for large text
- ✅ Focus states on all interactive elements
- ✅ Semantic HTML structure
- ✅ Alt text for all images

## Performance Guidelines

Target Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

## Making Changes

1. **Branch naming:** `feature/feature-name` or `fix/bug-name`
2. **Commit messages:** Follow conventional commits
   - `feat:` new feature
   - `fix:` bug fix
   - `refactor:` code cleanup
   - `docs:` documentation updates
   - `perf:` performance improvements

3. **Before submitting:**
   ```bash
   npm run build
   # Verify no console errors
   # Test on mobile (375px)
   # Test keyboard navigation
   ```

## Testing

While no automated test framework is included, please test:
- Page responsiveness (375px, 768px, 1024px+)
- Form submissions
- Navigation between pages
- State persistence across page reloads
- Accessibility with keyboard-only navigation

## Questions?

Create an issue or check existing discussions in the repository.

---

**Thank you for making SkillHub better! 🎉**
