<img width="1672" height="485" alt="1" src="https://github.com/user-attachments/assets/d59ef5c9-940a-4d9a-8385-4f6e43355024" />


# Tamil Design System

Tamil-first React components, design tokens, and agent guidance for building accessible Tamil interfaces.

The package contains only the reusable component layer: UI primitives, Tamil typography helpers, language preference state, and the design rules agents should follow.

Repository: https://github.com/selva-toi/Tamil_Design_System
## Install

```bash
npm install @tamildesignsystem/react
```
<img width="1672" height="941" alt="Assest (10)" src="https://github.com/user-attachments/assets/0bbd8d1f-48b5-43cc-9103-1fa9ea6c8e00" />

## Add styles

In your app CSS, import Tailwind first, scan the package output, then import Tamil UI styles.

For a common Next.js `src/app/globals.css` file:

```css
@import "tailwindcss";
@source "../../node_modules/@tamildesignsystem/react/dist";
@import "@tamildesignsystem/react/styles.css";
```

If your CSS file is at `app/globals.css` in the project root, use:

```css
@source "../node_modules/@tamildesignsystem/react/dist";
```

Adjust the `@source` path when your CSS file lives somewhere else.

## Use components
<img width="1536" height="1024" alt="Assest (6)" src="https://github.com/user-attachments/assets/c09ecd3c-f3d4-4f34-aaf2-a057793e76e0" />

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@tamildesignsystem/react";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-tamil tamil-heading">தமிழ் சேவை</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>தொடங்கு</Button>
      </CardContent>
    </Card>
  );
}
```

## Fonts

Tamil UI expects a Tamil-capable font. For Next.js, load `Noto Sans Tamil` and expose it as `--font-noto-sans-tamil`.

```tsx
import { Noto_Sans_Tamil } from "next/font/google";

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-sans-tamil",
});
```

Then add the font variable to your root layout class.

## Language tabs

`Tabs` automatically persists language choice when it sees Tamil/English tab values:

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@tamildesignsystem/react";

export function LanguageExample() {
  return (
    <Tabs defaultValue="tamil">
      <TabsList>
        <TabsTrigger value="tamil">தமிழ்</TabsTrigger>
        <TabsTrigger value="english">English</TabsTrigger>
      </TabsList>
      <TabsContent value="tamil">தமிழ் உள்ளடக்கம்</TabsContent>
      <TabsContent value="english">English content</TabsContent>
    </Tabs>
  );
}
```

Short values `ta` and `en` are also supported.

<img width="1536" height="1024" alt="Assest (7)" src="https://github.com/user-attachments/assets/a2e23560-75dd-473f-a499-2d1f22aae660" />

## Templates

The package also includes Tamil-first starter templates for public-service products. They use the same primitives, tokens, radii, typography helpers, and responsive layout rules as the component library.

```tsx
import {
  RationShopDashboardTemplate,
  TNGovLandingTemplate,
} from "@tamildesignsystem/react";

export function PublicServiceHome() {
  return <TNGovLandingTemplate baseHref="/services" />;
}

export function ShopHome() {
  return <RationShopDashboardTemplate baseHref="/ration-shop" />;
}
```

Templates are intentionally framework-neutral React components. Replace the demo data with real service, stock, receipt, and support data from your app before production use.

<img width="1448" height="1086" alt="Assest (8)" src="https://github.com/user-attachments/assets/94997a29-dc83-4199-a7e1-35992330ac0b" />

## Agent skill

The package includes a reusable agent skill at:

```text
skills/tamil-ui-design/SKILL.md
```

Use it when asking an AI coding agent to build Tamil-first UI. It covers Tamil typography, mobile checks, component rules, accessibility, and layout safety.
