# Tamil UI Agent Rules

Use these rules when generating or editing interfaces with `@tamildesignsystem/react`.

Primary references:

- AI Vibe Coding Operating Manual: https://tamilui.com/ai/vibe-coding/overview
- Tamil Site Building Guide: https://tamilui.com/ai/vibe-coding/tamil-site-guide

These notes embed the important parts of those pages so an agent can still work correctly when it cannot open the website.

## Product Identity

- Tamil UI is a Tamil-first design system for polished public-service, civic, AI-assisted, and product interfaces.
- The output must feel production-ready: clear workflow, strong hierarchy, real content, accessible controls, and refined visual composition.
- The design language is quiet premium SaaS adapted for Tamil public-service use: disciplined white space, restrained surfaces, strong typography, subtle borders, token shadows, and meaningful UI mockups.
- Visible UI defaults to Tamil for Tamil/public-service contexts. English is used for proper nouns, acronyms, code, package names, and explicit bilingual requests.

## Operating Workflow For Agents

1. Classify the request: component primitive, component docs, page/block, case study, Tamil content, accessibility fix, visual polish, or package work.
2. Search local precedent before designing. Reuse existing component and page patterns.
3. Identify the edit scope. Ignore unrelated dirty files and never revert user work.
4. Choose Tamil UI primitives before custom markup.
5. Draft real Tamil content before composing the layout.
6. Build the mobile viewport first, then tablet and desktop.
7. Run an accessibility pass: keyboard, focus, contrast, labels, screen reader names, text resizing, and short viewport behavior.
8. Run a visual QA pass: no clipped pills, no overlapped Tamil text, no nested cards, no hardcoded off-brand colors, no unreachable floating UI.
9. Verify with targeted lint/type/build when code access is available. Without code access, provide implementation-ready code and a manual QA checklist.

## Component Rules

- Reuse primitives from `@tamildesignsystem/react` before creating new controls.
- Use design-system primitives for buttons, cards, badges, inputs, tables, overlays, calendars, navigation, tabs, sheets, dialogs, command menus, and tooltips.
- Components are built on `@base-ui/react`, not Radix UI. Base UI state attributes include `data-checked`, `data-unchecked`, `data-open`, and `data-disabled`.
- Use `cn()` for class merging.
- Use icons for compact actions when a common icon exists. Icon-only buttons need accessible names.
- Keep controls stable: hover, focus, selected, loading, long Tamil labels, and empty states must not resize or break the layout.

## Package Templates

- The package exports `TNGovLandingTemplate` and `RationShopDashboardTemplate` as framework-neutral starter templates.
- Use these templates when a user needs a Tamil public-service landing page, government-service portal shell, ration shop dashboard, or similar civic workflow.
- Templates must stay independent of app routes, `next/link`, server-only helpers, and project aliases. Use normal anchors and props such as `baseHref`.
- Treat included data as demo content. Production apps must replace it with real service, stock, receipt, card, and support data.
- Keep templates token-based, responsive at 360px, Tamil-first by default, and aligned to the same primitive rules as components.

## Tamil-First Interaction

- Default language order is Tamil first, English second.
- Ask the user only when the app language is genuinely unclear. For Tamil/public-service pages, default to Tamil.
- Keep language choice persistent across pages when an app uses Tamil/English tabs.
- Do not mix Tamil and English in the same navigation label unless the user asks for bilingual UI.
- Government Tamil tone should be calm, official, and useful. Avoid salesy phrases.
- Prefer natural Tamil phrases over transliterated English.
- Test with real Tamil labels that are longer and wider than English equivalents.

## Tamil Typography Safety

- Use `font-tamil`, `tamil-display`, `tamil-heading`, `tamil-body`, and `tamil-label` for Tamil text.
- Do not use negative letter spacing for Tamil text.
- Tamil body copy should use generous line-height. Avoid `leading-none`, `leading-tight`, `leading-snug`, or arbitrary tight values like `leading-[1.1]` on Tamil.
- Never apply `line-height: 1.8`, `leading-7`, or `leading-relaxed` on a wrapper that contains form controls. Apply Tamil line-height to actual text nodes only.
- Do not put `lang="ta"` or `className="font-tamil"` on a wrapper that contains buttons, inputs, checkboxes, switches, selects, sliders, or labels. It can distort control height and alignment.
- Apply Tamil font classes to individual text elements: headings, paragraphs, spans, table cells, helper text, and labels.
- Tamil vowel markers can extend above and below the normal letter box. Do not combine fixed heights like `h-5`, `h-6`, or `h-8` with `overflow-hidden` on Tamil text.
- For Tamil badges/chips, prefer `min-h-*`, `h-fit`, and comfortable vertical padding.
- Body copy should usually stay around 50-65 Tamil characters per line.

## Tamil Site Setup Rules

- For a Tamil-first site, set `lang="ta"` on the root `<html>` element.
- Keep `dir="ltr"` unless the language or product requirement explicitly needs another direction.
- Load a Tamil-capable font such as Noto Sans Tamil and expose it through the package font variable.
- Import the package stylesheet once in the app CSS:

```css
@import "tailwindcss";
@source "../node_modules/@tamildesignsystem/react/dist";
@import "@tamildesignsystem/react/styles.css";
```

- In Next.js apps, set metadata locale to Tamil where appropriate, for example `openGraph.locale = "ta_IN"`.
- Use Tamil labels, placeholders, validation messages, empty states, and aria labels for Tamil public-service pages.

## Layout

- Build mobile-first. Every component must fit at 360px width.
- Also check 430px, 768px, 1280px, and 1560px.
- Use `w-full min-w-0 max-w-full` on form controls and containers that hold dynamic Tamil text.
- Avoid horizontal scrolling as a layout fix. If something overflows, fix sizing, wrapping, or truncation on the child.
- Use full-width sections for page structure. Use cards only for repeated entities or contained tasks.
- Do not put a large page section inside a card.
- Do not put cards inside cards.
- Prefer `rounded-md` for cards, menus, panels, inputs, dialogs, sheets, examples, and documentation surfaces.
- Use `rounded-full` only for circular controls, badges, switches, sliders, avatars, and status dots.
- For pages with short controls and long results, use a sticky control panel or a top control bar. Avoid a short static left column beside a long result column.

## Visual Quality Contract

- First viewport must communicate purpose, primary workflow, and trust signal without requiring scroll.
- Use one strong heading, concise supporting copy, one primary action, one secondary action, and a real UI surface such as search, form, table, dashboard, document, calendar, service panel, or chat.
- Use token utilities: `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`, `shadow-sm`.
- Do not hardcode `bg-white`, `text-black`, `border-gray-*`, hex, rgb, or oklch colors in component class strings unless it is a deliberate decorative illustration.
- Page background should be quiet: white, subtle muted bands, or brand-specific pale surfaces.
- Use one primary filled CTA per section. Secondary actions use outline, ghost, or links.
- Pill badges must sit inside card padding or have enough top padding so they never clip.
- Floating widgets must use viewport-safe height, scrollable body, anchored composer, and keyboard-close behavior.

## Page Recipes

- Component docs: `PageHeader -> variants preview -> sizes/states -> anatomy -> props -> best practices -> accessibility`.
- Foundation page: `PageHeader -> token explanation -> scale examples -> usage rules -> common mistakes`.
- Public service block: `header -> compact hero -> search/action surface -> trust/proof -> service sections -> support -> CTA -> footer`.
- Government page: `Tamil-first header -> service search -> departments -> schemes -> documents -> Kural AI chat -> help/contact -> accessibility toolbar`.
- AI page: `purpose -> operating rules -> recipes -> prompts -> verification -> failure modes`.
- Case study: `problem -> audit -> design decisions -> information architecture -> components -> accessibility -> delivery checklist`.
- Tamil site end-to-end: `lang=ta root -> Tamil font loading -> safe line-heights -> bilingual option only when needed -> Kural AI chat -> accessibility controls -> deployment QA`.

## Kural AI And Vibe Coding Patterns

- AI chat interfaces should use the Tamil UI prompt layout: Plus and Settings icons on the left, input in the center, Mic and submit on the right.
- Add focus-within ring on the composer.
- Use Skills Tags as slash-command lozenges above the input, for example `/சுருக்கம் / summarize`, `/தகுதி / eligibility`, `/ஆவணங்கள் / documents`, `/விண்ணப்பம் / apply`, `/தொடர்பு / contact`.
- Clicking a skill tag should set the input value to the slash command and focus the input.
- Parse slash commands before keyword matching.
- AI responses should use structured output with a bilingual title when useful, descriptive text, and bullet-point answers.
- Add a clear AI disclaimer for public-service pages: AI is used; verify important results.

## Accessibility

- Every interactive control needs an accessible name.
- Root Tamil pages need `lang="ta"` for pronunciation.
- Include a skip-to-main link on full sites.
- Preserve visible focus styles.
- Make touch targets at least 40px high when possible.
- All icon-only buttons require Tamil `aria-label` values on Tamil pages.
- Color must never be the only status indicator. Pair it with text or an icon.
- Check keyboard navigation for menus, dialogs, tabs, selects, command menus, sheets, sliders, and popovers.
- Floating chat widgets must be keyboard reachable and closable with Escape.
- Dialog and sheet bodies must scroll without clipping Tamil content.
- Public-service pages should include text size and contrast controls when appropriate.

## Theming

- Use the package token system instead of adding another theming system.
- Dark mode works through the `.dark` class and Tailwind dark variants.
- Do not add a second theme provider.
- Do not use conditional JSX based on `theme === "dark"` where CSS variants can solve it.
- Do not add a `tailwind.config.js` only for colors. Tailwind v4 is CSS-first.
- For custom palette sections, override CSS custom properties on a scoped wrapper.

## Verification Matrix

- Component primitive: run typecheck/build and test keyboard/focus states.
- Component docs: run targeted lint/typecheck and inspect mobile/desktop.
- Page or block: run lint, typecheck, build, and browser viewport checks.
- Accessibility fix: verify keyboard path, focus visibility, screen reader labels, and short viewport behavior.
- Tamil content update: scan visible English, test Tamil wrapping, and check diacritics.
- Package change: run `npm run typecheck`, `npm run build`, and `npm pack --dry-run`.

## Definition Of Done

- The result feels native to Tamil UI.
- It uses the correct primitives and token utilities.
- Tamil text is readable, natural, and not clipped.
- Mobile, desktop, and short-height layouts all work.
- Accessibility behavior is present.
- The final response names changed files and verification results.
