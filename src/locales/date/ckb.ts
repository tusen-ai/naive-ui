import type { Locale } from 'date-fns'
import { ckb } from 'date-fns/locale'

interface NDateLocale {
  name: string
  locale: Locale
}

const dateCkb: NDateLocale = {
  name: 'ckb',
  locale: ckb
}

export type { NDateLocale }
export default dateCkb
