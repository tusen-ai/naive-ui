import type { HeatmapData } from '../index'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { heatmapMockData, NHeatmap } from '../index'

describe('n-heatmap', () => {
  it('should work with import on demand', () => {
    mount(NHeatmap)
  })

  it('should work with `data` prop', () => {
    const data: HeatmapData = [
      { timestamp: new Date('2024-01-01').getTime(), value: 5 },
      { timestamp: new Date('2024-01-02').getTime(), value: 3 }
    ]
    const wrapper = mount(NHeatmap, { props: { data } })
    expect(wrapper.find('.n-heatmap').exists()).toBe(true)
    expect(wrapper.find('.n-heatmap__calendar-table').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `loading` prop', async () => {
    const wrapper = mount(NHeatmap, { props: { loading: false } })

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.n-heatmap').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `showWeekLabels` prop', async () => {
    const data = heatmapMockData()
    const wrapper = mount(NHeatmap, { props: { data, showWeekLabels: true } })
    expect(wrapper.find('.n-heatmap__week-label-cell').exists()).toBe(true)

    await wrapper.setProps({ showWeekLabels: false })
    expect(wrapper.find('.n-heatmap__week-label-cell').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `showMonthLabels` prop', async () => {
    const data = heatmapMockData()
    const wrapper = mount(NHeatmap, { props: { data, showMonthLabels: true } })
    expect(wrapper.find('.n-heatmap__month-label-cell').exists()).toBe(true)

    await wrapper.setProps({ showMonthLabels: false })
    expect(wrapper.find('.n-heatmap__month-label-cell').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `showColorIndicator` prop', async () => {
    const data = heatmapMockData()
    const wrapper = mount(NHeatmap, {
      props: { data, showColorIndicator: true }
    })
    expect(wrapper.find('.n-heatmap-color-indicator').exists()).toBe(true)

    await wrapper.setProps({ showColorIndicator: false })
    expect(wrapper.find('.n-heatmap-color-indicator').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `colorTheme` prop', () => {
    ;(['github', 'blue', 'green'] as const).forEach((theme) => {
      const data = heatmapMockData()
      const wrapper = mount(NHeatmap, { props: { data, colorTheme: theme } })
      expect(wrapper.find('.n-heatmap').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  it('should work with `size` prop', () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const data = heatmapMockData()
      const wrapper = mount(NHeatmap, { props: { data, size } })
      expect(wrapper.find('.n-heatmap').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  it('should work with `weekStartsOn` prop', () => {
    ;([0, 1, 6] as const).forEach((weekStartsOn) => {
      const data = heatmapMockData()
      const wrapper = mount(NHeatmap, { props: { data, weekStartsOn } })
      expect(wrapper.find('.n-heatmap').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  it('should work with info slot', () => {
    const data = heatmapMockData()
    const wrapper = mount(NHeatmap, {
      props: { data },
      slots: {
        info: () => h('div', { class: 'custom-info' }, 'Custom Info')
      }
    })
    expect(wrapper.find('.custom-info').exists()).toBe(true)
    expect(wrapper.find('.custom-info').text()).toBe('Custom Info')
    wrapper.unmount()
  })

  it('should work with indicator slot', () => {
    const data = heatmapMockData()
    const wrapper = mount(NHeatmap, {
      props: { data, showColorIndicator: false },
      slots: {
        indicator: () =>
          h('div', { class: 'custom-indicator' }, 'Custom Indicator')
      }
    })
    expect(wrapper.find('.custom-indicator').exists()).toBe(true)
    expect(wrapper.find('.custom-indicator').text()).toBe('Custom Indicator')
    wrapper.unmount()
  })
})
