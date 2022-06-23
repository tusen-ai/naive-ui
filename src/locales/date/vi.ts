import vi from 'date-fns/esm/locale/vi'
import type { Locale } from 'date-fns'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateVi: NDateLocale = {
  name: 'vi',
  locale: vi
}

export { NDateLocale }
export default dateVi
