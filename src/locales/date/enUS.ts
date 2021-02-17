import type { Locale } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateEnUs: NDateLocale = {
  name: 'en-US',
  locale: enUS
}

export { NDateLocale }
export default dateEnUs
