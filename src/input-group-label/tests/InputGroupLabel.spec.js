import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { inputGroupLabelLight } from '../styles'
import { NInputGroupLabel } from '../index'

describe('n-input-group-label', () => {
  const naive = create({
    locales: [enUS],
    styles: [inputGroupLabelLight]
  })
  it('should work with import on demand', () => {
    mount(NInputGroupLabel, {
      global: {
        plugins: [naive]
      }
    })
  })
})
