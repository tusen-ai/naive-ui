import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { NLegacyTransfer } from '../index'

describe('n-legacy-transfer', () => {
  it('should work with import on demand', () => {
    mount(NLegacyTransfer)
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(NLegacyTransfer, { props: { disabled: true } })
    expect(wrapper.find('.n-legacy-transfer').attributes('class')).toContain(
      'n-legacy-transfer--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `filterable` prop', () => {
    const wrapper = mount(NLegacyTransfer, { props: { filterable: true } })
    expect(wrapper.find('.n-legacy-transfer').attributes('class')).toContain(
      'n-legacy-transfer--filterable'
    )
    wrapper.unmount()
  })

  it('should work with `filter` prop', async () => {
    const options = [
      {
        label: 'test1',
        value: 'test1'
      }
    ]
    const onFilter = jest.fn()
    const wrapper = mount(NLegacyTransfer, {
      props: { filterable: true, filter: onFilter, options }
    })
    await wrapper.find('input').setValue('1')
    await sleep(300)
    expect(onFilter).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(NLegacyTransfer, {
        props: { size: i }
      })
      expect(
        wrapper.find('.n-legacy-transfer').attributes('style')
      ).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `source-filter-placeholder`、`target-filter-placeholder` props', async () => {
    const wrapper = mount(NLegacyTransfer, {
      props: {
        filterable: true,
        'source-filter-placeholder': 'test-source',
        'target-filter-placeholder': 'test-target'
      }
    })
    expect(wrapper.findAll('input')[0].attributes('placeholder')).toBe(
      'test-source'
    )
    expect(wrapper.findAll('input')[1].attributes('placeholder')).toBe(
      'test-target'
    )
    wrapper.unmount()
  })

  it('should work with `source-title`、`target-title` props', async () => {
    const wrapper = mount(NLegacyTransfer, {
      props: {
        'source-title': 'test-source',
        'target-title': 'test-target'
      }
    })
    expect(
      wrapper.findAll('.n-legacy-transfer-list-header__header')[0].text()
    ).toBe('test-source')
    expect(
      wrapper.findAll('.n-legacy-transfer-list-header__header')[1].text()
    ).toBe('test-target')
    wrapper.unmount()
  })
})
