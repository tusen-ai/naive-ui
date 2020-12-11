import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { timelineLight } from '../styles'
import { NTimeline } from '../index'

describe('n-timeline', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      timelineLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NTimeline, {
      global: {
        plugins: [naive]
      }
    })
  })
})
