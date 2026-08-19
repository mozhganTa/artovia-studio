export function useFormattedPrice(
  getPrice: () => number,
) {
  const { locale, t } = useI18n()

  return computed(() => {
    const numberLocale = locale.value === 'fa'
      ? 'fa-IR'
      : 'en-US'

    const formattedNumber = new Intl.NumberFormat(
      numberLocale,
    ).format(getPrice())

    return `${formattedNumber} ${t('common.currency')}`
  })
}