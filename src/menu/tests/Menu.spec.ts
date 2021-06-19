import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NMenu } from '../index'

describe('n-menu', () => {
  it('should work with import on demand', () => {
    mount(NMenu)
  })
  it('props.onUpdateValue type', () => {
    const stringCb = (v: string): void => {}
    const numberCb = (v: number): void => {}
    const snCb = (v: string | number): void => {}
    const stringArrCb = (v: string[]): void => {}
    const numberArrCb = (v: number[]): void => {}
    const snArrCb = (v: Array<string | number>): void => {}
    mount(NMenu, {
      props: {
        onUpdateValue: stringCb,
        onUpdateExpandedKeys: stringArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: numberCb,
        onUpdateExpandedKeys: numberArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: snCb,
        onUpdateExpandedKeys: snArrCb
      }
    })
  })
})

describe('n-menu', () => {
  it('should work with `render-label` props', async () => {
    const options = [
      {
        label: () =>
          h(
            'a',
            {
              href: 'test1',
              target: '_blank',
              rel: 'test1'
            },
            'test1'
          ),
        key: 'test1'
      },
      {
        label: 'test2',
        key: 'test2'
      }
    ]
    const handleRenderLabel = (option: any): any => {
      if (typeof option.label === 'function') {
        return option.label()
      }
      return h(
        'a',
        {
          href: option.key,
          rel: option.key
        },
        { default: () => option.label }
      )
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options
      }
    })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(false)

    await wrapper.setProps({ renderLabel: handleRenderLabel })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[target="_blank"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(true)
  })
})
