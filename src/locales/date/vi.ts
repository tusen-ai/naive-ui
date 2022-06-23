import viVN from 'date-fns/esm/locale/vi'
import type { Locale } from 'date-fns'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateVi: NDateLocale = {
  name: 'viVN',
  locale: viVN
}

export { NDateLocale }
export default dateVi
