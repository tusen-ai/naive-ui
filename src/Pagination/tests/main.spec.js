import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Pagination from '../src/main.vue'

describe('n-pagination', () => {
  describe('props.page', () => {
    it('should work', () => {
      const wrapper = mount(Pagination, {
        propsData: {
          page: 5,
          pageCount: 10
        }
      })
      expect(
        wrapper
          .find('.n-pagination-item--active')
          .text()
      ).to.equal('5')
    })
  })
})
