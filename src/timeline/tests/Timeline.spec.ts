import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NTimeline, NTimelineItem } from '../index'

describe('n-timeline', () => {
  it('should work with import on demand', () => {
    mount(NTimeline)
  })

  it('should work with `item-placement` prop', async () => {
    const wrapper = mount(NTimeline)
    expect(wrapper.find('.n-timeline').classes()).toContain(
      'n-timeline--left-placement'
    )
    await wrapper.setProps({ 'item-placement': 'right' })
    expect(wrapper.find('.n-timeline').classes()).toContain(
      'n-timeline--right-placement'
    )
  })

  it('should work with `icon-size` prop', async () => {
    const iconSize = 50
    const wrapper = mount(NTimeline, {
      props: { iconSize },
      slots: { default: () => h(NTimelineItem) }
    })
    expect(wrapper.find('.n-timeline-item').attributes('style')).toContain(
      `--n-icon-size: ${iconSize}px`
    )
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NTimeline)
    expect(wrapper.find('.n-timeline').classes()).toContain(
      'n-timeline--medium-size'
    )
    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-timeline').classes()).toContain(
      'n-timeline--large-size'
    )
  })

  it('should work with `default` slot', async () => {
    const wrapper = mount(NTimeline, {
      slots: {
        default: () => h(NTimelineItem)
      }
    })
    expect(wrapper.find('.n-timeline').element.children.length).toBe(1)
    expect(
      wrapper.find('.n-timeline').element.children[0].getAttribute('class')
    ).toContain('n-timeline-item')
  })

  it('should work with `horizontal` prop', async () => {
    const wrapper = mount(NTimeline, {
      props: {
        horizontal: true
      }
    })
    expect(wrapper.find('.n-timeline').classes()).toContain(
      'n-timeline--horizontal'
    )
    expect(wrapper.find('.n-timeline').classes()).not.toContain(
      'n-timeline--left-placement'
    )
    expect(wrapper.find('.n-timeline').classes()).not.toContain(
      'n-timeline--right-placement'
    )
  })
})

describe('n-timeline-item', () => {
  it('should work with `color` prop', async () => {
    let wrapper = mount(NTimeline, {
      slots: {
        default: () =>
          h(NTimelineItem, { title: 'test-title' }, { icon: () => 'icon' })
      }
    })
    expect(
      wrapper.find('.n-timeline-item-timeline__icon').attributes('style')
    ).toBe(undefined)

    wrapper = mount(NTimeline, {
      slots: {
        default: () =>
          h(
            NTimelineItem,
            { title: 'test-title', color: 'grey' },
            { icon: () => 'icon' }
          )
      }
    })
    expect(
      wrapper.find('.n-timeline-item-timeline__icon').attributes('style')
    ).toContain('color: grey')

    wrapper.unmount()
  })

  it('should work with `content`, `time`, `title` props', async () => {
    const wrapper = mount(NTimeline, {
      slots: {
        default: () =>
          h(NTimelineItem, {
            title: 'test-title',
            content: 'test-content',
            time: '2021-07-28'
          })
      }
    })
    expect(wrapper.find('.n-timeline-item-content__title').exists()).toBe(true)
    expect(wrapper.find('.n-timeline-item-content__title').text()).toBe(
      'test-title'
    )
    expect(wrapper.find('.n-timeline-item-content__content').exists()).toBe(
      true
    )
    expect(wrapper.find('.n-timeline-item-content__content').text()).toBe(
      'test-content'
    )
    expect(wrapper.find('.n-timeline-item-content__meta').exists()).toBe(true)
    expect(wrapper.find('.n-timeline-item-content__meta').text()).toBe(
      '2021-07-28'
    )
  })

  it('should work with `type` prop', async () => {
    ;(['default', 'success', 'info', 'warning', 'error'] as const).forEach(
      (item) => {
        const wrapper = mount(NTimeline, {
          slots: {
            default: () => h(NTimelineItem, { title: 'test-title', type: item })
          }
        })
        expect(wrapper.find('.n-timeline-item').classes()).toContain(
          `n-timeline-item--${item}-type`
        )
      }
    )
  })

  it('should work with `line-type` prop', () => {
    ;(['default', 'dashed'] as const).forEach((lineType) => {
      const wrapper = mount(NTimeline, {
        slots: {
          default: () => h(NTimelineItem, { title: 'test-title', lineType })
        }
      })

      expect(wrapper.find('.n-timeline-item').classes()).toContain(
        `n-timeline-item--${lineType}-line-type`
      )
    })
  })

  it('should work with `default`, `footer`, `header` slots', async () => {
    const wrapper = mount(NTimeline, {
      slots: {
        default: () =>
          h(NTimelineItem, null, {
            header: () => 'test-header',
            icon: () => 'icon',
            default: () => 'test-default',
            footer: () => 'test-footer'
          })
      }
    })
    expect(wrapper.find('.n-timeline-item-content__title').exists()).toBe(true)
    expect(wrapper.find('.n-timeline-item-content__title').text()).toBe(
      'test-header'
    )
    expect(wrapper.find('.n-timeline-item-timeline__icon').exists()).toBe(true)
    expect(wrapper.find('.n-timeline-item-timeline__icon').text()).toBe('icon')
    expect(wrapper.find('.n-timeline-item-content__content').exists()).toBe(
      true
    )
    expect(wrapper.find('.n-timeline-item-content__content').text()).toBe(
      'test-default'
    )
    expect(wrapper.find('.n-timeline-item-content__meta').exists()).toBe(true)
    expect(wrapper.find('.n-timeline-item-content__meta').text()).toBe(
      'test-footer'
    )
  })
})
