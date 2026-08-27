import { mount } from '@vue/test-utils'
import NFocusDetector from '../index'

describe('n-focus-detector', () => {
  it('should not throw an error on blur without `on-blur` prop', async () => {
    const errorHandler = vi.fn()
    const wrapper = mount(NFocusDetector, {
      props: { onFocus: () => {} },
      global: { config: { errorHandler } }
    })

    await wrapper.trigger('blur')
    expect(errorHandler).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
