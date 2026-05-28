"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import {
  languageFromTabValue,
  type LanguagePreference,
  useLanguagePreference,
} from "../../lib/language-preference"
import { cn } from "../../lib/utils"

type TabsValue = NonNullable<TabsPrimitive.Root.Props["value"]>
type LanguageTabMode = "short" | "long"

function collectTabValues(children: React.ReactNode, values = new Set<string>()) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return
    }

    const props = child.props as {
      children?: React.ReactNode
      value?: unknown
    }

    if (typeof props.value === "string") {
      values.add(props.value)
    }

    if (props.children) {
      collectTabValues(props.children, values)
    }
  })

  return values
}

function getLanguageTabMode(children: React.ReactNode): LanguageTabMode | null {
  const values = collectTabValues(children)

  if (values.has("tamil") && values.has("english")) {
    return "long"
  }

  if (values.has("ta") && values.has("en")) {
    return "short"
  }

  return null
}

function languageToTabValue(
  language: LanguagePreference,
  mode: LanguageTabMode
): TabsValue {
  if (mode === "short") {
    return language === "tamil" ? "ta" : "en"
  }

  return language
}

function Tabs({
  className,
  children,
  defaultValue,
  orientation = "horizontal",
  onValueChange,
  value,
  ...props
}: TabsPrimitive.Root.Props) {
  const [language, setLanguage] = useLanguagePreference()
  const [localValue, setLocalValue] = React.useState<TabsValue | null>(null)
  const languageMode = React.useMemo(
    () => getLanguageTabMode(children),
    [children]
  )
  const preferredLanguageValue = languageMode
    ? languageToTabValue(language, languageMode)
    : undefined
  const shouldSyncDefault =
    languageMode && (!defaultValue || languageFromTabValue(defaultValue))
  const syncedValue =
    languageMode && value === undefined
      ? localValue ?? (shouldSyncDefault ? preferredLanguageValue : defaultValue)
      : value

  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-3 data-horizontal:flex-col",
        className
      )}
      defaultValue={languageMode ? undefined : defaultValue}
      value={syncedValue}
      onValueChange={(nextValue, eventDetails) => {
        if (languageMode && value === undefined) {
          setLocalValue(nextValue)
        }

        const nextLanguage = languageFromTabValue(nextValue)

        if (nextLanguage) {
          setLanguage(nextLanguage)
        }

        onValueChange?.(nextValue, eventDetails)
      }}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-md border border-border/85 bg-muted/65 p-1 text-muted-foreground shadow-xs group-data-horizontal/tabs:min-h-10 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none data-[variant=line]:border-transparent data-[variant=line]:bg-transparent data-[variant=line]:p-0 data-[variant=line]:shadow-none",
  {
    variants: {
      variant: {
        default: "",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-sm border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:bg-background/45 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:hover:bg-transparent group-data-[variant=line]/tabs-list:data-active:border-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:ring-0 dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:border-border data-active:bg-background data-active:text-foreground data-active:ring-1 data-active:ring-black/5 dark:data-active:border-input dark:data-active:bg-input/45 dark:data-active:text-foreground dark:data-active:ring-white/10",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
