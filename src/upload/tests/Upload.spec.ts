import { mount } from '@vue/test-utils'
import { NUpload } from '../index'

describe('n-upload', () => {
  it('should work with import on demand', () => {
    mount(NUpload)
  })

  it('should work with `show-file-list` prop', async () => {
    const wrapper = mount(NUpload)

    await wrapper.setProps({ showFileList: true })
    expect(wrapper.find('.n-upload-file-list').exists()).toBe(true)

    await wrapper.setProps({ showFileList: false })
    expect(wrapper.find('.n-upload-file-list').exists()).not.toBe(true)
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NUpload)
    expect(wrapper.find('.n-upload--disabled').exists()).not.toBe(true)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-upload').classes()).toContain('n-upload--disabled')
  })
})
