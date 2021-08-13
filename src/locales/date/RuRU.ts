import type { Locale } from 'date-fns'
import ru from 'date-fns/locale/ru'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateRuRU: NDateLocale = {
  name: 'ru-RU',
  locale: ru
}

export { NDateLocale }
export default dateRuRU
