import type { Locale } from 'date-fns'
import frFR from 'date-fns/locale/fr'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateFrFR: NDateLocale = {
  name: 'fr-FR',
  locale: frFR
}

export { NDateLocale }
export default dateFrFR
