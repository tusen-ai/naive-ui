import { mount } from '@vue/test-utils'
import { NUpload } from '../index'
import { sleep } from 'seemly'

const getMockFile = (element: Element, files: File[]): void => {
  Object.defineProperty(element, 'files', {
    get () {
      return files
    }
  })
}

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

  it('should work with `on-before-upload` prop', async () => {
    const onBeforeUpload = jest.fn(async () => true)
    const onChange = jest.fn()
    const wrapper = mount(NUpload, {
      props: {
        onBeforeUpload,
        onChange
      }
    })
    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    getMockFile(input.element, fileList)
    await input.trigger('change')

    expect(onBeforeUpload).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalled()
  })

  it('should work with `list-type` prop', async () => {
    const wrapper = mount(NUpload, {
      props: {
        listType: 'text',
        action: 'http://www.mocky.io/v2/5e4bafc63100007100d8b70f'
      }
    })
    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    getMockFile(input.element, fileList)
    await input.trigger('change')

    expect(wrapper.findAll('.n-upload-file--text-type').length).toBe(1)

    await wrapper.setProps({
      listType: 'image'
    })
    expect(wrapper.findAll('.n-upload-file--image-type').length).toBe(1)

    await wrapper.setProps({
      listType: 'image-card'
    })
    expect(wrapper.findAll('.n-upload-file--image-card-type').length).toBe(1)
  })

  it('should work with `create-thumbnail-url` prop', async () => {
    const createThumbnailUrl = async (): Promise<string> => '/testThumbUrl.png'
    const wrapper = mount(NUpload, {
      props: {
        listType: 'image',
        createThumbnailUrl
      }
    })
    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(1000)
    expect(
      wrapper.find('.n-upload-file-info__thumbnail img').attributes('src')
    ).toEqual('/testThumbUrl.png')
  })

  it('should work with `on-preview` prop', async () => {
    const onPreview = jest.fn()
    const wrapper = mount(NUpload, {
      props: {
        defaultFileList: [
          {
            name: 'test.png',
            url: '/testUrl.png',
            status: 'finished',
            id: 'test',
            percentage: 100,
            file: null
          }
        ],
        onPreview
      }
    })
    const urlName = wrapper.findAll('.n-upload-file-info__name > a')[0]
    await urlName.trigger('click')

    expect(onPreview).toHaveBeenCalled()
  })

  it('should work with `show-remove-button` and `on-remove` prop', async () => {
    const onRemove = jest.fn()
    const wrapper = mount(NUpload, {
      props: {
        defaultFileList: [
          {
            name: 'test.png',
            url: '/testUrl.png',
            status: 'finished',
            id: 'test',
            percentage: 100,
            file: null
          }
        ],
        onRemove,
        showRemoveButton: false
      }
    })
    let button = wrapper.find('.n-button--default-type')
    expect(button.exists()).not.toBe(true)

    await wrapper.setProps({
      showRemoveButton: true
    })

    button = wrapper.find('.n-button--default-type')
    expect(button.exists()).toBe(true)

    await button.trigger('click')
    expect(onRemove).toHaveBeenCalled()
  })

  it('should work with `show-cancel-button` and `on-remove` prop', async () => {
    const onRemove = jest.fn()
    const wrapper = mount(NUpload, {
      props: {
        defaultFileList: [
          {
            name: 'test.png',
            url: '/testUrl.png',
            status: 'error',
            id: 'test',
            percentage: 0,
            file: null
          }
        ],
        onRemove,
        showCancelButton: false
      }
    })
    let button = wrapper.findAll('.n-button--error-type')
    expect(button.length).toEqual(1)

    await wrapper.setProps({
      showCancelButton: true
    })

    button = wrapper.findAll('.n-button--error-type')
    expect(button.length).toEqual(2)

    await button[0].trigger('click')
    expect(onRemove).toHaveBeenCalled()
  })

  it('should work with `accept` prop', async () => {
    const wrapper = mount(NUpload)
    expect(wrapper.find('input').attributes('accept')).not.toBe('.doc')

    await wrapper.setProps({
      accept: '.doc'
    })
    expect(wrapper.find('input').attributes('accept')).toBe('.doc')
  })

  it('should work with `multiple` prop', async () => {
    const wrapper = mount(NUpload)
    expect(wrapper.find('input').attributes('multiple')).not.toBe('')

    await wrapper.setProps({
      multiple: true
    })
    expect(wrapper.find('input').attributes('multiple')).toBe('')
  })
})
