import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { tooltipLight } from '../styles'
import { NTooltip } from '../index'

describe('n-tooltip', () => {
  const naive = create({
    locales: [enUS],
    styles: [tooltipLight]
  })
  it('should work with import on demand', () => {
    mount(NTooltip, {
      global: {
        plugins: [naive]
      }
    })
  })
})
