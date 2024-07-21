import { enUS } from 'date-fns/locale'
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
