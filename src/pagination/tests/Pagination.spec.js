import create from '../../create'
import { enUS } from '../../locale'
import { paginationLight } from '../styles'
import { mount } from '@vue/test-utils'
import Pagination from '../index'

describe('n-pagination', () => {
  const naive = create({
    fallbackLocale: enUS,
    fallbackTheme: 'light',
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
