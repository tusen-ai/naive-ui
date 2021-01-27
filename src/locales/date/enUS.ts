import { enUS } from 'date-fns/locale'

const dateEnUs = {
  name: 'en-US',
  locale: enUS
}

export type NaiveDateLocale = typeof dateEnUs
export default dateEnUs
