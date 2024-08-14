import type { FormatOptionsWithTZ } from 'date-fns-tz'

export type FormatOptions = Omit<FormatOptionsWithTZ, 'locale'>
