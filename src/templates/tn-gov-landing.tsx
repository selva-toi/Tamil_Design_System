import type { ComponentType, HTMLAttributes } from "react"
import {
  ArrowRight,
  Building2,
  FileCheck2,
  FileText,
  Landmark,
  PhoneCall,
  Search,
  ShieldCheck,
  UsersRound,
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

type ServiceCard = {
  icon: TemplateIcon
  titleTa: string
  titleEn: string
  textTa: string
  textEn: string
  href: string
  tagsTa: string[]
  tagsEn: string[]
}

type DocumentCard = {
  icon: TemplateIcon
  titleTa: string
  titleEn: string
  textTa: string
  textEn: string
  href: string
}

export interface TNGovLandingTemplateProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  baseHref?: string
  language?: TamilUILanguage
  serviceCards?: ServiceCard[]
  documentCards?: DocumentCard[]
}

const defaultServices: ServiceCard[] = [
  {
    icon: FileCheck2,
    titleTa: "சான்றிதழ்கள்",
    titleEn: "Certificates",
    textTa:
      "சாதி, வருமானம், இருப்பிடம், வாரிசு போன்ற சான்றிதழ்களுக்கு தெளிவான வழிமுறை.",
    textEn:
      "Clear journeys for community, income, nativity, legal heir, and related certificates.",
    href: "/services/certificates",
    tagsTa: ["சாதி", "வருமானம்", "இருப்பிடம்"],
    tagsEn: ["Community", "Income", "Nativity"],
  },
  {
    icon: Landmark,
    titleTa: "நிலம் மற்றும் பதிவு",
    titleEn: "Land and registration",
    textTa:
      "பட்டா மாற்றம், நிலப் பதிவுகள், பதிவு நிலை போன்ற சேவைகளை ஒரே இடத்தில் காட்டுங்கள்.",
    textEn:
      "Group patta transfer, land records, registration status, and revenue services in one place.",
    href: "/services/land-records",
    tagsTa: ["பட்டா", "பதிவு", "நிலம்"],
    tagsEn: ["Patta", "Records", "Land"],
  },
  {
    icon: UsersRound,
    titleTa: "நலத் திட்டங்கள்",
    titleEn: "Welfare schemes",
    textTa:
      "மாணவர்கள், பெண்கள், விவசாயிகள், முதியோர் போன்ற பயனாளிகளுக்கான திட்ட வழிகாட்டி.",
    textEn:
      "A beneficiary-first guide for students, women, farmers, senior citizens, and families.",
    href: "/schemes",
    tagsTa: ["மாணவர்கள்", "பெண்கள்", "விவசாயிகள்"],
    tagsEn: ["Students", "Women", "Farmers"],
  },
]

const defaultDocuments: DocumentCard[] = [
  {
    icon: FileText,
    titleTa: "அரசாணைகள்",
    titleEn: "Government orders",
    textTa: "துறை வாரியாக அரசாணைகள் மற்றும் அதிகாரப்பூர்வ ஆவணங்களை பட்டியலிடுங்கள்.",
    textEn: "List official orders and department documents with reliable source links.",
    href: "/documents/orders",
  },
  {
    icon: Building2,
    titleTa: "துறைகள்",
    titleEn: "Departments",
    textTa: "ஒவ்வொரு துறையின் சேவைகள், அதிகாரிகள், தொடர்பு வழிகள் தெளிவாக இருக்கட்டும்.",
    textEn: "Surface services, officers, and contact paths for every department.",
    href: "/departments",
  },
  {
    icon: PhoneCall,
    titleTa: "உதவி எண்கள்",
    titleEn: "Helplines",
    textTa: "அவசரம், புகார், சேவை நிலை, மாவட்ட தொடர்பு போன்ற உதவி வழிகள்.",
    textEn: "Provide emergency, grievance, service status, and district contact channels.",
    href: "/help",
  },
]

const stats = [
  { value: "38", labelTa: "மாவட்டங்கள்", labelEn: "Districts" },
  { value: "30+", labelTa: "அரசுத் துறைகள்", labelEn: "Departments" },
  { value: "24/7", labelTa: "சேவை தகவல்", labelEn: "Service access" },
]

const popularSearches = [
  { ta: "சாதி சான்றிதழ்", en: "Community certificate" },
  { ta: "வருமான சான்றிதழ்", en: "Income certificate" },
  { ta: "பட்டா மாற்றம்", en: "Patta transfer" },
  { ta: "மகளிர் உரிமை", en: "Women welfare" },
]

export function TNGovLandingTemplate({
  baseHref,
  className,
  language = "ta",
  serviceCards = defaultServices,
  documentCards = defaultDocuments,
  ...props
}: TNGovLandingTemplateProps) {
  const isTamil = language !== "en"

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
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:py-14">
          <div className="min-w-0 space-y-6">
            <Badge variant="info" className="rounded-md">
              {pickLanguage(language, "தமிழ் அரசு சேவை மாதிரி", "Tamil public service template")}
            </Badge>
            <div className="max-w-3xl space-y-4">
              <h1 className="tamil-display text-4xl font-black leading-[1.28] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
                {pickLanguage(
                  language,
                  "ஒரு அரசு சேவையை தெளிவான மக்கள்சார் பயணமாக மாற்றுங்கள்.",
                  "Turn a government service into a clear citizen-first journey."
                )}
              </h1>
              <p className="tamil-body max-w-2xl text-base text-muted-foreground sm:text-lg">
                {pickLanguage(
                  language,
                  "தேடல், தகுதி, ஆவணங்கள், விண்ணப்ப படிகள், உதவி வழிகள் அனைத்தும் ஒரே நம்பகமான முகப்பில் அமைந்திருக்க வேண்டும்.",
                  "Combine search, eligibility, documents, application steps, and support paths into one reliable service landing page."
                )}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.labelEn}
                  className="rounded-md border bg-card px-4 py-3 shadow-xs"
                >
                  <div className="font-mono text-2xl font-bold text-primary">
                    {item.value}
                  </div>
                  <div className="tamil-label text-sm text-muted-foreground">
                    {pickLanguage(language, item.labelTa, item.labelEn)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="min-w-0 shadow-sm">
            <CardHeader>
              <CardTitle className="tamil-heading">
                {pickLanguage(language, "சேவை தேடல்", "Service search")}
              </CardTitle>
              <CardDescription className="tamil-body">
                {pickLanguage(
                  language,
                  "பொதுமக்கள் பயன்படுத்தும் சொற்களால் தேட அனுமதிக்கவும்.",
                  "Let citizens search with the words they naturally use."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder={pickLanguage(
                    language,
                    "சேவை, திட்டம், துறை, ஆவணம் தேடுங்கள்",
                    "Search service, scheme, department, document"
                  )}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <a
                    key={item.en}
                    href={joinHref(baseHref, `/search?q=${encodeURIComponent(item.en)}`)}
                    className="rounded-md border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {pickLanguage(language, item.ta, item.en)}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="tamil-heading text-2xl font-bold">
              {pickLanguage(language, "முக்கிய சேவை பாதைகள்", "Core service paths")}
            </h2>
            <p className="tamil-body max-w-2xl text-sm text-muted-foreground">
              {pickLanguage(
                language,
                "ஒவ்வொரு அட்டையும் பயனரின் உண்மையான நோக்கத்தை முதலில் காட்டும் வகையில் வடிவமைக்கப்பட்டுள்ளது.",
                "Each card starts with the real citizen intent, then moves toward action."
              )}
            </p>
          </div>
          <a
            href={joinHref(baseHref, "/services")}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-fit")}
          >
            {pickLanguage(language, "அனைத்து சேவைகள்", "All services")}
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {serviceCards.map((service) => {
            const Icon = service.icon

            return (
              <Card key={service.titleEn} className="min-w-0">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="tamil-heading">
                    {pickLanguage(language, service.titleTa, service.titleEn)}
                  </CardTitle>
                  <CardDescription className="tamil-body">
                    {pickLanguage(language, service.textTa, service.textEn)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(isTamil ? service.tagsTa : service.tagsEn).map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-md">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={joinHref(baseHref, service.href)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {pickLanguage(language, "வழிகாட்டியை திற", "Open guide")}
                    <ArrowRight className="size-4" />
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="border-y bg-muted/25">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="min-w-0">
            <h2 className="tamil-heading text-2xl font-bold">
              {pickLanguage(language, "ஆவணங்கள் மற்றும் உதவி", "Documents and help")}
            </h2>
            <p className="tamil-body mt-2 text-sm text-muted-foreground">
              {pickLanguage(
                language,
                "முக்கிய ஆவணங்கள், துறை தொடர்புகள், உதவி வழிகள் ஆகியவை முகப்பிலேயே கிடைக்க வேண்டும்.",
                "Important documents, department contacts, and help paths should be visible from the landing page."
              )}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {documentCards.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.titleEn}
                  href={joinHref(baseHref, item.href)}
                  className="group rounded-md border bg-card p-4 shadow-xs transition-colors hover:border-primary/40"
                >
                  <Icon className="mb-4 size-5 text-primary" />
                  <h3 className="tamil-heading font-semibold">
                    {pickLanguage(language, item.titleTa, item.titleEn)}
                  </h3>
                  <p className="tamil-body mt-1 text-sm text-muted-foreground">
                    {pickLanguage(language, item.textTa, item.textEn)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {pickLanguage(language, "செல்", "Open")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="grid gap-5 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="min-w-0">
              <ShieldCheck className="mb-3 size-6" />
              <h2 className="tamil-heading text-2xl font-bold">
                {pickLanguage(language, "நம்பிக்கை குறிப்பை தெளிவாக காட்டுங்கள்", "Show trust signals clearly")}
              </h2>
              <p className="tamil-body mt-2 max-w-3xl text-sm text-primary-foreground/85">
                {pickLanguage(
                  language,
                  "அரசு சேவை UI-ல் அதிகாரப்பூர்வ மூலங்கள், கடைசி புதுப்பிப்பு, தகுதி, தேவையான ஆவணங்கள், புகார் வழி ஆகியவை மறையக்கூடாது.",
                  "In public service UI, official sources, last update, eligibility, required documents, and grievance paths should never be hidden."
                )}
              </p>
            </div>
            <a
              href={joinHref(baseHref, "/help")}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "w-full bg-background text-foreground hover:bg-background/90 sm:w-auto"
              )}
            >
              {pickLanguage(language, "உதவி மையம்", "Help center")}
              <ArrowRight className="size-4" />
            </a>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
