import { createContext, useContext, useEffect, useState } from 'react'

// Script/language for displaying the song verses:
//   'en' → romanized (IAST)   ·   'hi' → Devanagari   ·   'bn' → Bengali
export const LANGS = [
  { code: 'en', label: 'EN', name: 'Romanized' },
  { code: 'hi', label: 'हिन्दी', name: 'Devanagari' },
  { code: 'bn', label: 'বাংলা', name: 'Bengali' },
]

const STORAGE_KEY = 'sharanagati-lang'
const LanguageContext = createContext({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && LANGS.some((l) => l.code === saved)) return saved
    }
    return 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

// Pick the right verse lines + font for the current language.
export function verseLines(verse, lang) {
  if (lang === 'hi') return verse.deva || verse.translit
  if (lang === 'bn') return verse.bengali || verse.translit
  return verse.translit
}

export function langFontClass(lang) {
  if (lang === 'hi') return 'font-deva'
  if (lang === 'bn') return 'font-bengali'
  return 'font-serif italic'
}
