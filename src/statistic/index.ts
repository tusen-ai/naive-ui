import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NStatisticImpl from './src/Statistic'

export { statisticProps } from './src/Statistic'
export type { StatisticProps, StatisticSlots } from './src/Statistic'

export const NStatistic: WithNativeAttrs<
  typeof NStatisticImpl,
  HTMLAttributes
> = NStatisticImpl
