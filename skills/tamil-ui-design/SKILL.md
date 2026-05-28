# Tamil UI Design Skill

Use this skill when creating Tamil-first product screens, documentation examples, government-service blocks, forms, dashboards, AI chat surfaces, or component demos with `@tamildesignsystem/react`.

Reference pages:

- https://tamilui.com/ai/vibe-coding/overview
- https://tamilui.com/ai/vibe-coding/tamil-site-guide

This skill contains the key rules from those pages for offline use.

## Core Intent

- Build production-quality Tamil UI, not decorative mockups.
- Use Tamil as the first-class product language for Tamil/public-service contexts.
- Use restrained product design: strong hierarchy, real content, clean spacing, token colors, subtle borders, and useful first-screen workflows.
- Prefer Tamil UI primitives before custom controls.

## Workflow

1. Search local precedent before creating anything new.
2. Choose existing primitives from `@tamildesignsystem/react`.
3. Write real Tamil content and labels before layout.
4. Design at 360px mobile first.
5. Expand to 430px, 768px, 1280px, and 1560px.
6. Check that Tamil text, icons, chips, buttons, inputs, popovers, and floating panels are not clipped.
7. Verify keyboard navigation, focus visibility, accessible names, and contrast.
8. Run available checks: `npm run typecheck`, `npm run build`, `npm pack --dry-run` for package work, and targeted lint for app work.

## Tamil Site Setup

- Set `lang="ta"` on the root `<html>` element for Tamil-first sites.
- Use `dir="ltr"` unless the product has a clear reason to change direction.
- Load Noto Sans Tamil or another Tamil-capable font.
- Import package styles once:

```css
@import "tailwindcss";
@source "../node_modules/@tamildesignsystem/react/dist";
@import "@tamildesignsystem/react/styles.css";
```

- In Next.js metadata, use Tamil locale where appropriate, such as `ta_IN`.
- Tamil labels, placeholders, validation messages, aria labels, headings, and empty states should be written as real Tamil content.

## Tamil Typography Rules

- Use `font-tamil` for Tamil UI text.
- Use `tamil-display` for very large Tamil headings.
- Use `tamil-heading` for section headings.
- Use `tamil-body` for paragraph text.
- Use `tamil-label` for small labels, badges, helper text, and captions.
- Do not use negative tracking on Tamil.
- Do not use tight line-height utilities on Tamil unless the rendered text is visually inspected.
- Never use `leading-none`, `leading-tight`, `leading-snug`, or `leading-[1.1]` on Tamil text without a visual check.
- Do not put `font-tamil` or `lang="ta"` on a wrapper that contains controls. Apply it to text nodes only.
- Avoid fixed-height plus `overflow-hidden` on Tamil text because vowel markers can be clipped.
- Let Tamil chips and buttons wrap when needed. Do not force long Tamil labels into narrow single-line controls.
- Keep Tamil body copy around 50-65 characters per line where possible.

## Component Patterns

- Navigation: Tamil-only by default for Tamil sites. Use bilingual labels only when requested. Include skip-to-main and keyboard navigation.
- Hero: compact, useful first viewport with Tamil h1, short copy, one primary CTA, one secondary action, and a real UI surface.
- Service cards: use `rounded-md`, `border`, `bg-card`, subtle shadow, and 20-28px padding.
- Forms: pair every input with Tamil label, Tamil placeholder, visible validation, and `w-full min-w-0`.
- Tables: use Tamil headers, generous row height, and readable wrapping. Do not truncate Tamil cells without a tooltip.
- Badges and chips: use `min-h-*`, `h-fit`, and vertical padding for Tamil.
- Dialogs and sheets: Tamil title/description, scrollable body, reachable actions, and no clipped content.
- AI chat: use skill tags and the inline prompt composer pattern.

## Package Templates

- `TNGovLandingTemplate` is the approved starter for Tamil government-service landing pages.
- `RationShopDashboardTemplate` is the approved starter for fair-price shop, ration shop, and civic operations dashboards.
- Templates are framework-neutral React components. Do not add `next/link`, route context, project aliases, or app-specific providers inside package templates.
- Use `baseHref` or explicit props for links and replace demo arrays with real production data in consuming apps.
- Keep templates Tamil-first, token-based, accessible, and responsive at 360px without horizontal overflow.

## Kural AI And Slash Commands

- Use Skills Tags as clickable slash-command lozenges:
  `/சுருக்கம் / summarize`, `/தகுதி / eligibility`, `/ஆவணங்கள் / documents`, `/விண்ணப்பம் / apply`, `/தொடர்பு / contact`.
- Clicking a tag should put the command into the input and focus the input.
- Prompt composer layout: Plus + Settings on the left, input in the center, Mic + submit on the right.
- Add focus-within ring to the composer.
- Parse slash commands first, then natural language keywords.
- AI responses should return a structured object with title, text, and bullets.
- Use bilingual response titles when helpful, for example `சுருக்கம் / Summary`.
- Include a public-service AI disclaimer telling users to verify important results.

## Layout Rules

- Use `rounded-md` for cards, menus, inputs, dialogs, sheets, examples, and panels.
- Use `rounded-full` only for circular controls, avatars, badges, switches, sliders, and status dots.
- Put `min-w-0` on flex and grid children that contain Tamil text.
- Prefer wrapping and truncation at the text node instead of adding `overflow-x-auto` to a parent.
- Use cards only for repeated entities or contained tasks.
- Do not nest cards.
- For tools with a short control area and long results, use a sticky control panel or top control bar.
- Floating widgets must use viewport-safe height and an anchored composer.

## Visual Quality Rules

- First screen must show purpose, primary workflow, and trust signal.
- The UI must be scannable in five seconds.
- Use token utilities only for structural surfaces: `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`.
- Do not hardcode gray/white/black or hex/rgb/oklch values in component class strings.
- Cards in the same row should have compatible density and aligned actions.
- Icon alignment must follow text baselines.
- Avoid generic SaaS marketing language on public-service Tamil pages.

## Accessibility Requirements

- Keyboard-only navigation works.
- Focus ring is visible.
- Every interactive control has an accessible name.
- Root Tamil pages use `lang="ta"`.
- Icon-only buttons use Tamil `aria-label` on Tamil pages.
- Touch targets should be at least 40px high where possible.
- Color is never the only status indicator.
- Dialogs and menus fit inside the phone viewport.
- Floating chat widgets are keyboard reachable and closable.
- Public-service pages should provide text size and contrast controls where appropriate.

## Theming Rules

- Do not add another theme system.
- Use CSS custom-property tokens and Tailwind token utilities.
- Dark mode is handled through `.dark` and dark variants.
- Do not add `tailwind.config.js` for colors in Tailwind v4 projects.
- For custom palettes, override CSS variables on a scoped wrapper instead of creating one-off utility classes.

## Required Checks

- Mobile: 360px and 430px.
- Tablet: 768px.
- Desktop: 1280px and 1560px.
- Short-height viewport for floating widgets and dialogs.
- No clipped Tamil labels, diacritics, pills, popovers, or hero text.
- No horizontal page overflow.
- No invisible focus states.
- Package work: `npm run typecheck`, `npm run build`, and `npm pack --dry-run`.

## Final Response Contract

- Mention changed files.
- Summarize what was added or fixed.
- State verification commands and results.
- Call out any remaining risk honestly.
