export type TamilUILanguage = "ta" | "en"

export function pickLanguage(
  language: TamilUILanguage | undefined,
  tamil: string,
  english: string
) {
  return language === "en" ? english : tamil
}

export function joinHref(baseHref: string | undefined, path: string) {
  if (!baseHref) return path
  if (/^https?:\/\//.test(path)) return path

  const cleanBase = baseHref.replace(/\/$/, "")
  const cleanPath = path.startsWith("/") ? path : `/${path}`

  return `${cleanBase}${cleanPath}`
}
