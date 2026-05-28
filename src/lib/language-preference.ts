"use client"

import * as React from "react"

export type LanguagePreference = "tamil" | "english"

const DEFAULT_LANGUAGE: LanguagePreference = "tamil"
const STORAGE_KEY = "tamilds-language-preference"
const listeners = new Set<() => void>()

function normalizeLanguage(value: unknown): LanguagePreference | null {
  if (value === "tamil" || value === "ta") {
    return "tamil"
  }

  if (value === "english" || value === "en") {
    return "english"
  }

  return null
}

function getLanguageSnapshot(): LanguagePreference {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE
  }

  return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY)) ?? DEFAULT_LANGUAGE
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      listener()
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage)
  }

  return () => {
    listeners.delete(listener)

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage)
    }
  }
}

export function languageFromTabValue(value: unknown): LanguagePreference | null {
  return normalizeLanguage(value)
}

export function setLanguagePreference(language: LanguagePreference) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, language)
  }

  listeners.forEach((listener) => listener())
}

export function useLanguagePreference() {
  const language = React.useSyncExternalStore(
    subscribe,
    getLanguageSnapshot,
    () => DEFAULT_LANGUAGE
  )

  const setLanguage = React.useCallback((nextLanguage: LanguagePreference) => {
    setLanguagePreference(nextLanguage)
  }, [])

  return [language, setLanguage] as const
}
