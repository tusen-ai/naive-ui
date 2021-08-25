import { mount } from '@vue/test-utils'
import { NSlider } from '../index'

describe('n-slider', () => {
  it('should work with import on demand', () => {
    mount(NSlider)
  })

  it('accept correct callback types', () => {
    function onUpdateValue1 (value: number): void {}
    function onUpdateValue2 (value: [number, number]): void {}
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
  })

  it('should work with `range` prop', async () => {
    const wrapper = mount(NSlider)

    await wrapper.setProps({ range: true })
    expect(wrapper.findAll('.n-slider-handle').length).toBe(2)
  })
})
