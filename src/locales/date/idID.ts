import type { Locale } from 'date-fns'
import idID from 'date-fns/locale/id'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateIdID: NDateLocale = {
  name: 'id-ID',
  locale: idID
}

export { NDateLocale }
export default dateIdID
