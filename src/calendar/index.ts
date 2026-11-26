import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NCalendarImpl from './src/Calendar'

export { calendarProps } from './src/Calendar'
export type { CalendarProps } from './src/Calendar'

export const NCalendar: WithNativeAttrs<typeof NCalendarImpl, HTMLAttributes>
  = NCalendarImpl
