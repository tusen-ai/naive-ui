import type { Locale } from 'date-fns'
import { enUS } from 'date-fns/locale'

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
