import { mount } from '@vue/test-utils'
import { NSlider } from '../index'
import { nextTick } from 'vue'

describe('n-slider', () => {
  it('should work with import on demand', () => {
    mount(NSlider)
  })

  it('should work with `defaultValue`', async () => {
    const wrapper = mount(NSlider, {
      props: {
        defaultValue: 23
      }
    })

    const sliderRailFill = wrapper.find('.n-slider-rail__fill')
    expect((sliderRailFill.element as HTMLElement).style.width).toEqual('23%')
    wrapper.unmount()
  })

  it('should work with `marks`', async () => {
    const wrapper = mount(NSlider, {
      props: {
        marks: {
          34: '太棒了',
          75: '不错'
        }
      }
    })

    const sliderDots = wrapper.findAll('.n-slider-dot')
    expect(sliderDots.length).toBe(2)
    expect((sliderDots[0].element as HTMLElement).style.left).toEqual('34%')
    expect((sliderDots[1].element as HTMLElement).style.left).toEqual('75%')

    const sliderMarks = wrapper.findAll('.n-slider-mark')
    expect(sliderMarks.length).toBe(2)

    expect((sliderMarks[0].element as HTMLElement).style.left).toEqual('34%')
    expect(sliderMarks[0].text()).toEqual('太棒了')

    expect((sliderMarks[1].element as HTMLElement).style.left).toEqual('75%')
    expect(sliderMarks[1].text()).toEqual('不错')
    wrapper.unmount()
  })

  it('accept correct callback types', () => {
    function onUpdateValue1 (value: number): void {}
    function onUpdateValue2 (value: number[]): void {}
    mount(NSlider, {
      props: {
        onUpdateValue: onUpdateValue1
      }
    })
    mount(NSlider, {
      props: {
        onUpdateValue: onUpdateValue2
      }
    })
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NSlider)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-slider').classes()).toContain('n-slider--disabled')
    wrapper.unmount()
  })

  it('should work with `marks` prop', async () => {
    const wrapper = mount(NSlider, {
      props: {
        marks: {
          30: 'test1',
          70: 'test2'
        }
      }
    })

    expect(wrapper.findAll('.n-slider-mark').length).toBe(2)
    expect(wrapper.findAll('.n-slider-mark')[0].attributes('style')).toContain(
      'left: 30%'
    )
    expect(wrapper.findAll('.n-slider-mark')[0].text()).toContain('test1')
    expect(wrapper.findAll('.n-slider-mark')[1].attributes('style')).toContain(
      'left: 70%'
    )
    expect(wrapper.findAll('.n-slider-mark')[1].text()).toContain('test2')
    wrapper.unmount()
  })

  it('should work with `min` & `max` prop', async () => {
    const wrapper = mount(NSlider, {
      props: {
        min: 1,
        max: 101,
        defaultValue: 24
      }
    })

    const sliderRailFill = wrapper.find('.n-slider-rail__fill')
    const element = sliderRailFill.element as HTMLElement
    expect(element.style.left).toEqual('0%')
    expect(element.style.width).toEqual('23%')
    wrapper.unmount()
  })

  it('should work with `range` & `defaultValue` prop', async () => {
    const wrapper = mount(NSlider, {
      props: {
        range: true,
        defaultValue: [24, 49]
      }
    })

    expect(wrapper.findAll('.n-slider-handle-wrapper').length).toBe(2)

    const sliderRailFill = wrapper.find('.n-slider-rail__fill')
    const element = sliderRailFill.element as HTMLElement
    expect(element.style.left).toEqual('24%')
    expect(element.style.width).toEqual('25%')
    wrapper.unmount()
  })

  it('should work with `range` & `min` & `max` prop', async () => {
    const wrapper = mount(NSlider, {
      props: {
        range: true,
        min: 1,
        max: 101,
        defaultValue: [25, 65]
      }
    })

    const sliderRailFill = wrapper.find('.n-slider-rail__fill')
    const element = sliderRailFill.element as HTMLElement
    expect(element.style.left).toEqual('24%')
    expect(element.style.width).toEqual('40%')
    wrapper.unmount()
  })

  it('should work with `vertical` prop', async () => {
    const wrapper = mount(NSlider, {
      props: {
        defaultValue: 77,
        vertical: true
      }
    })

    const sliderRailFill = wrapper.find('.n-slider-rail__fill')
    const firstHandle = wrapper.find('.n-slider-handle-wrapper')
    expect((sliderRailFill.element as HTMLElement).style.height).toEqual('77%')
    expect((firstHandle.element as HTMLElement).style.bottom).toEqual('77%')
    wrapper.unmount()
  })

  it('should work with `range` & `vertical` prop', async () => {
    const wrapper = mount(NSlider, {
      props: {
        range: true,
        defaultValue: [24, 49],
        vertical: true
      }
    })

    const sliderRailFill = wrapper.find('.n-slider-rail__fill')
    const element = sliderRailFill.element as HTMLElement
    expect(element.style.bottom).toEqual('24%')
    expect(element.style.height).toEqual('25%')
    expect(
      wrapper.findAll('.n-slider-handle-wrapper')[0].attributes('style')
    ).toContain('bottom: 24%')
    expect(
      wrapper.findAll('.n-slider-handle-wrapper')[1].attributes('style')
    ).toContain('bottom: 49%')
    wrapper.unmount()
  })

  it('should work with `reverse` prop', async () => {
    const wrapper = mount(NSlider)

    expect(wrapper.find('.n-slider').classes()).not.toContain(
      'n-slider--reverse'
    )

    await wrapper.setProps({ reverse: true })
    expect(wrapper.find('.n-slider').classes()).toContain('n-slider--reverse')
    wrapper.unmount()
  })

  it('should slided to the specific mark when step is `mark`', async () => {
    const wrapper = mount(NSlider, {
      props: {
        defaultValue: 0,
        step: 'mark',
        marks: {
          30: '30',
          70: '70'
        }
      }
    })
    const mouseDown = new MouseEvent('mousedown', {
      clientX: 25
    })
    const slider = wrapper.find('.n-slider')
    const handle = wrapper.find('.n-slider-handle-wrapper')
    ;(slider.element as HTMLElement).style.width = '100px'
    ;(slider.element as HTMLElement).dispatchEvent(mouseDown)
    await nextTick()
    expect((handle.element as HTMLElement).style.left).toEqual('30%')
    wrapper.unmount()
  })
})
