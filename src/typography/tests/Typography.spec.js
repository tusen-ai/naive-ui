import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { typographyLight } from '../styles'
import { NTypography } from '../index'

describe('n-typography', () => {
  const naive = create({
    locales: [enUS],
    styles: [typographyLight]
  })
  it('should work with import on demand', () => {
    mount(NTypography, {
      global: {
        plugins: [naive]
      }
    })
  })
})
