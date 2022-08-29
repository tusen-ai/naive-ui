import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { NTransfer } from '../index'

describe('n-transfer', () => {
  it('should work with import on demand', () => {
    mount(NTransfer)
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(NTransfer, { props: { disabled: true } })
    expect(wrapper.find('.n-transfer').attributes('class')).toContain(
      'n-transfer--disabled'
    )
  })

  it('should work with `source-filterable` prop', async () => {
    const wrapper = mount(NTransfer, {
      props: { sourceFilterable: true }
    })
    expect(
      wrapper.find('.n-transfer-list--source .n-transfer-filter').exists()
    ).toBe(true)
  })

  it('should work with `filter` prop', async () => {
    const options = [
      {
        label: 'test1',
        value: 'test1'
      }
    ]
    const onFilter = jest.fn()
    const wrapper = mount(NTransfer, {
      props: { sourceFilterable: true, filter: onFilter, options }
    })
    await wrapper.find('input').setValue('1')
    await sleep(300)
    expect(onFilter).toHaveBeenCalled()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(NTransfer, {
        props: { size: i }
      })
      expect(wrapper.find('.n-transfer').attributes('style')).toMatchSnapshot()
    })
  })

  it('should work with `source-title` prop', async () => {
    const test = 'source-title-test'
    const wrapper = mount(NTransfer, { props: { sourceTitle: test } })
    expect(wrapper.find('.n-transfer-list-header__title').text()).toBe(test)
  })

  it('should work with `target-title` prop', async () => {
    const test = 'target-title-test'
    const wrapper = mount(NTransfer, { props: { targetTitle: test } })
    expect(wrapper.find('.n-transfer-list-header__title').text()).toBe(test)
  })

  it('should work with `source-filter-placeholder` prop', async () => {
    const test = 'source-filter-placeholder-test'
    const wrapper = mount(NTransfer, {
      props: { sourceFilterable: true, sourceFilterPlaceholder: test }
    })
    expect(wrapper.find('.n-input__placeholder').text()).toBe(test)
  })
})
