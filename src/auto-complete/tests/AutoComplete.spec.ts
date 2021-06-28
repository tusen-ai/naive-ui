import { mount } from '@vue/test-utils'
import { NAutoComplete, AutoCompleteProps } from '../index'

describe('n-auto-complete', () => {
  it('should work with import on demand', () => {
    mount(NAutoComplete)
  })
})

it('should work with `loading` prop', async () => {
  const options: AutoCompleteProps['options'] = ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    const prefix = 'test'
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
  const wrapper = mount(NAutoComplete, {
    props: {
      loading: true,
      value: 'test',
      options: options
    }
  })
  const triggerNodeWrapper = wrapper.find('input')
  expect(triggerNodeWrapper.exists()).toBe(true)
  await triggerNodeWrapper.trigger('focus')
  expect(document.querySelector('.n-base-select-menu__loading')).not.toEqual(null)
  wrapper.unmount()
})


