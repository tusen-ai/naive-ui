import create from '../../create'
import { paginationLight } from '../styles'
import { mount } from '@vue/test-utils'
import Pagination from '../index'
import enUS from '../../locale/enUS'

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
      const wrapper = mount(Pagination, {
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
