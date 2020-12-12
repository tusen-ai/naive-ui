import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { paginationLight } from '../styles'
import { NPagination } from '../index'

describe('n-pagination', () => {
  const naive = create({
    locales: [enUS],
    styles: [paginationLight]
  })
  it('should work with import on demand', () => {
    mount(NPagination, {
      global: {
        plugins: [naive]
      }
    })
  })
})
