import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { statisticLight } from '../styles'
import { NStatistic } from '../index'

describe('n-statistic', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      statisticLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NStatistic, {
      global: {
        plugins: [naive]
      }
    })
  })
})
