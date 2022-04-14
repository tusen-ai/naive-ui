import type { Locale } from 'date-fns'
import koKR from 'date-fns/locale/ko-KR'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateKoKr: NDateLocale = {
  name: 'ko-KR',
  locale: koKR
}

export { NDateLocale }
export default datekoKr
