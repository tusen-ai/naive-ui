import { mount, type VueWrapper } from '@vue/test-utils'
import { h, Fragment, createCommentVNode } from 'vue'
import { NFlex } from '../index'

const getChildrenNode = (wrapper: VueWrapper<any>): any[] => {
  return Array.from(wrapper.find('.n-flex').element.childNodes)
}

describe('n-flex', () => {
  it('should work with import on demand', () => {
    mount(NFlex)
  })

  it('render empty children', () => {
    const wrapper = mount({
      render () {
        return <NFlex />
      }
    })
    expect(wrapper.find('.n-flex')).not.toBe(null)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('render flex string size', () => {
    const wrapper = mount({
      render () {
        return <NFlex size="large">{{ default: () => 'kirby' }}</NFlex>
      }
    })
    expect(wrapper.attributes('style')).toContain('gap')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('render vertical flex', () => {
    const wrapper = mount({
      render () {
        return (
          <NFlex vertical>
            {{
              default: () => [<div>1</div>, <div>2</div>]
            }}
          </NFlex>
        )
      }
    })
    expect(wrapper.attributes('style')).toContain('flex-direction: column;')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `inline` prop', () => {
    const wrapper = mount(NFlex, {
      props: {
        inline: true
      },
      slots: {
        default: () => '07akioni'
      }
    })

    expect(wrapper.attributes('style')).toContain('display: inline-flex;')
    wrapper.unmount()
  })

  it('should render with invalidElement', () => {
    const wrapper = mount({
      render () {
        return (
          <NFlex>
            {{
              default: () => (
                <>
                  text1<span>text1</span>
                  text1
                </>
              )
            }}
          </NFlex>
        )
      }
    })

    const childNodes = getChildrenNode(wrapper)
    expect(childNodes.length).toBe(3)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should not render comment node', () => {
    const wrapper = mount({
      render () {
        return <NFlex>{{ default: () => false && 'div' }}</NFlex>
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    const childNodes = getChildrenNode(wrapper)
    expect(childNodes.length).toEqual(1) // Comment node
  })

  it('should work with `wrap` prop', async () => {
    const wrapper = mount(NFlex, {
      slots: { default: () => [<div>1</div>, <div>2</div>] }
    })
    expect(wrapper.find('.n-flex').attributes('style')).toContain(
      'flex-wrap: wrap'
    )

    await wrapper.setProps({ wrap: false })
    expect(wrapper.find('.n-flex').attributes('style')).toContain(
      'flex-wrap: nowrap'
    )
    wrapper.unmount()
  })

  it('should render while slot is Comment', () => {
    const wrapper = mount({
      render () {
        return (
          <NFlex>
            {{
              default: () => createCommentVNode('random comment text')
            }}
          </NFlex>
        )
      }
    })
    const childNodes = getChildrenNode(wrapper)
    expect(childNodes.length).toEqual(1)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
