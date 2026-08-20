type AppLocale = 'fa' | 'en'

type LocalizedValue = Record<AppLocale, string>

export function useLocalizedText(
  getText: () => LocalizedValue,
) {
  const { locale } = useI18n()

  return computed(() => {
    return getText()[locale.value as AppLocale]
  })
}