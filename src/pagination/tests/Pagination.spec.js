import create from '../../create'
import { paginationLight } from '../styles'
import { mount } from '@vue/test-utils'
import { NPagination } from '../index'
import enUS from '../../locales/enUS'

describe('n-pagination', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      paginationLight
    ]
  })
  describe('props.page', () => {
    it('should work', () => {
      const wrapper = mount(NPagination, {
        props: {
          page: 5,
          pageCount: 10
        },
        global: {
          plugins: [naive]
        }
      })
      expect(
        wrapper
          .find('.n-pagination-item--active')
          .text()
      ).toEqual('5')
    })
  })
})
