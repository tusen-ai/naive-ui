import enUS from 'date-fns/esm/locale/en-US'

interface NDateLocale {
  name: string
  locale: typeof enUS
}

const dateEnUs: NDateLocale = {
  name: 'en-US',
  locale: enUS
}

export { NDateLocale }
export default dateEnUs
