import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { popoverLight } from '../styles'
import { NPopover } from '../index'

describe('n-popover', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      popoverLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NPopover, {
      global: {
        plugins: [naive]
      }
    })
  })
})
