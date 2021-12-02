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

    await wrapper.setProps({ 'bottom-bordered': false })
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

    await wrapper.setProps({ 'single-column': true })
    expect(wrapper.find('.n-table').classes()).toContain(
      'n-table--single-column'
    )
  })

  it('should work with `single-line` prop', async () => {
    const wrapper = mount(NTable)
    expect(wrapper.find('.n-table').classes()).toContain('n-table--single-line')

    await wrapper.setProps({ 'single-line': false })
    expect(wrapper.find('.n-table').classes()).not.toContain(
      'n-table--single-line'
    )
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
