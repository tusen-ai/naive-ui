import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { tableLight } from '../styles'
import { NTable } from '../index'

describe('n-table', () => {
  const naive = create({
    locales: [enUS],
    styles: [tableLight]
  })
  it('should work with import on demand', () => {
    mount(NTable, {
      global: {
        plugins: [naive]
      }
    })
  })
})
