import type { ComponentType, HTMLAttributes } from "react"
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Database,
  PackageCheck,
  Receipt,
  Search,
  ShieldCheck,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "../components/ui/badge"
import { buttonVariants } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { cn } from "../lib/utils"
import { joinHref, pickLanguage, type TamilUILanguage } from "./template-utils"

type TemplateIcon = ComponentType<{ className?: string }>

type Metric = {
  icon: TemplateIcon
  labelTa: string
  labelEn: string
  value: string
  detailTa: string
  detailEn: string
}

type StockItem = {
  nameTa: string
  nameEn: string
  allocated: number
  remaining: number
  unitTa: string
  unitEn: string
  status: "normal" | "low" | "critical"
}

type ActionItem = {
  icon: TemplateIcon
  labelTa: string
  labelEn: string
  textTa: string
  textEn: string
  href: string
}

export interface RationShopDashboardTemplateProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  baseHref?: string
  language?: TamilUILanguage
  shopNameTa?: string
  shopNameEn?: string
  metrics?: Metric[]
  stockItems?: StockItem[]
  actionItems?: ActionItem[]
}

const defaultMetrics: Metric[] = [
  {
    icon: Users,
    labelTa: "குடும்ப அட்டைகள்",
    labelEn: "Family cards",
    value: "1,248",
    detailTa: "PHH, AAY, NPHH அட்டைகள்",
    detailEn: "PHH, AAY, and NPHH cards",
  },
  {
    icon: ShoppingCart,
    labelTa: "இன்றைய விற்பனை",
    labelEn: "Today sales",
    value: "186",
    detailTa: "ரசீதுகள் உருவாக்கப்பட்டது",
    detailEn: "Receipts generated",
  },
  {
    icon: Database,
    labelTa: "மொத்த இருப்பு",
    labelEn: "Stock balance",
    value: "14.2 T",
    detailTa: "8 பொருள் வகைகள்",
    detailEn: "Across 8 commodities",
  },
  {
    icon: Receipt,
    labelTa: "மாத வரவு",
    labelEn: "Month value",
    value: "₹42K",
    detailTa: "மானிய பொருள் பரிவர்த்தனை",
    detailEn: "Subsidized transactions",
  },
]

const defaultStock: StockItem[] = [
  {
    nameTa: "பச்சரிசி",
    nameEn: "Raw rice",
    allocated: 5000,
    remaining: 4200,
    unitTa: "கிலோ",
    unitEn: "kg",
    status: "normal",
  },
  {
    nameTa: "புழுங்கல் அரிசி",
    nameEn: "Boiled rice",
    allocated: 8000,
    remaining: 6800,
    unitTa: "கிலோ",
    unitEn: "kg",
    status: "normal",
  },
  {
    nameTa: "சர்க்கரை",
    nameEn: "Sugar",
    allocated: 1200,
    remaining: 350,
    unitTa: "கிலோ",
    unitEn: "kg",
    status: "low",
  },
  {
    nameTa: "துவரம் பருப்பு",
    nameEn: "Toor dhal",
    allocated: 600,
    remaining: 45,
    unitTa: "கிலோ",
    unitEn: "kg",
    status: "critical",
  },
]

const defaultActions: ActionItem[] = [
  {
    icon: ShoppingCart,
    labelTa: "POS விற்பனை",
    labelEn: "POS sale",
    textTa: "அட்டை சரிபார்ப்பு, பொருள் தேர்வு, ரசீது உருவாக்கம்.",
    textEn: "Verify card, choose commodities, and generate a receipt.",
    href: "/pos",
  },
  {
    icon: Users,
    labelTa: "அட்டை தேடல்",
    labelEn: "Card lookup",
    textTa: "குடும்ப அட்டை, உறுப்பினர், மாத வாங்கிய நிலை பார்க்க.",
    textEn: "Find card details, members, and monthly purchase status.",
    href: "/cards",
  },
  {
    icon: BarChart3,
    labelTa: "அறிக்கைகள்",
    labelEn: "Reports",
    textTa: "நாள், பொருள், அட்டை வகை அடிப்படையில் விநியோக நிலை.",
    textEn: "Review distribution by day, commodity, and card type.",
    href: "/reports",
  },
]

const statusClassName: Record<StockItem["status"], string> = {
  normal: "bg-success",
  low: "bg-warning",
  critical: "bg-destructive",
}

function getPercent(item: StockItem) {
  return Math.min(100, Math.max(0, Math.round((item.remaining / item.allocated) * 100)))
}

export function RationShopDashboardTemplate({
  baseHref,
  className,
  language = "ta",
  shopNameTa = "மயிலாப்பூர் நியாயவிலை கடை",
  shopNameEn = "Mylapore Fair Price Shop",
  metrics = defaultMetrics,
  stockItems = defaultStock,
  actionItems = defaultActions,
  ...props
}: RationShopDashboardTemplateProps) {
  const isTamil = language !== "en"
  const lowStockItems = stockItems.filter((item) => item.status !== "normal")

  return (
    <main
      className={cn(
        "min-w-0 bg-background text-foreground",
        isTamil && "font-tamil",
        className
      )}
      lang={isTamil ? "ta" : "en"}
      {...props}
    >
      <section className="border-b bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Badge variant="success" className="rounded-md">
              {pickLanguage(language, "செயல்பாட்டு டாஷ்போர்டு", "Operational dashboard")}
            </Badge>
            <h1 className="tamil-display mt-4 text-3xl font-black leading-[1.3] tracking-normal sm:text-5xl">
              {pickLanguage(language, shopNameTa, shopNameEn)}
            </h1>
            <p className="tamil-body mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {pickLanguage(
                language,
                "குடும்ப அட்டை சரிபார்ப்பு, பொருள் இருப்பு, விற்பனை ரசீது, புகார் நிலை ஆகிய அனைத்தும் ஒரு தெளிவான கடை முகப்பில்.",
                "A clear shop dashboard for card verification, stock balance, sale receipts, and grievance status."
              )}
            </p>
          </div>
          <a
            href={joinHref(baseHref, "/pos")}
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            <ShoppingCart className="size-4" />
            {pickLanguage(language, "விற்பனை தொடங்கு", "Start sale")}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon

            return (
              <Card key={metric.labelEn} size="sm" className="min-w-0">
                <CardContent className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="tamil-label text-xs font-semibold text-muted-foreground">
                        {pickLanguage(language, metric.labelTa, metric.labelEn)}
                      </p>
                      <p className="font-mono text-3xl font-bold leading-none">
                        {metric.value}
                      </p>
                    </div>
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <p className="tamil-body text-xs text-muted-foreground">
                    {pickLanguage(language, metric.detailTa, metric.detailEn)}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {lowStockItems.length > 0 && (
          <Card className="border-destructive/25 bg-destructive/5">
            <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start">
              <AlertTriangle className="size-5 shrink-0 text-destructive" />
              <div className="min-w-0">
                <h2 className="tamil-heading font-bold text-destructive">
                  {pickLanguage(language, "குறைந்த இருப்பு எச்சரிக்கை", "Low stock warning")}
                </h2>
                <p className="tamil-body mt-1 text-sm text-muted-foreground">
                  {pickLanguage(
                    language,
                    "கீழே உள்ள பொருட்களுக்கு மறுஒதுக்கீடு அல்லது விநியோக திட்டமிடல் தேவை.",
                    "The items below need replenishment planning or allocation review."
                  )}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {lowStockItems.map((item) => (
                    <Badge key={item.nameEn} variant="destructive" className="rounded-md">
                      {pickLanguage(language, item.nameTa, item.nameEn)}: {item.remaining}{" "}
                      {pickLanguage(language, item.unitTa, item.unitEn)}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle className="tamil-heading">
                {pickLanguage(language, "பொருள் இருப்பு நிலை", "Commodity stock status")}
              </CardTitle>
              <CardDescription className="tamil-body">
                {pickLanguage(
                  language,
                  "மாத ஒதுக்கீட்டிலிருந்து மீதமுள்ள அளவை எளிதாக கண்காணிக்கவும்.",
                  "Track remaining quantity against the monthly allocation."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {stockItems.map((item) => {
                const percent = getPercent(item)

                return (
                  <div key={item.nameEn} className="min-w-0 space-y-2">
                    <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-2">
                      <span className="tamil-label font-semibold">
                        {pickLanguage(language, item.nameTa, item.nameEn)}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.remaining} / {item.allocated}{" "}
                        {pickLanguage(language, item.unitTa, item.unitEn)}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-md bg-muted">
                      <div
                        className={cn("h-full rounded-md", statusClassName[item.status])}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="tamil-heading">
                  {pickLanguage(language, "அட்டை அல்லது ரசீது தேடல்", "Card or receipt search")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder={pickLanguage(
                      language,
                      "அட்டை எண், பெயர், ரசீது",
                      "Card number, name, receipt"
                    )}
                  />
                </div>
                <a
                  href={joinHref(baseHref, "/cards")}
                  className={cn(buttonVariants(), "w-full")}
                >
                  {pickLanguage(language, "தேடு", "Search")}
                  <ArrowRight className="size-4" />
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 py-4">
                <ShieldCheck className="size-5 text-success" />
                <h2 className="tamil-heading font-bold">
                  {pickLanguage(language, "ஆபரேட்டர் பாதுகாப்பு", "Operator safety")}
                </h2>
                <p className="tamil-body text-sm text-muted-foreground">
                  {pickLanguage(
                    language,
                    "கைரேகை தோல்வி, இணைய தாமதம், குறைந்த இருப்பு போன்ற சூழல்களுக்கு தெளிவான மாற்று வழி காட்டுங்கள்.",
                    "Show clear fallback paths for biometric failure, network delay, and low stock situations."
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {actionItems.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.labelEn}
                href={joinHref(baseHref, item.href)}
                className="group rounded-md border bg-card p-4 shadow-xs transition-colors hover:border-primary/40"
              >
                <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h2 className="tamil-heading mt-4 font-bold">
                  {pickLanguage(language, item.labelTa, item.labelEn)}
                </h2>
                <p className="tamil-body mt-1 text-sm text-muted-foreground">
                  {pickLanguage(language, item.textTa, item.textEn)}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {pickLanguage(language, "திற", "Open")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            )
          })}
        </div>

        <Card className="bg-muted/40">
          <CardContent className="grid gap-4 py-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <PackageCheck className="size-6 text-primary" />
            <div className="min-w-0">
              <h2 className="tamil-heading font-bold">
                {pickLanguage(language, "இந்த மாதிரியை உங்கள் கடைக்கு மாற்றுங்கள்", "Customize this template for your shop")}
              </h2>
              <p className="tamil-body mt-1 text-sm text-muted-foreground">
                {pickLanguage(
                  language,
                  "இது தொடக்க UI மாதிரி. உண்மையான அட்டை, இருப்பு, ரசீது, புகார் தரவை உங்கள் API-யுடன் இணைக்கவும்.",
                  "This is a starter UI template. Connect real card, stock, receipt, and grievance data from your API."
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
