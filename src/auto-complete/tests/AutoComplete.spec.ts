import { mount } from '@vue/test-utils'
import { NAutoComplete, AutoCompleteProps } from '../index'

describe('n-auto-complete', () => {
  it('should work with import on demand', () => {
    mount(NAutoComplete)
  })
})

it('should work with `loading` prop', async () => {
  const options: AutoCompleteProps['options'] = [
    '@gmail.com',
    '@163.com',
    '@qq.com'
  ].map((suffix) => {
    const prefix = 'test'
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
  const wrapper = mount(NAutoComplete, {
    props: {
      options: options
    }
  })
  expect(wrapper.find('.n-base-loading').exists()).toBe(false)
  await wrapper.setProps({ loading: true })
  expect(wrapper.find('.n-base-loading').exists()).toBe(true)
  wrapper.unmount()
})
