import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { dialogLight } from '../styles'
import { NDialog } from '../index'

describe('n-dialog', () => {
  const naive = create({
    locales: [enUS],
    styles: [dialogLight]
  })
  it('should work with import on demand', () => {
    mount(NDialog, {
      global: {
        plugins: [naive]
      }
    })
  })
})
