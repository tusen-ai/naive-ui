import enUS from 'date-fns/esm/locale/en-US'
import type { Locale } from 'date-fns'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateEnUs: NDateLocale = {
  name: 'en-US',
  locale: enUS
}

export type { NDateLocale }
export default dateEnUs
