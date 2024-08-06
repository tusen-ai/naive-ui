import type { FormatOptions as DateFnsFormatOptions } from 'date-fns'

export type FormatOptions = Omit<DateFnsFormatOptions, 'locale'>
