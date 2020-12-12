import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { dataTableLight } from '../styles'
import { NDataTable } from '../index'

describe('n-data-table', () => {
  const naive = create({
    locales: [enUS],
    styles: [dataTableLight]
  })
  it('should work with import on demand', () => {
    mount(NDataTable, {
      global: {
        plugins: [naive]
      }
    })
  })
})
