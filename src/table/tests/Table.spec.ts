import { mount } from '@vue/test-utils'
import { NTable, NTbody, NThead, NTd, NTh, NTr } from '../index'

describe('n-table', () => {
  it('should work with import on demand', () => {
    mount(NTable)
  })

  it('should work with `bottom-bordered` prop', async () => {
    const wrapper = mount(NTable)
    expect(wrapper.find('.n-table').classes()).toContain(
      'n-table--bottom-bordered'
    )

    await wrapper.setProps({ bottomBordered: false })
    expect(wrapper.find('.n-table').classes()).not.toContain(
      'n-table--bottom-bordered'
    )
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NTable)
    expect(wrapper.find('.n-table').classes()).toContain('n-table--bordered')

    await wrapper.setProps({ bordered: false })
    expect(wrapper.find('.n-table').classes()).not.toContain(
      'n-table--bordered'
    )
  })

  it('should work with `single-column` prop', async () => {
    const wrapper = mount(NTable)
    expect(wrapper.find('.n-table').classes()).not.toContain(
      'n-table--single-column'
    )

    await wrapper.setProps({ singleColumn: true })
    expect(wrapper.find('.n-table').classes()).toContain(
      'n-table--single-column'
    )
  })

  it('should work with `single-line` prop', async () => {
    const wrapper = mount(NTable)
    expect(wrapper.find('.n-table').classes()).toContain('n-table--single-line')

    await wrapper.setProps({ singleLine: false })
    expect(wrapper.find('.n-table').classes()).not.toContain(
      'n-table--single-line'
    )
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(NTable, { props: { size } })
      expect(wrapper.find('.n-table').attributes('style')).toMatchSnapshot()
    })
  })

  it('should work with `striped` prop', async () => {
    const wrapper = mount(NTable)
    expect(wrapper.find('.n-table').classes()).not.toContain('n-table--striped')

    await wrapper.setProps({ striped: true })
    expect(wrapper.find('.n-table').classes()).toContain('n-table--striped')
  })
})

describe('n-table-body', () => {
  it('should work with import on demand', () => {
    mount(NTbody)
  })
})

describe('n-table-head', () => {
  it('should work with import on demand', () => {
    mount(NThead)
  })
})

describe('n-table-td', () => {
  it('should work with import on demand', () => {
    mount(NTd)
  })
})

describe('n-table-th', () => {
  it('should work with import on demand', () => {
    mount(NTh)
  })
})

describe('n-table-tr', () => {
  it('should work with import on demand', () => {
    mount(NTr)
  })
})
