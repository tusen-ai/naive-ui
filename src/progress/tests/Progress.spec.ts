import { mount } from '@vue/test-utils'
import { NProgress } from '../index'

describe('n-progress', () => {
  it('should work with import on demand', () => {
    mount(NProgress)
  })

  it('should work with `type` prop', async () => {
    ;(['line', 'circle', 'multiple-circle'] as const).forEach((item) => {
      const wrapper = mount(NProgress, { props: { type: item } })
      expect(wrapper.find('.n-progress').classes()).toContain(
        `n-progress--${item}`
      )
    })
  })
})
