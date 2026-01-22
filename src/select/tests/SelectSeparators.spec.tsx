import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import { nextTick } from 'vue'
import { NInternalSelection, NInternalSelectMenu } from '../../_internal'
import { NSelect } from '../index'

describe('separators related cases', () => {
  it('should not tokenize if no separator matched', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue('abc')
    await nextTick()

    expect(onUpdateValue).not.toHaveBeenCalled()
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(
      'abc'
    )

    wrapper.unmount()
  })

  it('tokenize input with multiple separators', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [' ', ',', ';'],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue('1 2,3;4;5,,,,;6 7,8 ')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8'
    ])
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('tokenize input with multi-char separator', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: ['||'],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue('a||b||c||')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['a', 'b', 'c'])
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('tokenize input with repeated single separator', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: ['.'],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue('a1.a2.a3.a4.')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['a1', 'a2', 'a3', 'a4'])

    const tagTexts = wrapper.findAll('.n-tag').map(node => node.text())
    expect(tagTexts).toEqual(['a1', 'a2', 'a3', 'a4'])
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('tokenize input with Chinese comma', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: ['，'],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue('a，b')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['a', 'b'])
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('should ignore empty tokens', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue(',,,')
    await nextTick()

    expect(onUpdateValue).not.toHaveBeenCalled()
    expect(wrapper.findAll('.n-tag')).toHaveLength(0)
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('should keep menu open after tokenization', async () => {
    const onUpdateShow = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        separators: [','],
        onUpdateShow,
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ],
        virtualScroll: false
      }
    })

    const selection = wrapper.findComponent(NInternalSelection)
    await selection.trigger('click')
    await nextTick()
    expect(wrapper.findComponent(NInternalSelectMenu).exists()).toBe(true)

    await wrapper.find('input').setValue('2,3,4')
    await nextTick()

    expect(wrapper.findComponent(NInternalSelectMenu).exists()).toBe(true)
    expect(onUpdateShow).not.toHaveBeenLastCalledWith(false)

    wrapper.unmount()
  })

  it('tokenize input (tag + multiple)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue('a,b,,c,')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['a', 'b', 'c'])
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('tokenize input (tags, include existing option)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue('2,3,4')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['2', '3', '4'])
    const tagTexts = wrapper.findAll('.n-tag').map(node => node.text())
    expect(tagTexts).toEqual(['2', '3', '4'])
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('paste should fully consume and clear input (tag + multiple)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')
    await input.trigger('paste', {
      clipboardData: { getData: () => 'a,b,c' }
    })
    await input.setValue('a,b,c')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['a', 'b', 'c'])
    expect((input.element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('paste should trim tokens (tag + multiple)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')
    await input.trigger('paste', {
      clipboardData: { getData: () => ' a ,  b ,c ' }
    })
    await input.setValue(' a ,  b ,c ')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['a', 'b', 'c'])
    expect((input.element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('paste should select only matching tokens and clear all input (multiple)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        multiple: true,
        show: false,
        virtualScroll: false,
        separators: [','],
        options: [
          { label: 'red', value: 'red' },
          { label: 'blue', value: 'blue' }
        ],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')
    await input.trigger('paste', {
      clipboardData: { getData: () => 'red,green,blue,yellow' }
    })
    await input.setValue('red,green,blue,yellow')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['red', 'blue'])
    expect((input.element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('paste with no separator matched should behave like normal paste (tag + multiple)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')
    await input.trigger('paste', {
      clipboardData: { getData: () => 'abc' }
    })
    await input.setValue('abc')
    await nextTick()

    expect(onUpdateValue).not.toHaveBeenCalled()
    expect((input.element as HTMLInputElement).value).toBe('abc')

    wrapper.unmount()
  })

  // special cases
  ;[
    {
      separators: [' ', '\n'],
      clipboardText: '\n  light\n  bamboo\n  ',
      inputValue: '   light   bamboo   '
    },
    {
      separators: ['\r\n'], // Windows related
      clipboardText: '\r\nlight\r\nbamboo\r\n',
      inputValue: ' light bamboo'
    },
    {
      separators: [' ', '\r\n'],
      clipboardText: '\r\n light\r\n bamboo\r\n ',
      inputValue: '  light  bamboo  '
    },
    {
      separators: ['\n'],
      clipboardText: '\nlight\nbamboo\n',
      inputValue: ' light bamboo'
    }
  ].forEach(({ separators, clipboardText, inputValue }) => {
    it(`paste content to split (tag + multiple) (${JSON.stringify(separators)})`, async () => {
      const onUpdateValue = vi.fn()
      const wrapper = mount(NSelect, {
        attachTo: document.body,
        props: {
          filterable: true,
          tag: true,
          multiple: true,
          show: false,
          virtualScroll: false,
          separators,
          onUpdateValue
        }
      })

      const input = wrapper.find('input')
      await input.trigger('paste', {
        clipboardData: { getData: () => clipboardText }
      })
      await input.setValue(inputValue)
      await nextTick()

      expect(onUpdateValue).toHaveBeenCalledTimes(1)
      expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['light', 'bamboo'])

      wrapper.unmount()
    })
  })

  // it('typing should keep non-matching suffix (multiple)', async () => {
  //   const onUpdateValue = vi.fn()
  //   const wrapper = mount(NSelect, {
  //     attachTo: document.body,
  //     props: {
  //       filterable: true,
  //       multiple: true,
  //       show: false,
  //       virtualScroll: false,
  //       separators: [','],
  //       options: [
  //         { label: 'apple', value: 'apple' },
  //         { label: 'banana', value: 'banana' }
  //       ],
  //       onUpdateValue
  //     }
  //   })

  //   await wrapper.find('input').setValue('apple,c')
  //   await nextTick()

  //   expect(onUpdateValue).toHaveBeenCalledTimes(1)
  //   expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['apple'])
  //   expect((wrapper.find('input').element as HTMLInputElement).value).toBe('c')

  //   wrapper.unmount()
  // })

  it('tokenize input (multiple respects labelField)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        multiple: true,
        show: false,
        virtualScroll: false,
        separators: [','],
        labelField: 'name',
        options: [
          { name: 'One', value: 1 },
          { name: 'Two', value: 2 }
        ],
        onUpdateValue
      }
    })

    await wrapper.find('input').setValue('One,Two')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual([1, 2])
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  it('should work when menu is closed (tag + composition + enter)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')
    await input.trigger('compositionstart')
    await input.setValue('Star Kirby')
    await input.trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(onUpdateValue).not.toHaveBeenCalled()

    await input.trigger('compositionend')
    await input.trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['Star Kirby'])

    wrapper.unmount()
  })

  it('should not tokenize during composition but trigger after composition end (tag + multiple)', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [','],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')
    await input.trigger('compositionstart')
    await input.setValue('a,b')
    await nextTick()
    expect(onUpdateValue).not.toHaveBeenCalled()

    await input.trigger('compositionend')
    await nextTick()
    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['a', 'b'])

    wrapper.unmount()
  })

  it('shouldn\'t tokenize words during composition in multiple mode', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        multiple: true,
        show: false,
        virtualScroll: false,
        separators: [','],
        options: [
          { label: 'One', value: 1 },
          { label: 'Two', value: 2 }
        ],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')
    await input.trigger('compositionstart')
    await input.setValue('One,Two,Three')
    await nextTick()
    expect(onUpdateValue).not.toHaveBeenCalled()

    await input.trigger('compositionend')
    await input.setValue('One,Two,Three')
    await nextTick()

    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual([1, 2])

    wrapper.unmount()
  })

  it('chinese input composition should not tokenize prematurely', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        tag: true,
        multiple: true,
        show: false,
        separators: [',', '，'],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')

    // Simulate Chinese IME input: typing "nihao,shijie" becomes "你好,世界"
    await input.trigger('compositionstart')
    await input.setValue('nihao,shijie')
    await nextTick()

    // Should not tokenize during composition even though ',' is present
    expect(onUpdateValue).not.toHaveBeenCalled()
    expect((input.element as HTMLInputElement).value).toBe('nihao,shijie')

    // User confirms composition - setValue triggers input event which causes tokenization
    await input.trigger('compositionend')
    await nextTick()

    // Should tokenize after composition ends
    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['nihao', 'shijie'])
    expect((input.element as HTMLInputElement).value).toBe('')

    wrapper.unmount()
  })

  // This is different from the original behavior
  it('backspace should delete selected tag but should not delete disabled option', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        filterable: true,
        multiple: true,
        show: false,
        virtualScroll: false,
        value: ['Option2', 'Option1'],
        options: [
          { label: 'Option1', value: 'Option1', disabled: true },
          { label: 'Option2', value: 'Option2', disabled: false }
        ],
        onUpdateValue
      }
    })

    const input = wrapper.find('input')
    expect(wrapper.findAll('.n-tag')).toHaveLength(2)

    await input.trigger('keydown', { key: 'Backspace' })
    await nextTick()

    // Should remove Option2 and keep disabled Option1
    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0]?.[0]).toEqual(['Option1'])

    // Update value prop to reflect the change (simulating controlled component update)
    await wrapper.setProps({ value: ['Option1'] })
    await nextTick()
    expect(wrapper.findAll('.n-tag')).toHaveLength(1)

    await input.trigger('keydown', { key: 'Backspace' })
    await nextTick()

    // Should not remove disabled Option1
    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(wrapper.findAll('.n-tag')).toHaveLength(1)

    wrapper.unmount()
  })
})
